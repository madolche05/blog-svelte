import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ params, locals: { supabase } }) => {
    const { id } = params;

    const { data: tag, error } = await supabase
        .from('tags')
        .select('*')
        .eq('id', id)
        .single();

    if (error || !tag) {
        throw redirect(303, '/admin/tags');
    }

    return { tag };
};

export const actions: Actions = {
    default: async ({ request, params, locals: { supabase } }) => {
        const formData = await request.formData();
        const id = params.id;
        const name = formData.get('name') as string;
        let slug = formData.get('slug') as string;

        if (!name) {
            return fail(400, { error: 'Name is required', name, slug });
        }

         if (!slug) {
            slug = name.toLowerCase()
                .replace(/[^\w\s-]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-')
                .trim();
        }

        const { error } = await supabase
            .from('tags')
            .update({ name, slug })
            .eq('id', id);

        if (error) {
             console.error('Error updating tag:', error);
            if (error.code === '23505') { // Unique violation
                return fail(400, { error: 'Slug already exists. Please choose another one.', name, slug });
            }
            return fail(500, { error: 'Failed to update tag.', name, slug });
        }

        throw redirect(303, '/admin/tags');
    }
};
