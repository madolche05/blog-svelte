import { fail, redirect } from '@sveltejs/kit';
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
    default: async ({ request, locals: { supabase, user } }) => {
        const formData = await request.formData();
        const title = formData.get('title') as string;
        let slug = formData.get('slug') as string;
        const excerpt = formData.get('excerpt') as string;
        const content = formData.get('content') as string;
        const status = formData.get('status') as string;
        const imageFile = formData.get('image') as File;
        const selectedTags = formData.getAll('tags') as string[];
        
        // This might be empty if we are just uploading a file, 
        // but if we had a hidden field for a URL it would be here.
        // For 'create', it's usually null unless we failed once and are returning.
        const featured_image_input = formData.get('featured_image') as string; 

        if (!title) {
            return fail(400, { error: 'Title is required', title, slug, excerpt, content, status, featured_image: featured_image_input });
        }

        // Generate slug from title if empty
        if (!slug) {
            slug = title.toLowerCase()
                .replace(/[^\w\s-]/g, '') // Remove special chars
                .replace(/\s+/g, '-')     // Replace spaces with hyphens
                .replace(/-+/g, '-')      // Avoid multiple hyphens
                .trim();
        }

        let featured_image = featured_image_input || null;

        if (imageFile && imageFile.size > 0) {
            const fileExt = imageFile.name.split('.').pop();
            const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
            const filePath = `post-covers/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('images')
                .upload(filePath, imageFile);

            if (uploadError) {
                console.error('Error uploading image:', uploadError);
                return fail(500, { error: 'Failed to upload image.', title, slug, excerpt, content, status, featured_image });
            }

            const { data: { publicUrl } } = supabase.storage
                .from('images')
                .getPublicUrl(filePath);

            featured_image = publicUrl;
        }

        const postData = {
            title,
            slug,
            excerpt,
            content,
            status,
            featured_image,
            author_id: user?.id,
            published_at: status === 'published' ? new Date().toISOString() : null
        };

        const { data: post, error } = await supabase
            .from('posts')
            .insert(postData)
            .select()
            .single();

        if (error) {
            console.error('Error creating post:', error);
            if (error.code === '23505') { // Unique violation for slug
                return fail(400, { error: 'Slug already exists. Please choose another one.', title, slug, excerpt, content, status, featured_image });
            }
            return fail(500, { error: 'Failed to create post.', title, slug, excerpt, content, status, featured_image });
        }

        if (selectedTags.length > 0 && post) {
            const postTags = selectedTags.map(tagId => ({
                post_id: post.id,
                tag_id: tagId
            }));

            const { error: tagError } = await supabase
                .from('post_tags')
                .insert(postTags);
            
            if (tagError) {
                console.error('Error adding tags to post:', tagError);
            }
        }

        throw redirect(303, '/admin/posts');
    }
};
