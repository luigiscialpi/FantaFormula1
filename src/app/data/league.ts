export interface LeaguePlayer {
  rank: number;
  name: string;
  teamName: string;
  points: number;
  lastRacePoints: number;
  trend: "up" | "down" | "same";
  trendValue: number;
  isUser?: boolean;
  avatar: string;
}

export const leagueStandings: LeaguePlayer[] = [
  {
    rank: 1,
    name: "Giulia M.",
    teamName: "Ferrari Forever",
    points: 312,
    lastRacePoints: 105,
    trend: "up",
    trendValue: 2,
    avatar: "G",
  },
  {
    rank: 2,
    name: "Luca B.",
    teamName: "Verstappen Gang",
    points: 298,
    lastRacePoints: 97,
    trend: "down",
    trendValue: 1,
    avatar: "L",
  },
  {
    rank: 3,
    name: "Marco R.",
    teamName: "Scuderia Mia",
    points: 287,
    lastRacePoints: 92,
    trend: "up",
    trendValue: 1,
    isUser: true,
    avatar: "M",
  },
  {
    rank: 4,
    name: "Sofia T.",
    teamName: "Silver Arrows",
    points: 271,
    lastRacePoints: 88,
    trend: "down",
    trendValue: 2,
    avatar: "S",
  },
  {
    rank: 5,
    name: "Andrea C.",
    teamName: "Papaya Rules",
    points: 265,
    lastRacePoints: 79,
    trend: "same",
    trendValue: 0,
    avatar: "A",
  },
  {
    rank: 6,
    name: "Elena P.",
    teamName: "Tifosi Rossi",
    points: 254,
    lastRacePoints: 75,
    trend: "up",
    trendValue: 3,
    avatar: "E",
  },
  {
    rank: 7,
    name: "Matteo R.",
    teamName: "Maranello Boys",
    points: 241,
    lastRacePoints: 68,
    trend: "down",
    trendValue: 1,
    avatar: "M",
  },
  {
    rank: 8,
    name: "Chiara V.",
    teamName: "Grid Girls",
    points: 228,
    lastRacePoints: 62,
    trend: "up",
    trendValue: 2,
    avatar: "C",
  },
  {
    rank: 9,
    name: "Paolo D.",
    teamName: "Prancing Horses",
    points: 215,
    lastRacePoints: 58,
    trend: "same",
    trendValue: 0,
    avatar: "P",
  },
  {
    rank: 10,
    name: "Francesca N.",
    teamName: "Alpine Dream",
    points: 198,
    lastRacePoints: 51,
    trend: "down",
    trendValue: 1,
    avatar: "F",
  },
  {
    rank: 11,
    name: "Roberto F.",
    teamName: "Pit Stop Kings",
    points: 187,
    lastRacePoints: 48,
    trend: "up",
    trendValue: 1,
    avatar: "R",
  },
  {
    rank: 12,
    name: "Valentina S.",
    teamName: "Red Flag Racing",
    points: 175,
    lastRacePoints: 44,
    trend: "same",
    trendValue: 0,
    avatar: "V",
  },
];

export const userStats = {
  name: "Marco R.",
  teamName: "Scuderia Mia",
  budget: 23.5, // crediti rimanenti in milioni
  totalBudget: 100.0,
  rank: 3,
  totalPlayers: 24,
  totalPoints: 287,
  pointsThisMonth: 92,
  avatar: "M",
  transfersAvailable: 2,
  transfersUsed: 1,
  weeklyRank: 2,
  seasonBest: 1,
};

export const weeklyPointsHistory = [
  { race: "BHR", points: 87 },
  { race: "SAU", points: 74 },
  { race: "AUS", points: 92 },
  { race: "CHN", points: 0 },
];
