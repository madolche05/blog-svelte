import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
    const { data: postsData, error } = await supabase
        .from('posts')
        .select(
            `
            title,
            slug,
            excerpt: auto_excerpt,
            published_at,
            created_at,
            featured_image,
            author:author_id ( full_name )
        `
        )
        .eq('status', 'published')
        .order('published_at', { ascending: false });

    if (error) {
        console.error('Error fetching posts:', error);
        return { posts: [] };
    }

    // Cast the result to the expected type since we know 'excerpt' is returned by the DB function
    // and we removed the JS processing.
    const posts = postsData as unknown as Array<{
        title: string;
        slug: string;
        excerpt: string;
        published_at: string | null;
        created_at: string;
        featured_image: string | null;
        author: { full_name: string | null } | null;
    }>;

    return { posts };
};
