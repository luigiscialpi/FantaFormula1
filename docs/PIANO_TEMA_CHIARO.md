# 🎨 Piano Implementazione Tema Chiaro — FantaFormula 1

> **Stato**: In corso
> **Data**: 2026-03-08

---

## Problema

L'app usa **colori hardcoded** in inline `style` props su tutti i componenti (es. `background: "#0A0A0A"`, `color: "#FFFFFF"`). Il file `theme.css` ha le CSS variables ma non sono usate dai componenti dell'app.

---

## Approccio

### 1. CSS Custom Properties `--ff-*`

Aggiunta di variabili CSS dedicate FantaF1 in `theme.css` per entrambi i temi:

| Variabile | Light | Dark |
|---|---|---|
| `--ff-bg` | `#FFFFFF` | `#0A0A0A` |
| `--ff-bg-outer` | `#F0F0F2` | `#050505` |
| `--ff-surface` | `#F5F5F7` | `#141414` |
| `--ff-surface-border` | `rgba(0,0,0,0.08)` | `rgba(255,255,255,0.06)` |
| `--ff-text-primary` | `#1A1A1A` | `#FFFFFF` |
| `--ff-text-secondary` | `#666666` | `#888888` |
| `--ff-text-tertiary` | `#999999` | `#555555` |
| `--ff-nav-inactive` | `#999999` | `#555555` |
| `--ff-header-bg` | `rgba(255,255,255,0.92)` | `rgba(10,10,10,0.92)` |
| `--ff-countdown-bg` | `rgba(0,0,0,0.04)` | `rgba(255,255,255,0.06)` |

I colori brand (rosso F1 `#E10600`, colori team, verde/arancione) restano **invariati** tra i temi.

### 2. ThemeContext React

- Nuovo file `src/app/contexts/ThemeContext.tsx`
- Gestisce toggle `.dark` su `<html>`
- Persistenza in `localStorage`
- Default: tema chiaro

### 3. Toggle nell'Header

Pulsante sole/luna nel `Header.tsx` per cambiare tema.

---

## File Da Modificare

### Infrastruttura
| File | Azione |
|---|---|
| `src/styles/theme.css` | Aggiunta variabili `--ff-*` light/dark |
| `src/app/contexts/ThemeContext.tsx` | **NUOVO** — Context e provider |
| `src/main.tsx` | Wrap con `ThemeProvider` |

### Layout & Navigazione
| File | Azione |
|---|---|
| `src/app/components/Layout.tsx` | Sostituzione sfondi hardcoded |
| `src/app/components/Header.tsx` | Sostituzione colori + toggle tema |
| `src/app/components/BottomNav.tsx` | Sostituzione colori navigazione |

### Pagine
| File | Azione |
|---|---|
| `src/app/pages/Home.tsx` | ~30+ colori inline → CSS vars |
| `src/app/pages/MyTeam.tsx` | Cards, tabs, stats → CSS vars |
| `src/app/pages/Standings.tsx` | Rankings, trend → CSS vars |
| `src/app/pages/Market.tsx` | Search, cards, prezzi → CSS vars |
| `src/app/pages/Calendar.tsx` | Race cards, badges → CSS vars |
| `src/app/pages/Auth.tsx` | Modifiche minori (usa Ionic) |

---

## Verifiche

1. ✅ Tema chiaro: sfondi bianchi, testo scuro, accenti rossi visibili
2. ✅ Tema scuro: aspetto identico all'attuale
3. ✅ Toggle funzionante + persistenza al reload
4. ✅ Colori team sempre visibili in entrambi i temi
