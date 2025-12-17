<script lang="ts">
    import type { PageData } from './$types';

    interface Post {
        title: string;
        content: string | null;
        published_at: string | null;
        created_at: string;
        featured_image: string | null;
        author: {
            full_name: string | null;
            avatar_url: string | null;
            username: string | null;
        } | null;
    }

    export let data: PageData;

    // Cast data.post to our defined interface
    $: post = data.post as unknown as Post;

    function formatDate(dateString: string | null) {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
</script>

<div class="max-w-3xl mx-auto py-8">
    <div class="mb-8">
        <a href="/" class="btn btn-ghost btn-sm gap-2 pl-0 hover:bg-transparent">
            &larr; Back to Home
        </a>
    </div>

    {#if post}
        <article class="prose lg:prose-xl">
            <h1>{post.title}</h1>
            <div class="flex items-center gap-4 text-sm text-base-content/70 not-prose mb-8">
                {#if post.author}
                    <div class="flex items-center gap-2">
                        {#if post.author.avatar_url}
                            <img src={post.author.avatar_url} alt={post.author.full_name || ''} class="w-8 h-8 rounded-full" />
                        {/if}
                        <span>{post.author.full_name || post.author.username}</span>
                    </div>
                    <span>•</span>
                {/if}
                <time>{formatDate(post.published_at || post.created_at)}</time>
            </div>
            
            {#if post.featured_image}
                <img src={post.featured_image} alt={post.title} class="w-full h-auto rounded-xl shadow-lg mb-8" />
            {/if}

            <div class="divider"></div>
            
            <!-- 
                Note: Content is stored as Markdown in the database. 
                Since we don't have a markdown parser installed yet, we display it as pre-wrapped text.
                To render Markdown, install 'marked' or 'svelte-markdown'.
            -->
            <div class="whitespace-pre-wrap font-sans text-base-content leading-relaxed">
                {post.content || ''}
            </div>
        </article>
    {/if}
</div>
