<script lang="ts">
    import { enhance } from '$app/forms';
    import type { PageData } from './$types';

    let { data } = $props();
    let { tags } = $derived(data);
</script>

<div class="flex justify-between items-center mb-6">
    <h1 class="text-3xl font-bold">Tags</h1>
    <a href="/admin/tags/create" class="btn btn-primary">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
        New Tag
    </a>
</div>

<div class="card bg-base-100 shadow-sm border border-base-200">
    <div class="overflow-x-auto">
        <table class="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Slug</th>
                    <th class="text-right">Actions</th>
                </tr>
            </thead>
            <tbody>
                {#each tags as tag}
                    <tr class="hover">
                        <td class="font-bold">{tag.name}</td>
                        <td class="text-base-content/60">{tag.slug}</td>
                        <td class="text-right">
                            <div class="flex justify-end gap-2">
                                <a href="/admin/tags/{tag.id}" class="btn btn-sm btn-ghost btn-square" aria-label="Edit">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                </a>
                                <form action="?/delete" method="POST" use:enhance onsubmit={(e) => { if(!confirm('Are you sure you want to delete this tag?')) e.preventDefault(); }}>
                                    <input type="hidden" name="id" value={tag.id} />
                                    <button type="submit" class="btn btn-sm btn-ghost btn-square text-error" aria-label="Delete">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                    </button>
                                </form>
                            </div>
                        </td>
                    </tr>
                {/each}
                {#if tags.length === 0}
                    <tr>
                        <td colspan="3" class="text-center py-8 text-base-content/60">
                            No tags found. Create one!
                        </td>
                    </tr>
                {/if}
            </tbody>
        </table>
    </div>
</div>
