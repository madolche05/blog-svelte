<script lang="ts">
    import { enhance } from '$app/forms';
    import type { ActionData } from './$types';

    let { form } = $props();

    // Auto-generate slug from name if slug is empty
    let name = $state(form?.name ?? '');
    let slug = $state(form?.slug ?? '');

    $effect(() => {
        if (form) {
            if (form.name) name = form.name;
            if (form.slug) slug = form.slug;
        }
    });

    function handleNameInput(e: Event) {
        const target = e.target as HTMLInputElement;
        if (!slug || slug === '') {
             slug = target.value.toLowerCase()
                .replace(/[^\w\s-]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-')
                .trim();
        }
    }
</script>

<div class="max-w-2xl mx-auto">
    <div class="flex items-center gap-4 mb-6">
        <a href="/admin/tags" class="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        </a>
        <h1 class="text-3xl font-bold">Create Tag</h1>
    </div>

    <div class="card bg-base-100 shadow-sm border border-base-200">
        <div class="card-body">
            <form method="POST" use:enhance class="space-y-4">
                {#if form?.error}
                    <div class="alert alert-error">
                        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>{form.error}</span>
                    </div>
                {/if}

                <div class="form-control">
                    <label class="label" for="name">
                        <span class="label-text font-medium">Name</span>
                    </label>
                    <input 
                        type="text" 
                        name="name" 
                        id="name"
                        bind:value={name} 
                        oninput={handleNameInput}
                        placeholder="e.g. Technology" 
                        class="input input-bordered w-full" 
                        required 
                    />
                </div>

                <div class="form-control">
                    <label class="label" for="slug">
                        <span class="label-text font-medium">Slug</span>
                    </label>
                    <input 
                        type="text" 
                        name="slug" 
                        id="slug"
                        bind:value={slug}
                        placeholder="e.g. technology" 
                        class="input input-bordered w-full" 
                    />
                    <label class="label">
                        <span class="label-text-alt text-base-content/60">Leave empty to auto-generate from name</span>
                    </label>
                </div>

                <div class="card-actions justify-end mt-6">
                    <button type="submit" class="btn btn-primary">Create Tag</button>
                </div>
            </form>
        </div>
    </div>
</div>
