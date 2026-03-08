import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Tipi per il database Supabase
export type Profile = {
    id: string;
    email: string;
    team_name: string;
    avatar_emoji: string;
    league_id: string | null;
    budget_remaining: number;
    created_at: string;
    updated_at: string;
};

export type League = {
    id: string;
    name: string;
    invite_code: string;
    admin_id: string;
    created_at: string;
};

export type TeamPick = {
    id: string;
    user_id: string;
    driver_id: string;
    is_captain: boolean;
    is_vice_captain: boolean;
    price: number;
    race_id: string;
};

export type RaceResult = {
    id: string;
    race_id: string;
    driver_id: string;
    position: number;
    points: number;
    fastest_lap: boolean;
};

export type UserScore = {
    id: string;
    user_id: string;
    race_id: string;
    total_points: number;
    position: number;
};
