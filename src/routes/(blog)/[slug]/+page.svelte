<script lang="ts">
    import type { PageData } from './$types';
    import { marked } from 'marked';
    import { onMount } from 'svelte';

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
        tags?: string[]; // Assuming tags
    }

    export let data: PageData;
    
    $: post = data.post as unknown as Post;

    let scrollProgress = 0;

    function handleScroll() {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (window.scrollY / totalHeight) * 100;
        scrollProgress = progress;
    }

    onMount(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    });

    function formatDate(dateString: string | null) {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
    
    // Placeholder image
    const placeholderImage = "https://lh3.googleusercontent.com/aida-public/AB6AXuDABXlwps3td4rev8pzIeDFIIhKx1oolZsYpyTnCenu1ROyRTTmpEKiJKY_H5dgCntK0pdS4llyoOis2ilvM33-QHIWHgESQdOp9m56CpxUBqZg8fpstWSeLpDEX_m-xVcEUvYYkn8UftlPNncE1a8oevurGxqi5NcSHuluoI1TEvyYxDykw7PpFMWLr0P-XTg97JIpW1oU5PzafrgKa2OhaPQ_sl-R6se4mftP7ycIYCvkNBOLRDa-DnByPHYOsTvj3ZNuBFPS2w";
    const authorPlaceholder = "https://lh3.googleusercontent.com/aida-public/AB6AXuCof7RPE_gggmgX8eDzIPv1QOo4X06In9_M1umgvYpYXdiV02NU8IPR8HJKPp__JrpaaBdF3y207Dmqh0dPSm0u9KCnwU78kiNQLpb12DsmFXAsynPakUlU_eynkNGUZKc4vYkPqDQ3mtMkL_4J9Mhp1vxh86KWyNeOpA17JJGQjz9NpyT16V5dimQ1Y2Vf8yohfssrMQSpotI2Qoq7ss6R1CbjAAhhAO2YUfOJ8JTIVmTtDrtRBVDFvzEW9tGx5hC5c47GqC5Frw";
</script>

<!-- Reading Progress Bar -->
<div class="fixed top-0 left-0 w-full h-1 z-[60] bg-gray-200 dark:bg-gray-800">
    <div class="h-full bg-primary transition-all duration-100 ease-out" style="width: {scrollProgress}%"></div>
</div>

<div class="w-full max-w-[1200px] mx-auto px-4 md:px-10 py-8 md:py-12">
    {#if post}
        <!-- Article Header -->
        <div class="flex flex-col items-center text-center max-w-[800px] mx-auto mb-8">
            <span class="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">Technology</span>
            <h1 class="text-[#111418] dark:text-white tracking-tight text-3xl md:text-[40px] font-bold leading-[1.2] pb-4">
                {post.title}
            </h1>
            <div class="flex items-center gap-2 text-[#617589] dark:text-slate-400 text-sm font-medium">
                <div class="flex items-center gap-2">
                    <img class="w-6 h-6 rounded-full object-cover" alt="Portrait of the author" src={post.author?.avatar_url || authorPlaceholder}/>
                    <span>{post.author?.full_name || post.author?.username || 'Sarah Jenkins'}</span>
                </div>
                <span>•</span>
                <span>{formatDate(post.published_at || post.created_at)}</span>
                <span>•</span>
                <span>5 min read</span>
            </div>
        </div>

        <!-- Hero Image -->
        <div class="w-full mb-12 rounded-xl overflow-hidden shadow-sm">
            <div class="w-full aspect-video md:aspect-[21/9] bg-center bg-no-repeat bg-cover bg-gray-200 dark:bg-gray-800" role="img" aria-label={post.title} style="background-image: url('{post.featured_image || placeholderImage}');">
            </div>
        </div>

        <!-- Content Layout with Sticky Sidebar -->
        <div class="flex flex-col lg:flex-row gap-12 relative">
            <!-- Sidebar (Social Actions) -->
            <aside class="hidden lg:flex flex-col gap-6 sticky top-32 h-fit w-12 items-center">
                <button class="group flex flex-col items-center gap-1 text-slate-500 hover:text-primary transition-colors">
                    <div class="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 group-hover:bg-primary/10 flex items-center justify-center transition-colors">
                        <span class="material-symbols-outlined">favorite</span>
                    </div>
                    <span class="text-xs font-medium">1.2k</span>
                </button>
                <button class="group flex flex-col items-center gap-1 text-slate-500 hover:text-primary transition-colors">
                    <div class="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 group-hover:bg-primary/10 flex items-center justify-center transition-colors">
                        <span class="material-symbols-outlined">chat_bubble</span>
                    </div>
                    <span class="text-xs font-medium">48</span>
                </button>
                <button class="group flex flex-col items-center gap-1 text-slate-500 hover:text-primary transition-colors">
                    <div class="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 group-hover:bg-primary/10 flex items-center justify-center transition-colors">
                        <span class="material-symbols-outlined">bookmark</span>
                    </div>
                </button>
                <button class="group flex flex-col items-center gap-1 text-slate-500 hover:text-primary transition-colors">
                    <div class="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 group-hover:bg-primary/10 flex items-center justify-center transition-colors">
                        <span class="material-symbols-outlined">share</span>
                    </div>
                </button>
            </aside>

            <!-- Article Body -->
            <article class="flex-1 max-w-[720px] mx-auto">
                <div class="prose prose-lg prose-slate dark:prose-invert max-w-none text-[#111418] dark:text-slate-200 font-normal leading-relaxed">
                   {@html marked(post.content || '')}
                </div>
                
                <!-- Article Tags -->
                <div class="flex flex-wrap gap-2 pt-6 border-t border-[#f0f2f4] dark:border-slate-800 mt-8">
                    <span class="text-sm text-slate-500 dark:text-slate-400 mr-2">Tags:</span>
                    <a class="px-3 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-primary/10 hover:text-primary dark:hover:bg-primary/20 dark:hover:text-primary text-slate-600 dark:text-slate-300 text-sm rounded-full transition-colors" href="#">#WebDesign</a>
                    <a class="px-3 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-primary/10 hover:text-primary dark:hover:bg-primary/20 dark:hover:text-primary text-slate-600 dark:text-slate-300 text-sm rounded-full transition-colors" href="#">#Minimalism</a>
                    <a class="px-3 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-primary/10 hover:text-primary dark:hover:bg-primary/20 dark:hover:text-primary text-slate-600 dark:text-slate-300 text-sm rounded-full transition-colors" href="#">#UX</a>
                </div>

                <!-- Author Box -->
                <div class="mt-12 p-6 bg-[#f0f2f4] dark:bg-slate-800/50 rounded-xl flex gap-6 items-start md:items-center">
                    <img class="w-16 h-16 rounded-full object-cover shrink-0" alt="Portrait of author" src={post.author?.avatar_url || authorPlaceholder}/>
                    <div>
                        <h3 class="font-bold text-[#111418] dark:text-white text-lg">{post.author?.full_name || 'Sarah Jenkins'}</h3>
                        <p class="text-slate-600 dark:text-slate-400 text-sm mt-1">Senior UI/UX Designer and Tech Writer. Passionate about building accessible and performant web experiences. Coffee enthusiast.</p>
                        <div class="flex gap-3 mt-3">
                            <a class="text-slate-500 hover:text-primary transition-colors text-sm font-medium" href="#">Follow</a>
                            <a class="text-slate-500 hover:text-primary transition-colors text-sm font-medium" href="#">View Profile</a>
                        </div>
                    </div>
                </div>

                <!-- Mobile Social Share (Visible only on small screens) -->
                <div class="lg:hidden flex justify-between items-center mt-8 py-4 border-y border-[#f0f2f4] dark:border-slate-800">
                    <span class="text-sm font-medium text-slate-500">Share this article:</span>
                    <div class="flex gap-4">
                        <button class="text-slate-500 hover:text-primary"><span class="material-symbols-outlined">favorite</span></button>
                        <button class="text-slate-500 hover:text-primary"><span class="material-symbols-outlined">chat_bubble</span></button>
                        <button class="text-slate-500 hover:text-primary"><span class="material-symbols-outlined">bookmark</span></button>
                        <button class="text-slate-500 hover:text-primary"><span class="material-symbols-outlined">share</span></button>
                    </div>
                </div>
            </article>
        </div>

        <!-- Related Articles Section -->
        <section class="mt-20 border-t border-[#f0f2f4] dark:border-slate-800 pt-12">
            <h3 class="text-2xl font-bold text-[#111418] dark:text-white mb-8">You might also like</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <!-- Card 1 -->
                <a class="group flex flex-col gap-3" href="#">
                    <div class="overflow-hidden rounded-lg aspect-[4/3]">
                        <div class="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuCapRaJ_3Vtvz3palz2RB3aaWAmedOV5qSu_JFevE7cyocwF-0PHGsY_gtHyrf5L3ufZvNCna8lhOIzBRaj5tf59WZ10dcDm6KEzSzGIz3CwsX5Ejg0HBtjGhTAmCy6gbXA4QsOOtdvo78wvDQcyxpZj91iQCMzdjSxw3ZmI6-9vMyE0JDe8oA-MOL-YDVSPFeUYbZzIvi8OD16eOtrmaL4vHBoPCF84f0HJV8l_8QQnTaBEAK_Ek9--BdT2WYEUn3Nx2NabDOvHQ");'>
                        </div>
                    </div>
                    <div>
                        <span class="text-xs font-bold text-primary uppercase tracking-wide">Design</span>
                        <h4 class="text-lg font-bold text-[#111418] dark:text-white mt-1 group-hover:text-primary transition-colors">Designing for VR: Beyond the Screen</h4>
                        <p class="text-slate-500 dark:text-slate-400 text-sm mt-2 line-clamp-2">Exploring the unique challenges and opportunities in creating immersive virtual reality interfaces.</p>
                    </div>
                </a>
                <!-- Card 2 -->
                <a class="group flex flex-col gap-3" href="#">
                    <div class="overflow-hidden rounded-lg aspect-[4/3]">
                        <div class="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuC85AEByvLIBYF7aqrZPxRIxMmgY71pFJ_w2bwCuNuo4ei1M_e77ArASdd2a5eX9GMjVjRBWiyim-J_vXE2rDrB_IGOxa1I_dV2p6j4_tKsI7FXxiEqSLP36_IKyO3TqeEh1voyuif8PXW673EEbyf7wRJ_rPAb2NhD5oX6-uLDeqJ7NdYFU8YPHMWbaTpoY_gZCYtepuApFOlCgO6Ox2h5zV7JuYT_odqOqoYKnFF_EZqD89jgtVG_GDvAsWK855l6RfxtHlRDSg");'>
                        </div>
                    </div>
                    <div>
                        <span class="text-xs font-bold text-primary uppercase tracking-wide">Development</span>
                        <h4 class="text-lg font-bold text-[#111418] dark:text-white mt-1 group-hover:text-primary transition-colors">The State of JavaScript in 2024</h4>
                        <p class="text-slate-500 dark:text-slate-400 text-sm mt-2 line-clamp-2">A comprehensive look at the new features, frameworks, and tooling that are shaping the ecosystem.</p>
                    </div>
                </a>
                <!-- Card 3 -->
                <a class="group flex flex-col gap-3" href="#">
                    <div class="overflow-hidden rounded-lg aspect-[4/3]">
                        <div class="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuD4beKhpBfLQ0LcQBkwcoeGuLSx46oGQ8YHYjrJgFAnpRyhhYkiiWkibNjcxYNFppOaEDphool9ZH-TAYigUEtnGm9mnfLtcYwx_zMS44XcBrfsD927LIL410End6TYth3K7Fcp6TfmISKHr5MPMYOCUUn0himc_6trN89OS-Lmmn727CVse_Q5q495HkxVPxnOjZPFpTSOD7TEVGHTE-sfCSiQkBe2GvFIdW6h5RsSRuc9FkBRu89onB1YMMLziJFKKcxOGlhEOw");'>
                        </div>
                    </div>
                    <div>
                        <span class="text-xs font-bold text-primary uppercase tracking-wide">Tutorial</span>
                        <h4 class="text-lg font-bold text-[#111418] dark:text-white mt-1 group-hover:text-primary transition-colors">CSS Grid Mastery: Advanced Layouts</h4>
                        <p class="text-slate-500 dark:text-slate-400 text-sm mt-2 line-clamp-2">Stop fighting with floats and learn how to build complex, responsive layouts with ease using CSS Grid.</p>
                    </div>
                </a>
            </div>
        </section>

        <!-- Comments Section -->
        <section class="mt-16 max-w-[720px] mx-auto">
            <h3 class="text-2xl font-bold text-[#111418] dark:text-white mb-6">Comments (3)</h3>
            <!-- Comment Form -->
            <div class="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-[#f0f2f4] dark:border-slate-700 mb-10">
                <h4 class="text-base font-semibold text-[#111418] dark:text-white mb-4">Leave a comment</h4>
                <textarea class="w-full bg-[#f0f2f4] dark:bg-slate-900 border-none rounded-lg p-4 text-sm focus:ring-2 focus:ring-primary text-[#111418] dark:text-white placeholder-slate-500 resize-y min-h-[100px]" placeholder="Share your thoughts..."></textarea>
                <div class="flex justify-end mt-4">
                    <button class="bg-primary hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium text-sm transition-colors">Post Comment</button>
                </div>
            </div>
            <!-- Comment List -->
            <div class="flex flex-col gap-8">
                <!-- Comment 1 -->
                <div class="flex gap-4">
                    <img class="w-10 h-10 rounded-full object-cover" alt="Avatar of Mark Davis" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNB9PcgWr8a7UlnKhCMlrzqqcjorHl-XTHDVR0fZ59fOaluyN6ZiOYdrMNQeC_UbVdBR7Je8B4O8Eq47ZEKVnTG9Z4ELVT1MyebV5BSjoh6yEFvhSv5_-RE6IWNme1srUeUG9k0yV1aTprWlDc0I_kc7HfTlHsLGvsAJyeTePwNICo8-gyF0fVhKn1XWUq0GZB9Zj7cYGVVFocfxjt5XOzehDYiSXI_aF2-Iznlvxi716Kr4aiiB9BR8KvU-YOazNj_uLJOckC3Q"/>
                    <div class="flex-1">
                        <div class="flex justify-between items-center mb-1">
                            <h5 class="font-bold text-[#111418] dark:text-white text-sm">Mark Davis</h5>
                            <span class="text-xs text-slate-500">2 hours ago</span>
                        </div>
                        <p class="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">Great article! I totally agree about the whitespace. It's amazing how much more professional a site looks just by adding more padding.</p>
                        <div class="flex gap-4 mt-2">
                            <button class="text-xs font-medium text-slate-500 hover:text-primary flex items-center gap-1">
                                <span class="material-symbols-outlined text-[16px]">thumb_up</span> Like
                            </button>
                            <button class="text-xs font-medium text-slate-500 hover:text-primary flex items-center gap-1">
                                <span class="material-symbols-outlined text-[16px]">reply</span> Reply
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    {/if}
</div>
