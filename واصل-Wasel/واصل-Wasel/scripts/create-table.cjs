/**
 * Run this script ONCE to create the registration_requests table in Supabase.
 * Usage: node scripts/create-table.cjs
 *
 * Or just run the SQL below directly in Supabase SQL Editor.
 */

const SQL = `
-- Drop and recreate registration_requests table
DROP TABLE IF EXISTS registration_requests;

CREATE TABLE registration_requests (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  type          TEXT NOT NULL,          -- 'specialist' | 'center'
  full_name     TEXT NOT NULL,
  phone         TEXT NOT NULL,
  username      TEXT NOT NULL,
  password      TEXT NOT NULL,
  role          TEXT,
  bio           TEXT,
  image         TEXT,
  center_name   TEXT,
  location      TEXT,
  address       TEXT,
  working_hours TEXT,
  region        TEXT,
  status        TEXT NOT NULL DEFAULT 'pending',   -- 'pending' | 'approved' | 'rejected'
  submitted_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  reviewed_at   TIMESTAMPTZ
);

-- Disable RLS so the frontend can read/write freely (prototype mode)
ALTER TABLE registration_requests DISABLE ROW LEVEL SECURITY;
`;

console.log('=== Copy & paste the following SQL into Supabase SQL Editor ===');
console.log('URL: https://supabase.com/dashboard → your project → SQL Editor → New Query');
console.log('');
console.log(SQL);
console.log('=== Done — paste the SQL above and click Run ===');
