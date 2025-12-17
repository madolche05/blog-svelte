import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
    const { data: posts, error } = await supabase
        .from('posts')
        .select(`
            title,
            slug,
            excerpt,
            published_at,
            created_at,
            featured_image,
            author:author_id ( full_name )
        `)
        .eq('status', 'published')
        .order('published_at', { ascending: false });

    if (error) {
        console.error('Error fetching posts:', error);
        return { posts: [] };
    }

    return { posts };
};