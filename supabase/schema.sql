-- =====================================================
-- FantaFormula1 Database Schema
-- Esegui questo SQL nel Supabase SQL Editor
-- =====================================================

-- =====================================================
-- TABELLA: users (profili utente)
-- =====================================================
CREATE TABLE public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  team_name TEXT NOT NULL,
  avatar_emoji TEXT DEFAULT '🏎️',
  league_id UUID,
  budget_remaining DECIMAL(10,2) DEFAULT 100.0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- TABELLA: leagues (leghe private)
-- =====================================================
CREATE TABLE public.leagues (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  invite_code TEXT UNIQUE NOT NULL,
  admin_id UUID NOT NULL REFERENCES public.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- TABELLA: drivers (piloti F1 - dati statici)
-- =====================================================
CREATE TABLE public.drivers (
  id TEXT PRIMARY KEY, -- codice pilota es: "verstappen"
  name TEXT NOT NULL,
  team TEXT NOT NULL,
  price DECIMAL(10,2) DEFAULT 10.0,
  nationality TEXT,
  number INTEGER,
  avatar_url TEXT
);

-- =====================================================
-- TABELLA: constructors (scuderie F1)
-- =====================================================
CREATE TABLE public.constructors (
  id TEXT PRIMARY KEY, -- codice costruttore es: "red_bull"
  name TEXT NOT NULL,
  price DECIMAL(10,2) DEFAULT 20.0,
  logo_url TEXT
);

-- =====================================================
-- TABELLA: races (calendario GP)
-- =====================================================
CREATE TABLE public.races (
  id TEXT PRIMARY KEY, -- round number es: "1"
  name TEXT NOT NULL,
  circuit TEXT NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  season INTEGER DEFAULT 2025,
  status TEXT DEFAULT 'upcoming' -- upcoming, completed, live
);

-- =====================================================
-- TABELLA: team_picks (scelte utente per ogni GP)
-- =====================================================
CREATE TABLE public.team_picks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id),
  driver_id TEXT NOT NULL REFERENCES public.drivers(id),
  race_id TEXT NOT NULL REFERENCES public.races(id),
  is_captain BOOLEAN DEFAULT FALSE,
  is_vice_captain BOOLEAN DEFAULT FALSE,
  price_paid DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, race_id, driver_id)
);

-- =====================================================
-- TABELLA: race_results (risultati ufficiali GP)
-- =====================================================
CREATE TABLE public.race_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  race_id TEXT NOT NULL REFERENCES public.races(id),
  driver_id TEXT NOT NULL REFERENCES public.drivers(id),
  position INTEGER,
  points DECIMAL(5,2) DEFAULT 0,
  fastest_lap BOOLEAN DEFAULT FALSE,
  qualifying_position INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- TABELLA: user_scores (punti utente per GP)
-- =====================================================
CREATE TABLE public.user_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id),
  race_id TEXT NOT NULL REFERENCES public.races(id),
  total_points DECIMAL(10,2) DEFAULT 0,
  position INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, race_id)
);

-- =====================================================
-- TABELLA: transfers (storico trasferimenti)
-- =====================================================
CREATE TABLE public.transfers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id),
  race_id TEXT NOT NULL REFERENCES public.races(id),
  driver_from TEXT NOT NULL,
  driver_to TEXT NOT NULL,
  price_paid DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- INDEX PER MIGLIORARE PERFORMANCE
-- =====================================================
CREATE INDEX idx_team_picks_user_race ON public.team_picks(user_id, race_id);
CREATE INDEX idx_team_picks_race ON public.team_picks(race_id);
CREATE INDEX idx_user_scores_user ON public.user_scores(user_id);
CREATE INDEX idx_user_scores_race ON public.user_scores(race_id);
CREATE INDEX idx_race_results_race ON public.race_results(race_id);
CREATE INDEX idx_leagues_invite ON public.leagues(invite_code);

-- =====================================================
-- RLS POLICIES (sicurezza a livello riga)
-- =====================================================

-- Abilita RLS su tutte le tabelle
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leagues ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.drivers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.constructors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.races ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_picks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.race_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transfers ENABLE ROW LEVEL SECURITY;

-- Politiche per gli utenti (ogni utente vede solo i propri dati)
CREATE POLICY "Users can view own profile" ON public.users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.users FOR UPDATE USING (auth.uid() = id);

-- Politiche per le leghe (membri della lega possono vedere)
CREATE POLICY "League members can view league" ON public.leagues FOR SELECT 
  USING (id IN (SELECT league_id FROM public.users WHERE id = auth.uid()));

-- Politiche per team_picks
CREATE POLICY "Users can view own picks" ON public.team_picks FOR SELECT 
  USING (user_id = auth.uid());
CREATE POLICY "Users can insert own picks" ON public.team_picks FOR INSERT 
  WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users can update own picks" ON public.team_picks FOR UPDATE 
  USING (user_id = auth.uid());

-- Politiche per user_scores
CREATE POLICY "Users can view own scores" ON public.user_scores FOR SELECT 
  USING (user_id = auth.uid());

-- Dati pubblici (driver, races, costruttori)
CREATE POLICY "Anyone can view drivers" ON public.drivers FOR SELECT USING (true);
CREATE POLICY "Anyone can view constructors" ON public.constructors FOR SELECT USING (true);
CREATE POLICY "Anyone can view races" ON public.races FOR SELECT USING (true);
CREATE POLICY "Anyone can view race_results" ON public.race_results FOR SELECT USING (true);

-- =====================================================
-- FUNZIONE: Calcolo punteggio dopo un GP
-- =====================================================
CREATE OR REPLACE FUNCTION calculate_race_points(p_race_id TEXT)
RETURNS VOID AS $$
DECLARE
  r_record RECORD;
  v_driver_points DECIMAL(10,2);
  v_total_points DECIMAL(10,2);
  v_captain_multiplier DECIMAL(10,2);
  v_user_id UUID;
BEGIN
  -- Per ogni utente nella lega
  FOR r_record IN 
    SELECT DISTINCT user_id FROM public.team_picks WHERE race_id = p_race_id
  LOOP
    v_user_id := r_record.user_id;
    v_total_points := 0;
    
    -- Calcola punti per ogni pilota selezionato
    FOR r_record IN
      SELECT 
        tp.driver_id,
        tp.is_captain,
        tp.is_vice_captain,
        rr.points,
        rr.fastest_lap
      FROM public.team_picks tp
      LEFT JOIN public.race_results rr ON rr.driver_id = tp.driver_id AND rr.race_id = p_race_id
      WHERE tp.user_id = v_user_id AND tp.race_id = p_race_id
    LOOP
      -- Determina moltiplicatore
      IF r_record.is_captain THEN
        v_captain_multiplier := 2.0;
      ELSIF r_record.is_vice_captain THEN
        v_captain_multiplier := 1.5;
      ELSE
        v_captain_multiplier := 1.0;
      END IF;
      
      -- Calcola punti (base + bonus giro veloce)
      v_driver_points := COALESCE(r_record.points, 0);
      IF r_record.fastest_lap THEN
        v_driver_points := v_driver_points + 2;
      END IF;
      
      v_total_points := v_total_points + (v_driver_points * v_captain_multiplier);
    END LOOP;
    
    -- Salva punteggio totale
    INSERT INTO public.user_scores (user_id, race_id, total_points)
    VALUES (v_user_id, p_race_id, v_total_points)
    ON CONFLICT (user_id, race_id) 
    DO UPDATE SET total_points = EXCLUDED.total_points;
  END LOOP;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- FUNZIONE: Genera codice invito lega
-- =====================================================
CREATE OR REPLACE FUNCTION generate_invite_code()
RETURNS TEXT AS $$
DECLARE
  v_code TEXT;
BEGIN
  -- Genera codice casuale di 8 caratteri
  v_code := upper(
    substr(md5(random()::text), 1, 4) || 
    substr(md5(random()::text), 1, 4)
  );
  RETURN v_code;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- TRIGGER: Aggiorna updated_at automaticamente
-- =====================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER users_updated_at 
  BEFORE UPDATE ON public.users 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
