# 🏎️ FantaFormula 1 — Piano di Sviluppo Completo

> **Obiettivo**: App mobile multipiattaforma (iOS, Android, Web) per una lega privata di FantaF1, completamente gratuita.
> **Stack attuale**: React + Vite + TypeScript + Tailwind + shadcn/ui

---

## 📋 Indice

1. [Architettura generale](#1-architettura-generale)
2. [Stack tecnologico scelto](#2-stack-tecnologico-scelto)
3. [API gratuite disponibili](#3-api-gratuite-disponibili)
4. [Backend gratuito per la lega privata](#4-backend-gratuito-per-la-lega-privata)
5. [Roadmap step-by-step](#5-roadmap-step-by-step)
6. [Schema del database](#6-schema-del-database)
7. [Sistema di punteggio](#7-sistema-di-punteggio)
8. [Struttura file finale](#8-struttura-file-finale)
9. [Risorse e link utili](#9-risorse-e-link-utili)

---

## 1. Architettura Generale

```
┌─────────────────────────────────────────────────────────────┐
│                     FantaFormula 1 App                      │
│              (Ionic + React + Capacitor)                    │
└───────────────────────┬─────────────────────────────────────┘
                        │
          ┌─────────────┼─────────────┐
          │             │             │
    📱 iOS App    🤖 Android    🌐 Web PWA
          │             │             │
          └─────────────┼─────────────┘
                        │
          ┌─────────────┼─────────────┐
          │                           │
   🏁 API F1 (Dati reali)    🔥 Supabase (Backend lega)
   ├── Jolpica F1 API         ├── Auth (login utenti)
   │   (calendario, risultati)│── Database PostgreSQL
   └── OpenF1 API             │   (squadre, punti, leghe)
       (live timing)          └── Realtime (classifica live)
```

### Flusso dati

1. **Dopo ogni GP**: Jolpica F1 API pubblica i risultati ufficiali
2. **Il calcolo punti** avviene su Supabase (Edge Functions, gratuite)
3. **L'app** mostra classifica aggiornata e notifiche push ai giocatori
4. **Durante il GP**: OpenF1 API fornisce posizioni in tempo reale (opzionale, fase avanzata)

---

## 2. Stack Tecnologico Scelto

### Perché Ionic + Capacitor (e non React Native)?

| Criterio | Ionic + Capacitor | React Native |
|---|---|---|
| Riuso del codice esistente | ✅ Il tuo progetto è già React, migrazione minima | ⚠️ Riscrittura quasi totale |
| Curva di apprendimento | ✅ Bassa (già conosci React) | ⚠️ Media-alta |
| Componenti mobile-native | ✅ IonTabs, IonModal, IonRefresher | ✅ Built-in |
| Pubblicazione App Store | ✅ Sì, via Capacitor | ✅ Sì |
| Web + PWA | ✅ Perfetto | ⚠️ Limitato |
| Costo | ✅ Gratuito | ✅ Gratuito |

### Stack definitivo

```
Frontend
├── Ionic Framework 8 (componenti mobile)
├── React 19 + TypeScript
├── Capacitor 6 (bridge nativo iOS/Android)
├── Tailwind CSS (stili custom, già presente)
├── Framer Motion (animazioni, già presente)
└── TanStack Query (fetching/caching dati API)

Backend (tutto gratuito)
├── Supabase Free Tier
│   ├── PostgreSQL (500MB gratis)
│   ├── Auth (50.000 utenti attivi/mese gratis)
│   ├── Edge Functions (500.000 chiamate/mese gratis)
│   └── Realtime (200 connessioni simultanee gratis)
└── No server gestito da te!
```

---

## 3. API Gratuite Disponibili

### 🟢 Jolpica F1 API (ex-Ergast) — **PRINCIPALE**

- **URL**: `https://api.jolpi.ca/ergast/f1/`
- **Costo**: Completamente gratuita, open source
- **Rate limit**: Generoso (nessun limite ufficiale rigido)
- **Dati disponibili**:

```typescript
// Calendario della stagione corrente
GET https://api.jolpi.ca/ergast/f1/current.json

// Risultati di una gara specifica
GET https://api.jolpi.ca/ergast/f1/current/{round}/results.json

// Classifica piloti
GET https://api.jolpi.ca/ergast/f1/current/driverStandings.json

// Classifica costruttori
GET https://api.jolpi.ca/ergast/f1/current/constructorStandings.json

// Qualifiche
GET https://api.jolpi.ca/ergast/f1/current/{round}/qualifying.json

// Giri veloci
GET https://api.jolpi.ca/ergast/f1/current/{round}/fastest/1/results.json
```

**Cosa copre per il fantacalcio**:
- ✅ Posizione finale di ogni pilota → punti base
- ✅ Posizione in qualifica → punti qualifica
- ✅ Giro veloce → bonus
- ✅ Calendario completo della stagione
- ✅ Risultati Sprint Race (quando disponibili)

---

### 🟢 OpenF1 API — **PER DATI LIVE**

- **URL**: `https://api.openf1.org/v1/`
- **Costo**: Completamente gratuita
- **Dati disponibili**:

```typescript
// Posizioni in tempo reale durante la gara
GET https://api.openf1.org/v1/position?session_key=latest

// Pit stop
GET https://api.openf1.org/v1/pit?session_key=latest

// Meteo
GET https://api.openf1.org/v1/weather?session_key=latest

// Dati piloti
GET https://api.openf1.org/v1/drivers?session_key=latest
```

**Uso nell'app**: Schermata "Live" durante i weekend di gara (Fase 3).

---

### ⚠️ Cosa NON si può avere gratis

| Dato | Alternativa gratuita |
|---|---|
| Foto ufficiali piloti (F1 copyright) | Wikipedia Commons / immagini libere |
| Telemetria dettagliata | FastF1 (Python, solo post-gara) |
| Timing ufficiale FIA in tempo reale | OpenF1 (ritardo ~2 min, sufficiente) |
| Dati storici pre-1950 | Non necessari |

---

## 4. Backend Gratuito per la Lega Privata

### Perché Supabase?

Supabase è un **Firebase open source** con piano free generoso:
- 500MB database PostgreSQL
- 1GB storage file
- 50.000 utenti autenticati/mese
- 500.000 Edge Function invocations/mese
- **Realtime** per classifica live
- Dashboard web per gestire i dati

Perfetto per una lega con 5-30 amici.

### Funzionalità che gestisce Supabase

```
✅ Registrazione/Login utenti (email o Google)
✅ Profilo utente e nome squadra
✅ Selezione piloti e costruttore
✅ Calcolo automatico punti dopo ogni GP
✅ Classifica della lega in tempo reale
✅ Storico punti per gara
✅ Codice invito per la lega privata
✅ Trasferimenti di mercato
✅ Notifiche push (via Capacitor + Supabase)
```

---

## 5. Roadmap Step-by-Step

---

### 📦 FASE 0 — Preparazione (1-2 giorni)

**Obiettivo**: Setup ambiente di sviluppo mobile

#### Step 0.1 — Installa le dipendenze necessarie

```bash
# Nella cartella del progetto
npm install @ionic/react @ionic/core @capacitor/core @capacitor/cli
npm install @capacitor/app @capacitor/haptics @capacitor/keyboard @capacitor/status-bar
npm install @supabase/supabase-js
npm install @tanstack/react-query

# Inizializza Capacitor
npx cap init "FantaFormula1" "com.tuonome.fantaformula1"
npx cap add ios      # solo su Mac
npx cap add android
```

#### Step 0.2 — Crea l'account Supabase

1. Vai su [supabase.com](https://supabase.com) → "Start for free"
2. Crea un nuovo progetto (nome: `fantaformula1`)
3. Salva in un file `.env.local`:

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJxxx...
```

#### Step 0.3 — Migrazione da Vite puro a Ionic

Modifica `src/main.tsx`:
```tsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import { IonApp, setupIonicReact } from '@ionic/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './app/App';

// Import Ionic CSS
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

setupIonicReact({ mode: 'ios' }); // usa sempre lo stile iOS per coerenza cross-platform

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <IonApp>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </IonApp>
);
```

**Nota**: I tuoi componenti React esistenti rimangono quasi invariati. Ionic si aggiunge "sopra" per le funzionalità native.

---

### 🔐 FASE 1 — Autenticazione e Profilo (3-4 giorni)

**Obiettivo**: Gli utenti possono registrarsi, fare login e creare la loro squadra

#### Step 1.1 — Crea il client Supabase

```typescript
// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);
```

#### Step 1.2 — Schermata Login/Registrazione

Crea `src/app/pages/Auth.tsx` con:
- Form email + password
- Login con Google (Supabase OAuth, gratuito)
- Recupero password via email

#### Step 1.3 — Schermata Onboarding (solo al primo accesso)

Crea `src/app/pages/Onboarding.tsx`:
1. Scegli il nome della tua squadra
2. (Opzionale) Scegli un avatar emoji
3. Inserisci codice lega (per unirti a una lega esistente) **oppure** crea una nuova lega

#### Step 1.4 — Context di autenticazione

```typescript
// src/app/contexts/AuthContext.tsx
// Gestisce lo stato dell'utente loggato in tutta l'app
```

---

### 🏗️ FASE 2 — Database e API F1 (4-5 giorni)

**Obiettivo**: Dati reali nel database, calendario e risultati veri

#### Step 2.1 — Crea le tabelle su Supabase

Esegui questo SQL nel SQL Editor di Supabase (vedi [Schema completo](#6-schema-del-database)):

```sql
-- Le tabelle principali: users, leagues, teams, race_results, team_picks, scores
-- Vedi Sezione 6 per lo schema completo
```

#### Step 2.2 — Servizio API F1

```typescript
// src/app/services/f1Api.ts

const BASE_URL = 'https://api.jolpi.ca/ergast/f1';

export async function getCurrentSchedule() {
  const res = await fetch(`${BASE_URL}/current.json`);
  const data = await res.json();
  return data.MRData.RaceTable.Races;
}

export async function getRaceResults(round: number) {
  const res = await fetch(`${BASE_URL}/current/${round}/results.json`);
  const data = await res.json();
  return data.MRData.RaceTable.Races[0]?.Results ?? [];
}

export async function getDriverStandings() {
  const res = await fetch(`${BASE_URL}/current/driverStandings.json`);
  const data = await res.json();
  return data.MRData.StandingsTable.StandingsLists[0]?.DriverStandings ?? [];
}

export async function getQualifyingResults(round: number) {
  const res = await fetch(`${BASE_URL}/current/${round}/qualifying.json`);
  const data = await res.json();
  return data.MRData.RaceTable.Races[0]?.QualifyingResults ?? [];
}
```

#### Step 2.3 — Sync calendario F1 → Supabase

Scrivi una funzione (da lanciare una volta all'inizio stagione) che popola la tabella `races` con il calendario reale da Jolpica.

#### Step 2.4 — Aggiorna le pagine esistenti con dati reali

- `Calendar.tsx`: usa `useQuery` di TanStack per chiamare `getCurrentSchedule()`
- `Standings.tsx` (tab "Piloti F1" e "Costruttori F1"): usa dati reali da Jolpica
- `Home.tsx`: countdown reale alla prossima gara (calcola da data API)

---

### 🏆 FASE 3 — Lega Privata e Sistema Punti (5-6 giorni)

**Obiettivo**: Il cuore dell'app — la lega con gli amici

#### Step 3.1 — Gestione Lega

- Creatore della lega genera un **codice invito** (es. `SCUD-X7K2`)
- Gli amici si uniscono inserendo il codice
- Il creatore è admin della lega
- Max 30 partecipanti per lega (sufficiente per amici)

#### Step 3.2 — Selezione Squadra (Draft)

Aggiorna `MyTeam.tsx` per:
- Leggere/scrivere i piloti scelti da Supabase
- Validare budget (100M totali)
- Gestire capitano (punti x2) e vice-capitano (punti x1.5)
- Bloccare modifiche dopo la deadline (sabato mattina, ora delle qualifiche)

#### Step 3.3 — Calcolo Automatico Punti

Crea una **Supabase Edge Function** (serverless, gratuita) che:
1. Viene chiamata dopo ogni GP (o schedulata)
2. Recupera risultati da Jolpica F1 API
3. Calcola i punti per ogni pilota secondo il sistema di punteggio
4. Aggiorna la tabella `scores` per tutti gli utenti della lega
5. Aggiorna la classifica generale

```typescript
// supabase/functions/calculate-race-points/index.ts
// Eseguita dopo ogni GP
```

#### Step 3.4 — Classifica Live della Lega

La schermata `Standings.tsx` (tab "Lega") si aggiorna in **tempo reale** grazie a Supabase Realtime:

```typescript
// Supabase Realtime subscription
const channel = supabase
  .channel('league-standings')
  .on('postgres_changes', { 
    event: 'UPDATE', 
    schema: 'public', 
    table: 'league_members' 
  }, (payload) => {
    // Aggiorna la classifica istantaneamente per tutti
    refetchStandings();
  })
  .subscribe();
```

#### Step 3.5 — Mercato Trasferimenti

Aggiorna `Market.tsx` per:
- Scambi reali (scritti su Supabase)
- 3 trasferimenti gratuiti per gara
- Prezzi piloti che cambiano in base alle performance (opzionale, fase avanzata)

---

### 📱 FASE 4 — Mobile Native (3-4 giorni)

**Obiettivo**: L'app funziona su iOS e Android come app nativa

#### Step 4.1 — Build Capacitor

```bash
# Build del progetto React
npm run build

# Sincronizza con i progetti nativi
npx cap sync

# Apri in Xcode (solo Mac)
npx cap open ios

# Apri in Android Studio
npx cap open android
```

#### Step 4.2 — Funzionalità Native con Capacitor

```typescript
// Notifiche Push (quando vengono calcolati i punti dopo un GP)
import { PushNotifications } from '@capacitor/push-notifications';

// Haptic feedback (quando acquisti un pilota nel mercato)
import { Haptics, ImpactStyle } from '@capacitor/haptics';
await Haptics.impact({ style: ImpactStyle.Medium });

// Share (per condividere la tua posizione in classifica)
import { Share } from '@capacitor/share';
await Share.share({
  title: 'La mia squadra FantaF1',
  text: `Sono al #2 nella lega con 312 punti! 🏎️`,
  url: 'https://tuaapp.com',
});

// Biometria per login rapido (opzionale)
import { BiometricAuth } from '@aparajita/capacitor-biometric-auth';
```

#### Step 4.3 — Ottimizzazioni Mobile

- `IonRefresher`: pull-to-refresh su tutte le schermate
- `IonInfiniteScroll`: lista piloti nel mercato con caricamento progressivo
- `IonToast`: notifiche in-app (es. "Trasferimento completato!")
- `IonModal`: dettaglio pilota con statistiche estese
- Splash screen e icona app personalizzate

#### Step 4.4 — PWA (Web App Installabile)

Per chi non vuole installare da store, l'app funziona anche come PWA:
```bash
npm install vite-plugin-pwa
# Configura manifest.json con icone e nome app
```

---

### 🔴 FASE 5 — Live Race Mode (Opzionale, 3-4 giorni)

**Obiettivo**: Schermata speciale durante i weekend di gara

#### Step 5.1 — Nuova schermata "Live"

Appare solo durante i weekend di gara (venerdì → domenica):
- Posizioni in tempo reale via **OpenF1 API**
- Proiezione punti della tua squadra in base alle posizioni attuali
- Classifica lega proiettata in tempo reale
- Indicatore pit stop, Safety Car, bandiere

```typescript
// src/app/services/openF1Api.ts
const OPENF1_URL = 'https://api.openf1.org/v1';

export async function getLivePositions() {
  const res = await fetch(`${OPENF1_URL}/position?session_key=latest`);
  return res.json();
}

// Polling ogni 10 secondi durante la gara
```

---

### 🚀 FASE 6 — Pubblicazione (2-3 giorni)

**Obiettivo**: L'app è disponibile per i tuoi amici

#### Opzione A — Distribuzione privata (più semplice)
- **Android**: genera un APK firmato → condividilo via link
- **iOS**: usa TestFlight (Apple) per distribuire a max 100 tester gratis
- **Web**: deploya su **Vercel** (gratis) → condividi il link

#### Opzione B — App Store (se vuoi pubblicare)
- **Google Play**: $25 una tantum per account sviluppatore
- **Apple App Store**: $99/anno per Apple Developer Program

#### Hosting gratuito per il backend
- Supabase rimane gratuito per sempre per progetti piccoli
- Nessun server da gestire

---

## 6. Schema del Database

```sql
-- Utenti (estende auth.users di Supabase)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  avatar_emoji TEXT DEFAULT '🏎️',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Leghe
CREATE TABLE leagues (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  invite_code TEXT UNIQUE NOT NULL, -- es. "SCUD-X7K2"
  created_by UUID REFERENCES profiles(id),
  max_members INT DEFAULT 20,
  season INT DEFAULT 2025,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Membri di una lega
CREATE TABLE league_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  league_id UUID REFERENCES leagues(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id),
  team_name TEXT NOT NULL,
  total_points INT DEFAULT 0,
  budget_remaining DECIMAL DEFAULT 100.0, -- milioni
  transfers_remaining INT DEFAULT 3,
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(league_id, user_id)
);

-- Piloti selezionati da ogni utente per ogni gara
CREATE TABLE team_picks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id UUID REFERENCES league_members(id),
  race_round INT NOT NULL,
  driver_ids TEXT[] NOT NULL, -- array di 5 codici pilota (es. ['ver', 'nor', 'ham', 'lec', 'rus'])
  constructor_id TEXT NOT NULL, -- es. 'mcl'
  captain_driver_id TEXT NOT NULL,
  vice_captain_driver_id TEXT NOT NULL,
  locked_at TIMESTAMPTZ, -- quando è stato bloccato (deadline qualifiche)
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(member_id, race_round)
);

-- Gare (sincronizzato da Jolpica API)
CREATE TABLE races (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  season INT NOT NULL,
  round INT NOT NULL,
  name TEXT NOT NULL,
  circuit TEXT NOT NULL,
  country TEXT NOT NULL,
  race_date TIMESTAMPTZ NOT NULL,
  qualifying_date TIMESTAMPTZ NOT NULL,
  sprint_date TIMESTAMPTZ,
  status TEXT DEFAULT 'upcoming', -- upcoming | next | live | completed
  UNIQUE(season, round)
);

-- Punti per gara per ogni membro
CREATE TABLE race_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id UUID REFERENCES league_members(id),
  race_round INT NOT NULL,
  points INT NOT NULL DEFAULT 0,
  breakdown JSONB, -- dettaglio punti per pilota
  calculated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(member_id, race_round)
);

-- Risultati F1 ufficiali (cache da Jolpica)
CREATE TABLE f1_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  season INT NOT NULL,
  round INT NOT NULL,
  driver_id TEXT NOT NULL, -- codice Jolpica (es. 'max_verstappen')
  finish_position INT,
  grid_position INT,
  qualifying_position INT,
  sprint_position INT,
  fastest_lap BOOLEAN DEFAULT FALSE,
  dnf BOOLEAN DEFAULT FALSE,
  points_scored DECIMAL, -- punti F1 ufficiali
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(season, round, driver_id)
);
```

---

## 7. Sistema di Punteggio

Il sistema di punti FantaF1 da implementare nella Edge Function:

### Punti Gara

| Posizione | Punti |
|-----------|-------|
| 1° | 25 |
| 2° | 18 |
| 3° | 15 |
| 4° | 12 |
| 5° | 10 |
| 6° | 8 |
| 7° | 6 |
| 8° | 4 |
| 9° | 2 |
| 10° | 1 |
| 11°-20° | 0 |

### Bonus/Malus

| Evento | Punti |
|--------|-------|
| Giro Veloce (top 10) | +5 |
| Pole Position | +10 |
| DNF (ritiro) | -15 |
| DQ (squalifica) | -20 |
| Guadagnate 3+ posizioni vs griglia | +5 |
| Perse 3+ posizioni vs griglia | -5 |

### Punti Sprint Race

| Posizione Sprint | Punti |
|------------------|-------|
| 1° | 8 |
| 2° | 7 |
| 3° | 6 |
| 4° | 5 |
| 5° | 4 |
| 6° | 3 |
| 7° | 2 |
| 8° | 1 |

### Moltiplicatori Capitano

| Ruolo | Moltiplicatore |
|-------|----------------|
| Capitano (C) | ×2 |
| Vice Capitano (VC) | ×1.5 |
| Pilota normale | ×1 |

### Costruttore

Somma dei punti dei due piloti del costruttore scelto (senza moltiplicatori).

---

## 8. Struttura File Finale

```
FantaFormula 1/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── BottomNav.tsx          ✅ già presente
│   │   │   ├── Header.tsx             ✅ già presente
│   │   │   ├── Layout.tsx             ✅ da aggiornare con IonRouterOutlet
│   │   │   ├── LiveRaceWidget.tsx     🆕 widget live gara
│   │   │   └── PointsBreakdown.tsx    🆕 dettaglio punti per pilota
│   │   ├── contexts/
│   │   │   ├── AuthContext.tsx        🆕 stato autenticazione
│   │   │   └── LeagueContext.tsx      🆕 stato lega corrente
│   │   ├── data/
│   │   │   ├── drivers.ts             ✅ da tenere come fallback
│   │   │   ├── races.ts               ✅ da tenere come fallback
│   │   │   └── league.ts              ✅ da tenere come fallback
│   │   ├── hooks/
│   │   │   ├── useAuth.ts             🆕 hook autenticazione
│   │   │   ├── useF1Data.ts           🆕 hook dati F1 (TanStack Query)
│   │   │   └── useLeague.ts           🆕 hook dati lega
│   │   ├── pages/
│   │   │   ├── Home.tsx               ✅ aggiornare countdown reale
│   │   │   ├── MyTeam.tsx             ✅ aggiornare con Supabase
│   │   │   ├── Standings.tsx          ✅ aggiornare con dati reali
│   │   │   ├── Market.tsx             ✅ aggiornare con Supabase
│   │   │   ├── Calendar.tsx           ✅ aggiornare con API Jolpica
│   │   │   ├── Auth.tsx               🆕 login/registrazione
│   │   │   ├── Onboarding.tsx         🆕 setup iniziale
│   │   │   ├── League.tsx             🆕 gestione lega (inviti, impostazioni)
│   │   │   └── LiveRace.tsx           🆕 (Fase 5) modalità gara live
│   │   ├── services/
│   │   │   ├── f1Api.ts               🆕 Jolpica F1 API
│   │   │   ├── openF1Api.ts           🆕 OpenF1 API (live)
│   │   │   └── supabase.ts            🆕 client Supabase
│   │   └── App.tsx                    ✅ da aggiornare con auth guard
│   └── styles/
│       └── ...                        ✅ invariati
├── supabase/
│   └── functions/
│       └── calculate-race-points/     🆕 Edge Function calcolo punti
│           └── index.ts
├── android/                           🆕 generato da Capacitor
├── ios/                               🆕 generato da Capacitor (solo Mac)
├── PIANO_DI_SVILUPPO.md               📄 questo file
└── package.json                       ✅ da aggiornare
```

---

## 9. Risorse e Link Utili

### API F1
- 🏁 **Jolpica F1 API**: https://api.jolpi.ca — documentazione e playground
- 📡 **OpenF1 API**: https://openf1.org — dati live, ottima documentazione
- 📊 **FastF1** (Python, post-gara): https://docs.fastf1.dev

### Backend
- 🔥 **Supabase**: https://supabase.com/docs — documentazione completa
- 📖 **Supabase + React Guide**: https://supabase.com/docs/guides/getting-started/quickstarts/reactjs
- ⚡ **Supabase Edge Functions**: https://supabase.com/docs/guides/functions

### Mobile
- 📱 **Ionic + React**: https://ionicframework.com/docs/react
- 🔌 **Capacitor**: https://capacitorjs.com/docs
- 📦 **Capacitor Plugins**: https://capacitorjs.com/docs/plugins

### Deployment Gratuito
- 🌐 **Vercel** (web hosting): https://vercel.com
- 🧪 **TestFlight** (iOS beta): https://developer.apple.com/testflight
- 🤖 **Google Play Console** (Android): https://play.google.com/console

---

## ⏱️ Timeline Stimata

| Fase | Durata stimata | Difficoltà |
|------|---------------|------------|
| 0 — Setup | 1-2 giorni | 🟡 Media |
| 1 — Autenticazione | 3-4 giorni | 🟡 Media |
| 2 — API F1 + Database | 4-5 giorni | 🟠 Alta |
| 3 — Lega + Punti | 5-6 giorni | 🔴 Alta |
| 4 — Mobile Native | 3-4 giorni | 🟡 Media |
| 5 — Live Race (opz.) | 3-4 giorni | 🟠 Alta |
| 6 — Pubblicazione | 2-3 giorni | 🟡 Media |
| **Totale** | **~3-5 settimane** | |

---

> 💡 **Consiglio**: Inizia dalla Fase 0 e 1, poi testa con dati mock mentre sviluppi la Fase 2. Non aspettare di avere tutto pronto per mostrare l'app agli amici — una versione con login reale ma dati finti è già divertente da testare!

> 🚗 **Pro tip**: Per il primo weekend di gara, puoi calcolare i punti manualmente e inserirli direttamente in Supabase tramite la dashboard web — senza aspettare di completare la Edge Function automatica.
