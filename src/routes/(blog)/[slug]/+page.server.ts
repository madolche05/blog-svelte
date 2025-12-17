import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals: { supabase } }) => {
    const { slug } = params;

    const { data: post, error: dbError } = await supabase
        .from('posts')
        .select(`
            title,
            content,
            published_at,
            created_at,
            featured_image,
            author:author_id ( full_name, avatar_url, username )
        `)
        .eq('slug', slug)
        .eq('status', 'published')
        .single();

    if (dbError || !post) {
        console.error('Error fetching post:', dbError);
        throw error(404, 'Post not found');
    }

    return { post };
};
