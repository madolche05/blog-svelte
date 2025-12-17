import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
    default: async ({ request, locals: { supabase } }) => {
        const formData = await request.formData();
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
            .insert({ name, slug });

        if (error) {
            console.error('Error creating tag:', error);
            if (error.code === '23505') { // Unique violation
                return fail(400, { error: 'Slug already exists. Please choose another one.', name, slug });
            }
            return fail(500, { error: 'Failed to create tag.', name, slug });
        }

        throw redirect(303, '/admin/tags');
    }
};
