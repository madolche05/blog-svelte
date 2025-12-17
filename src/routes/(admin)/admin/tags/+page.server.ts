import { fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
    const { data: tags, error } = await supabase
        .from('tags')
        .select('*')
        .order('name', { ascending: true });

    if (error) {
        console.error('Error fetching tags:', error);
        return { tags: [] };
    }

    return { tags };
};

export const actions: Actions = {
    delete: async ({ request, locals: { supabase } }) => {
        const formData = await request.formData();
        const id = formData.get('id') as string;

        if (!id) {
            return fail(400, { error: 'Invalid tag ID' });
        }

        const { error } = await supabase
            .from('tags')
            .delete()
            .eq('id', id);

        if (error) {
            return fail(500, { error: error.message });
        }

        return { success: true };
    }
};
