import { fail, redirect, error as svelteError } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ params, locals: { supabase } }) => {
    const { id } = params;

    const { data: post, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single();

    if (error || !post) {
        throw svelteError(404, 'Post not found');
    }

    const { data: tags, error: tagsError } = await supabase
        .from('tags')
        .select('*')
        .order('name', { ascending: true });

    if (tagsError) {
        console.error('Error fetching tags:', tagsError);
    }

    const { data: postTags, error: postTagsError } = await supabase
        .from('post_tags')
        .select('tag_id')
        .eq('post_id', id);
    
    if (postTagsError) {
         console.error('Error fetching post tags:', postTagsError);
    }

    const selectedTagIds = postTags?.map(pt => pt.tag_id) || [];

    return { post, tags: tags || [], selectedTagIds };
};

export const actions: Actions = {
    update: async ({ request, params, locals: { supabase } }) => {
        const { id } = params;
        const formData = await request.formData();
        const title = formData.get('title') as string;
        let slug = formData.get('slug') as string;
        const excerpt = formData.get('excerpt') as string;
        const content = formData.get('content') as string;
        const status = formData.get('status') as string;
        let featured_image = formData.get('featured_image') as string;
        const imageFile = formData.get('image') as File;
        const selectedTags = formData.getAll('tags') as string[];

        if (!title) {
            return fail(400, { error: 'Title is required', title, slug, excerpt, content, status });
        }

        if (!slug) {
            slug = title.toLowerCase()
                .replace(/[^\w\s-]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-')
                .trim();
        }

        if (imageFile && imageFile.size > 0) {
            const fileExt = imageFile.name.split('.').pop();
            const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
            const filePath = `post-covers/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('images')
                .upload(filePath, imageFile);

            if (uploadError) {
                console.error('Error uploading image:', uploadError);
                return fail(500, { error: 'Failed to upload image.', title, slug, excerpt, content, status });
            }

            const { data: { publicUrl } } = supabase.storage
                .from('images')
                .getPublicUrl(filePath);

            featured_image = publicUrl;
        }

        const updateData: any = {
            title,
            slug,
            excerpt,
            content,
            status,
            featured_image,
            updated_at: new Date().toISOString()
        };
        
        const { error } = await supabase
            .from('posts')
            .update(updateData)
            .eq('id', id);

        if (error) {
             console.error('Error updating post:', error);
             if (error.code === '23505') {
                return fail(400, { error: 'Slug already exists.', title, slug, excerpt, content, status });
            }
            return fail(500, { error: 'Failed to update post.', title, slug, excerpt, content, status });
        }

        // Update tags
        // 1. Delete existing tags for this post
        const { error: deleteTagsError } = await supabase
            .from('post_tags')
            .delete()
            .eq('post_id', id);

        if (deleteTagsError) {
            console.error('Error deleting old tags:', deleteTagsError);
        }

        // 2. Insert new tags
        if (selectedTags.length > 0) {
             const postTags = selectedTags.map(tagId => ({
                post_id: id,
                tag_id: tagId
            }));
            
            const { error: insertTagsError } = await supabase
                .from('post_tags')
                .insert(postTags);

            if (insertTagsError) {
                console.error('Error adding tags:', insertTagsError);
            }
        }

        return { success: true, title, slug, excerpt, content, status };
    },
    
    delete: async ({ params, locals: { supabase } }) => {
        const { id } = params;
        const { error } = await supabase.from('posts').delete().eq('id', id);
        
        if (error) {
            return fail(500, { error: error.message });
        }
        
        throw redirect(303, '/admin/posts');
    }
};