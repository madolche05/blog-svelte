-- Migration: Add auto_excerpt function to avoid fetching full content for excerpts
-- Run this in your Supabase SQL Editor

CREATE OR REPLACE FUNCTION auto_excerpt(posts_row posts)
RETURNS text AS $$
BEGIN
  -- If the excerpt column is set and not empty, return it
  IF posts_row.excerpt IS NOT NULL AND posts_row.excerpt <> '' THEN
    RETURN posts_row.excerpt;
  END IF;

  -- Otherwise, generate from content by stripping markdown and truncating
  -- This regex removes common markdown characters: #, *, `, [, ], (, )
  -- And truncates to 150 characters
  RETURN LEFT(REGEXP_REPLACE(posts_row.content, '[#*`\[\]()]', '', 'g'), 150) || '...';
END;
$$ LANGUAGE plpgsql STABLE;
