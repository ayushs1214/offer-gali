/*
  # Initial Schema Setup for Deal Aggregator

  1. New Tables
    - profiles
      - id (uuid, primary key)
      - email (text, unique)
      - name (text)
      - created_at (timestamp)
    - retailers
      - id (uuid, primary key)
      - name (text)
      - website (text)
      - created_at (timestamp)
    - deals
      - id (uuid, primary key)
      - retailer_id (uuid, foreign key)
      - title (text)
      - description (text)
      - price (numeric)
      - original_price (numeric)
      - url (text)
      - expires_at (timestamp)
      - created_at (timestamp)
    - notifications
      - id (uuid, primary key)
      - user_id (uuid, foreign key)
      - deal_id (uuid, foreign key)
      - type (text)
      - read (boolean)
      - created_at (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Profiles table
CREATE TABLE profiles (
  id uuid REFERENCES auth.users PRIMARY KEY,
  email text UNIQUE NOT NULL,
  name text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Retailers table
CREATE TABLE retailers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  website text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE retailers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Retailers are readable by everyone"
  ON retailers
  FOR SELECT
  TO authenticated
  USING (true);

-- Deals table
CREATE TABLE deals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  retailer_id uuid REFERENCES retailers(id),
  title text NOT NULL,
  description text,
  price numeric NOT NULL,
  original_price numeric,
  url text,
  expires_at timestamptz,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE deals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Deals are readable by everyone"
  ON deals
  FOR SELECT
  TO authenticated
  USING (true);

-- Notifications table
CREATE TABLE notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  deal_id uuid REFERENCES deals(id),
  type text NOT NULL,
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own notifications"
  ON notifications
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications"
  ON notifications
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);