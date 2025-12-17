import { fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
    const { data: posts, error } = await supabase
        .from('posts')
        .select(`
            id,
            title,
            slug,
            status,
            created_at,
            updated_at,
            author:author_id ( full_name )
        `)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching posts:', error);
        return { posts: [] };
    }

    return { posts };
};

export const actions: Actions = {
    delete: async ({ request, locals: { supabase } }) => {
        const formData = await request.formData();
        const id = formData.get('id') as string;

        if (!id) {
            return fail(400, { error: 'Invalid post ID' });
        }

        const { error } = await supabase
            .from('posts')
            .delete()
            .eq('id', id);

        if (error) {
            return fail(500, { error: error.message });
        }

        return { success: true };
    }
};
