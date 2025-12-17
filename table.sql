-- 1. Membuat Tipe Data Enum untuk Status Post
-- Ini menjaga agar data tetap bersih, tidak ada typo seperti 'publshed'
CREATE TYPE post_status AS ENUM ('draft', 'published', 'archived');

-- 2. Membuat Tabel Profiles (Public User Data)
-- Di Supabase, user auth ada di schema 'auth'. Kita butuh tabel 'public'
-- untuk menyimpan nama, avatar, dll.
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  website TEXT,
  updated_at TIMESTAMP WITH TIME ZONE
);

-- 3. Membuat Tabel Posts
CREATE TABLE posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE, -- Index otomatis dibuat karena UNIQUE
  excerpt TEXT,
  content TEXT, -- Isi Markdown
  featured_image TEXT, -- URL gambar
  
  status post_status DEFAULT 'draft',
  published_at TIMESTAMP WITH TIME ZONE,
  
  author_id UUID REFERENCES profiles(id) NOT NULL
);

-- 4. Membuat Tabel Tags
CREATE TABLE tags (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE
);

-- 5. Membuat Tabel Pivot (Hubungan Many-to-Many Post & Tags)
CREATE TABLE post_tags (
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);