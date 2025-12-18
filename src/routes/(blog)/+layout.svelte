<script lang="ts">
    import '../../app.css';
    import { page } from '$app/stores';
    
    let { children } = $props();
    let isMobileMenuOpen = $state(false);

    function toggleMobileMenu() {
        isMobileMenuOpen = !isMobileMenuOpen;
    }
</script>

<div class="relative flex min-h-screen w-full flex-col group/design-root overflow-x-hidden bg-background-light dark:bg-background-dark font-display text-text-main-light dark:text-text-main-dark transition-colors duration-200">
    <!-- TopNavBar -->
    <nav class="sticky top-0 z-50 w-full border-b border-solid border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark px-4 py-3 lg:px-10 shadow-sm">
        <div class="mx-auto flex max-w-[1280px] items-center justify-between whitespace-nowrap">
            <div class="flex items-center gap-8">
                <a class="flex items-center gap-4 text-text-main-light dark:text-text-main-dark hover:opacity-80 transition-opacity" href="/">
                    <div class="size-8 text-primary">
                        <svg class="h-full w-full" fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                            <path d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z"></path>
                        </svg>
                    </div>
                    <h2 class="text-lg font-bold leading-tight tracking-[-0.015em]">Blog Saya</h2>
                </a>
                <div class="hidden lg:flex items-center gap-8">
                    <a class="text-sm font-medium leading-normal {$page.url.pathname === '/' ? 'text-primary' : 'text-text-main-light dark:text-text-main-dark'} hover:text-primary dark:hover:text-primary transition-colors" href="/">Beranda</a>
                    <a class="text-sm font-medium leading-normal text-text-secondary-light dark:text-text-secondary-dark hover:text-primary dark:hover:text-primary transition-colors" href="#">Artikel</a>
                    <a class="text-sm font-medium leading-normal text-text-secondary-light dark:text-text-secondary-dark hover:text-primary dark:hover:text-primary transition-colors" href="#">Tentang</a>
                    <a class="text-sm font-medium leading-normal text-text-secondary-light dark:text-text-secondary-dark hover:text-primary dark:hover:text-primary transition-colors" href="#">Kontak</a>
                </div>
            </div>
            <div class="flex flex-1 justify-end gap-4 sm:gap-8">
                <label class="hidden sm:flex flex-col min-w-40 !h-10 max-w-64">
                    <div class="flex w-full flex-1 items-stretch rounded-lg h-full">
                        <div class="text-text-secondary-light dark:text-text-secondary-dark flex border-none bg-background-light dark:bg-background-dark items-center justify-center pl-4 rounded-l-lg border-r-0">
                            <span class="material-symbols-outlined text-[20px]">search</span>
                        </div>
                        <input class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-main-light dark:text-text-main-dark focus:outline-0 focus:ring-0 border-none bg-background-light dark:bg-background-dark focus:border-none h-full placeholder:text-text-secondary-light dark:placeholder:text-text-secondary-dark px-4 rounded-l-none border-l-0 pl-2 text-sm font-normal leading-normal" placeholder="Cari artikel..." value=""/>
                    </div>
                </label>
                <button class="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary hover:bg-blue-600 text-white text-sm font-bold leading-normal tracking-[0.015em] transition-colors shadow-md">
                    <span class="truncate">Langganan</span>
                </button>
                <!-- Mobile Menu Button -->
                <button class="lg:hidden flex items-center justify-center text-text-main-light dark:text-text-main-dark" onclick={toggleMobileMenu}>
                    <span class="material-symbols-outlined">menu</span>
                </button>
            </div>
        </div>
        
        <!-- Mobile Menu -->
        {#if isMobileMenuOpen}
            <div class="lg:hidden absolute top-full left-0 w-full bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark p-4 flex flex-col gap-4 shadow-md">
                <a class="text-sm font-medium leading-normal text-text-main-light dark:text-text-main-dark hover:text-primary" href="/">Beranda</a>
                <a class="text-sm font-medium leading-normal text-text-secondary-light dark:text-text-secondary-dark hover:text-primary" href="#">Artikel</a>
                <a class="text-sm font-medium leading-normal text-text-secondary-light dark:text-text-secondary-dark hover:text-primary" href="#">Tentang</a>
                <a class="text-sm font-medium leading-normal text-text-secondary-light dark:text-text-secondary-dark hover:text-primary" href="#">Kontak</a>
            </div>
        {/if}
    </nav>

    <!-- Main Layout -->
    <main class="flex flex-1 flex-col">
        {@render children()}
    </main>

    <!-- Footer -->
    <footer class="bg-white dark:bg-surface-dark border-t border-border-light dark:border-border-dark mt-10">
        <div class="mx-auto max-w-[1280px] px-4 py-12 lg:px-10">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                <div class="col-span-1 md:col-span-2">
                    <div class="flex items-center gap-2 mb-4">
                        <div class="size-6 text-primary">
                            <svg class="h-full w-full" fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z"></path>
                            </svg>
                        </div>
                        <h2 class="text-xl font-bold text-text-main-light dark:text-text-main-dark">Blog Saya</h2>
                    </div>
                    <p class="text-text-secondary-light dark:text-text-secondary-dark text-sm leading-relaxed max-w-sm mb-6">
                        Menyajikan konten berkualitas tinggi untuk para profesional modern, penggemar teknologi, dan pencari inspirasi kreatif.
                    </p>
                    <div class="flex gap-4">
                        <a class="text-text-secondary-light dark:text-text-secondary-dark hover:text-primary transition-colors" href="#">
                            <span class="material-symbols-outlined">public</span>
                        </a>
                        <a class="text-text-secondary-light dark:text-text-secondary-dark hover:text-primary transition-colors" href="#">
                            <span class="material-symbols-outlined">alternate_email</span>
                        </a>
                        <a class="text-text-secondary-light dark:text-text-secondary-dark hover:text-primary transition-colors" href="#">
                            <span class="material-symbols-outlined">rss_feed</span>
                        </a>
                    </div>
                </div>
                <div>
                    <h3 class="text-sm font-bold text-text-main-light dark:text-text-main-dark uppercase tracking-wider mb-4">Navigasi</h3>
                    <ul class="flex flex-col gap-2">
                        <li><a class="text-sm text-text-secondary-light dark:text-text-secondary-dark hover:text-primary transition-colors" href="/">Beranda</a></li>
                        <li><a class="text-sm text-text-secondary-light dark:text-text-secondary-dark hover:text-primary transition-colors" href="#">Artikel</a></li>
                        <li><a class="text-sm text-text-secondary-light dark:text-text-secondary-dark hover:text-primary transition-colors" href="#">Penulis</a></li>
                        <li><a class="text-sm text-text-secondary-light dark:text-text-secondary-dark hover:text-primary transition-colors" href="#">Podcast</a></li>
                    </ul>
                </div>
                <div>
                    <h3 class="text-sm font-bold text-text-main-light dark:text-text-main-dark uppercase tracking-wider mb-4">Legal</h3>
                    <ul class="flex flex-col gap-2">
                        <li><a class="text-sm text-text-secondary-light dark:text-text-secondary-dark hover:text-primary transition-colors" href="#">Kebijakan Privasi</a></li>
                        <li><a class="text-sm text-text-secondary-light dark:text-text-secondary-dark hover:text-primary transition-colors" href="#">Syarat &amp; Ketentuan</a></li>
                        <li><a class="text-sm text-text-secondary-light dark:text-text-secondary-dark hover:text-primary transition-colors" href="#">Cookies</a></li>
                    </ul>
                </div>
            </div>
            <div class="border-t border-border-light dark:border-border-dark pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                <p class="text-xs text-text-secondary-light dark:text-text-secondary-dark text-center md:text-left">
                    © {new Date().getFullYear()} Blog Saya. All rights reserved.
                </p>
                <div class="flex items-center gap-1 text-xs text-text-secondary-light dark:text-text-secondary-dark">
                    <span>Dibuat dengan</span>
                    <span class="material-symbols-outlined text-[14px] text-red-500">favorite</span>
                    <span>di Jakarta</span>
                </div>
            </div>
        </div>
    </footer>
</div>