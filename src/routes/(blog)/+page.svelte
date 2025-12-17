<script lang="ts">
    import type { PageData } from './$types';

    interface Post {
        title: string;
        slug: string;
        excerpt: string | null;
        published_at: string | null;
        created_at: string;
        featured_image: string | null;
        author: {
            full_name: string | null;
        } | null;
    }

    export let data: PageData;

    // Cast data.posts to our defined interface to fix Supabase type inference issues
    $: posts = data.posts as unknown as Post[];

    function formatDate(dateString: string | null) {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }
</script>

<div class="space-y-12">
    <!-- Hero Section -->
    <div class="hero bg-base-200 rounded-box p-12 text-center">
        <div class="hero-content max-w-md flex-col">
            <h1 class="text-5xl font-bold">Hello there</h1>
            <p class="py-6">Welcome to my personal blog. Here I write about tech, life, and everything in between.</p>
            <button class="btn btn-primary">Read Latest</button>
        </div>
    </div>

    <!-- Post List -->
    <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {#each posts as post}
            <div class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow border border-base-200">
                {#if post.featured_image}
                    <figure>
                        <img src={post.featured_image} alt={post.title} class="w-full h-48 object-cover" />
                    </figure>
                {/if}
                <div class="card-body">
                    <div class="flex items-center gap-2 text-xs text-base-content/60 mb-2">
                        <span>{formatDate(post.published_at || post.created_at)}</span>
                        <span>•</span>
                        <span>{post.author?.full_name || 'Unknown'}</span>
                    </div>
                    <h2 class="card-title text-2xl mb-2 hover:text-primary cursor-pointer">
                        <a href="/{post.slug}">{post.title}</a>
                    </h2>
                    <p class="text-base-content/80">{post.excerpt || 'No excerpt available.'}</p>
                    <div class="card-actions justify-end mt-4">
                        <a href="/{post.slug}" class="btn btn-ghost btn-sm">Read More &rarr;</a>
                    </div>
                </div>
            </div>
        {/each}
        {#if posts.length === 0}
            <div class="col-span-full text-center py-12 text-base-content/60">
                <p>No posts found.</p>
            </div>
        {/if}
    </div>
</div>