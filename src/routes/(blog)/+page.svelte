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
        tags?: string[]; // Assuming tags might be available or I'll ignore them for now
    }

    export let data: PageData;

    $: posts = data.posts as unknown as Post[];
    $: featuredPost = posts.length > 0 ? posts[0] : null;
    $: recentPosts = posts.length > 1 ? posts.slice(1) : [];

    function formatDate(dateString: string | null) {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    // Placeholder image if no featured image
    const placeholderImage = "https://lh3.googleusercontent.com/aida-public/AB6AXuBBhtqY489sr97zDORi-cLx9NC_FuvaZFz5urdbbyUlEyy7H1he8AS86GK2PfNotGjllZQNh2Vzz0vZ269u7yI5BQNhIWfIAKS1qzav42TNHZNRNFesc37M0zfyeyrlZI2sFnTCD2h7VaE1W5LYEsZtJoZTwadHjxNTiiHRIX8d5Qz4pgN_N3m_YuqOC_mX_l7bEUCuEQ9Ao6Z0JUhfj_D-aHYmt0RmiEfLrWFzSv1pnLcd3peiuzCm6u95SeNknKf2GVNdw9rDPw";
</script>

<div class="w-full bg-surface-light dark:bg-surface-dark pb-8 pt-6">
    <div class="mx-auto max-w-[1280px] px-4 lg:px-10">
        <div class="@container">
            <div class="rounded-xl overflow-hidden relative min-h-[420px] flex flex-col items-center justify-center text-center p-8 gap-6 bg-cover bg-center" style='background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url("https://lh3.googleusercontent.com/aida-public/AB6AXuAcF2dIOUP2iZotd7Ur4ci0P4H5ShoJEzCGD8y82dIub2eGY1YpJcegdelnJoWHmRscfFcSyqvweuYDUnuPODDzNGlK8uj-bE3_FDY0yioG0H6Gnf_ynLT3f9lLjn19_tRKCXZr5NZMGQwwd4Mohk_-8edhW4yT2YOLoJVF83DFSUdxjRmqwgyOOE6ZJ5e8aMcoakKZcDTR7bBsRrOyFIcAalxLtrY4aASgiAJYXW75K1JbIYjCQgZQEq6PxEdvhXZvGFHszd3UUA");'>
                <div class="flex flex-col gap-3 max-w-[800px]">
                    <h1 class="text-white text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-[-0.033em] drop-shadow-lg">
                        Wawasan &amp; Cerita Inspiratif
                    </h1>
                    <h2 class="text-gray-200 text-base sm:text-lg font-medium leading-relaxed drop-shadow-md">
                        Jelajahi ide-ide terbaru seputar teknologi, gaya hidup, dan kreativitas. Temukan perspektif baru setiap hari untuk mengembangkan diri Anda.
                    </h2>
                </div>
                <div class="flex gap-4">
                    <button class="flex items-center justify-center rounded-lg h-12 px-8 bg-primary hover:bg-blue-600 text-white text-base font-bold transition-all shadow-lg transform hover:-translate-y-0.5">
                        Mulai Membaca
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Categories Chips -->
<div class="w-full bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark sticky top-[65px] z-40 shadow-sm backdrop-blur-md bg-opacity-95 dark:bg-opacity-95">
    <div class="mx-auto max-w-[1280px] px-4 lg:px-10 py-3">
        <div class="flex gap-3 overflow-x-auto no-scrollbar pb-1">
            <button class="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-primary text-white px-4 hover:opacity-90 transition-opacity">
                <span class="text-sm font-medium">Semua</span>
            </button>
            <button class="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-border-light dark:bg-background-dark hover:bg-gray-200 dark:hover:bg-gray-700 px-4 transition-colors">
                <span class="text-text-main-light dark:text-text-main-dark text-sm font-medium">Teknologi</span>
            </button>
            <button class="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-border-light dark:bg-background-dark hover:bg-gray-200 dark:hover:bg-gray-700 px-4 transition-colors">
                <span class="text-text-main-light dark:text-text-main-dark text-sm font-medium">Gaya Hidup</span>
            </button>
            <button class="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-border-light dark:bg-background-dark hover:bg-gray-200 dark:hover:bg-gray-700 px-4 transition-colors">
                <span class="text-text-main-light dark:text-text-main-dark text-sm font-medium">Kreativitas</span>
            </button>
            <button class="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-border-light dark:bg-background-dark hover:bg-gray-200 dark:hover:bg-gray-700 px-4 transition-colors">
                <span class="text-text-main-light dark:text-text-main-dark text-sm font-medium">Tutorial</span>
            </button>
            <button class="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-border-light dark:bg-background-dark hover:bg-gray-200 dark:hover:bg-gray-700 px-4 transition-colors">
                <span class="text-text-main-light dark:text-text-main-dark text-sm font-medium">Bisnis</span>
            </button>
            <button class="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-border-light dark:bg-background-dark hover:bg-gray-200 dark:hover:bg-gray-700 px-4 transition-colors">
                <span class="text-text-main-light dark:text-text-main-dark text-sm font-medium">Travel</span>
            </button>
        </div>
    </div>
</div>

<!-- Content Container -->
<div class="mx-auto flex w-full max-w-[1280px] flex-col lg:flex-row gap-10 px-4 lg:px-10 py-10">
    <!-- Main Column -->
    <div class="flex flex-col flex-[2] gap-10">
        <!-- Featured Article -->
        <section>
            <div class="flex items-center gap-2 pb-4">
                <span class="material-symbols-outlined text-primary">star</span>
                <h2 class="text-text-main-light dark:text-text-main-dark text-2xl font-bold leading-tight">Artikel Unggulan</h2>
            </div>
            {#if featuredPost}
            <div class="@container">
                <a href="/{featuredPost.slug}" class="flex flex-col items-stretch justify-start rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark group cursor-pointer">
                    <div class="w-full bg-center bg-no-repeat aspect-video bg-cover group-hover:scale-105 transition-transform duration-500" style="background-image: url('{featuredPost.featured_image || placeholderImage}');"></div>
                    <div class="flex w-full flex-col items-stretch justify-center gap-3 p-6 relative bg-surface-light dark:bg-surface-dark">
                        <div class="flex items-center gap-2">
                            <span class="bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded">Teknologi</span>
                            <span class="text-text-secondary-light dark:text-text-secondary-dark text-xs">• {formatDate(featuredPost.published_at || featuredPost.created_at)}</span>
                        </div>
                        <h3 class="text-text-main-light dark:text-text-main-dark text-2xl font-bold leading-tight group-hover:text-primary transition-colors">{featuredPost.title}</h3>
                        <p class="text-text-secondary-light dark:text-text-secondary-dark text-base leading-relaxed line-clamp-2">{featuredPost.excerpt || 'No description available.'}</p>
                        <div class="flex items-center justify-between pt-2">
                            <div class="flex items-center gap-2">
                                <div class="size-8 rounded-full bg-gray-300 bg-cover bg-center flex items-center justify-center overflow-hidden">
                                   <!-- Simple avatar placeholder if no image -->
                                   <span class="text-xs">{featuredPost.author?.full_name?.charAt(0) || 'A'}</span>
                                </div>
                                <span class="text-text-main-light dark:text-text-main-dark text-sm font-medium">{featuredPost.author?.full_name || 'Admin'}</span>
                            </div>
                            <span class="text-text-secondary-light dark:text-text-secondary-dark text-sm font-medium flex items-center gap-1">
                                <span class="material-symbols-outlined text-[16px]">schedule</span> 5 min baca
                            </span>
                        </div>
                    </div>
                </a>
            </div>
            {:else}
                <div class="p-8 text-center text-text-secondary-light">Belum ada artikel unggulan.</div>
            {/if}
        </section>

        <!-- Recent Articles Grid -->
        <section>
            <div class="flex items-center gap-2 pb-4 pt-4 border-t border-border-light dark:border-border-dark">
                <span class="material-symbols-outlined text-primary">history_edu</span>
                <h2 class="text-text-main-light dark:text-text-main-dark text-2xl font-bold leading-tight">Terbaru</h2>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
                {#each recentPosts as post}
                <!-- Card -->
                <a href="/{post.slug}" class="flex flex-col bg-surface-light dark:bg-surface-dark rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-border-light dark:border-border-dark transition-all hover:-translate-y-1 group cursor-pointer">
                    <div class="h-48 w-full bg-cover bg-center group-hover:opacity-90 transition-opacity" style="background-image: url('{post.featured_image || placeholderImage}');"></div>
                    <div class="p-5 flex flex-col gap-3 flex-1">
                        <div class="flex items-center justify-between">
                            <span class="text-primary text-xs font-bold uppercase tracking-wider">Artikel</span>
                            <span class="text-text-secondary-light dark:text-text-secondary-dark text-xs">{formatDate(post.published_at || post.created_at)}</span>
                        </div>
                        <h3 class="text-text-main-light dark:text-text-main-dark text-lg font-bold leading-snug group-hover:text-primary transition-colors">{post.title}</h3>
                        <p class="text-text-secondary-light dark:text-text-secondary-dark text-sm line-clamp-3">{post.excerpt || ''}</p>
                        <div class="mt-auto pt-4 flex items-center gap-2">
                             <div class="size-6 rounded-full bg-gray-300 bg-cover bg-center flex items-center justify-center overflow-hidden">
                                <span class="text-[10px]">{post.author?.full_name?.charAt(0) || 'A'}</span>
                            </div>
                            <span class="text-xs font-medium text-text-main-light dark:text-text-main-dark">{post.author?.full_name || 'Admin'}</span>
                        </div>
                    </div>
                </a>
                {/each}
            </div>
            {#if recentPosts.length > 0}
            <div class="mt-10 flex justify-center">
                <button class="flex min-w-[120px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-6 bg-transparent border border-border-dark text-text-main-light dark:text-text-main-dark hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-medium transition-colors">
                    Muat Lebih Banyak
                </button>
            </div>
            {:else}
             <div class="mt-10 text-center text-text-secondary-light">
                Tidak ada artikel terbaru lainnya.
            </div>
            {/if}
        </section>
    </div>

    <!-- Sidebar (Right) -->
    <aside class="flex flex-col flex-1 gap-8 min-w-[300px]">
        <!-- About Widget -->
        <div class="bg-surface-light dark:bg-surface-dark rounded-xl p-6 shadow-sm border border-border-light dark:border-border-dark">
            <h3 class="text-lg font-bold text-text-main-light dark:text-text-main-dark mb-4">Tentang Blog Ini</h3>
            <div class="flex flex-col gap-4">
                <div class="w-16 h-16 bg-primary rounded-lg flex items-center justify-center text-white">
                    <svg class="size-8" fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                        <path d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z"></path>
                    </svg>
                </div>
                <p class="text-sm text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
                    Blog Saya adalah wadah berbagi wawasan seputar dunia digital, mulai dari coding, desain, hingga tips gaya hidup modern. Misi kami adalah memberdayakan pembaca dengan pengetahuan praktis.
                </p>
                <a class="text-primary text-sm font-bold hover:underline" href="#">Baca Selengkapnya →</a>
            </div>
        </div>
        <!-- Newsletter Widget -->
        <div class="bg-gradient-to-br from-primary/10 to-transparent rounded-xl p-6 border border-primary/20">
            <div class="flex items-center gap-2 mb-2 text-primary">
                <span class="material-symbols-outlined">mail</span>
                <span class="text-xs font-bold uppercase tracking-wider">Newsletter</span>
            </div>
            <h3 class="text-lg font-bold text-text-main-light dark:text-text-main-dark mb-2">Dapatkan Update Mingguan</h3>
            <p class="text-sm text-text-secondary-light dark:text-text-secondary-dark mb-4">
                Bergabung dengan 5,000+ pembaca lainnya. Tanpa spam, hanya konten berkualitas.
            </p>
            <form class="flex flex-col gap-3">
                <input class="w-full rounded-lg border-border-light dark:border-border-dark bg-white dark:bg-background-dark px-3 py-2 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none text-text-main-light dark:text-text-main-dark" placeholder="Alamat email Anda" type="email"/>
                <button class="w-full rounded-lg bg-primary hover:bg-blue-600 text-white py-2 text-sm font-bold transition-colors" type="submit">
                    Langganan Sekarang
                </button>
            </form>
        </div>
        <!-- Trending List -->
        <div class="bg-surface-light dark:bg-surface-dark rounded-xl p-6 shadow-sm border border-border-light dark:border-border-dark">
            <div class="flex items-center gap-2 mb-5">
                <span class="material-symbols-outlined text-red-500">trending_up</span>
                <h3 class="text-lg font-bold text-text-main-light dark:text-text-main-dark">Sedang Populer</h3>
            </div>
            <div class="flex flex-col gap-5">
                <a class="group flex gap-3 items-start" href="#">
                    <span class="text-2xl font-black text-gray-200 dark:text-gray-700 leading-none group-hover:text-primary transition-colors">01</span>
                    <div>
                        <h4 class="text-sm font-bold text-text-main-light dark:text-text-main-dark group-hover:text-primary transition-colors line-clamp-2">5 Framework JavaScript Paling Dicari Tahun 2024</h4>
                        <p class="text-xs text-text-secondary-light dark:text-text-secondary-dark mt-1">Teknologi</p>
                    </div>
                </a>
                <a class="group flex gap-3 items-start" href="#">
                    <span class="text-2xl font-black text-gray-200 dark:text-gray-700 leading-none group-hover:text-primary transition-colors">02</span>
                    <div>
                        <h4 class="text-sm font-bold text-text-main-light dark:text-text-main-dark group-hover:text-primary transition-colors line-clamp-2">Cara Membangun Personal Branding di LinkedIn</h4>
                        <p class="text-xs text-text-secondary-light dark:text-text-secondary-dark mt-1">Bisnis</p>
                    </div>
                </a>
                <a class="group flex gap-3 items-start" href="#">
                    <span class="text-2xl font-black text-gray-200 dark:text-gray-700 leading-none group-hover:text-primary transition-colors">03</span>
                    <div>
                        <h4 class="text-sm font-bold text-text-main-light dark:text-text-main-dark group-hover:text-primary transition-colors line-clamp-2">Review Kamera Mirrorless untuk Content Creator</h4>
                        <p class="text-xs text-text-secondary-light dark:text-text-secondary-dark mt-1">Gaya Hidup</p>
                    </div>
                </a>
            </div>
        </div>
    </aside>
</div>