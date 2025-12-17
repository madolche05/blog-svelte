<script lang="ts">
    // Navbar component
</script>

<div class="navbar bg-base-100 shadow-sm border-b border-base-200 sticky top-0 z-10">
    <div class="flex-none lg:hidden">
      <label for="my-drawer-2" aria-label="open sidebar" class="btn btn-square btn-ghost">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-6 h-6 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
      </label>
    </div>
    <div class="flex-1">
      <span class="text-xl font-semibold px-4">Admin Dashboard</span>
    </div>
    <div class="flex-none">
        <button class="btn btn-ghost btn-circle" aria-label="Notifications">
            <div class="indicator">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
              <span class="badge badge-xs badge-primary indicator-item"></span>
            </div>
        </button>
        <div class="dropdown dropdown-end">
            <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
                <div class="w-10 rounded-full">
                <img alt="User" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
            </div>
            <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li><a href="#">Profile</a></li>
                <li><a href="#">Settings</a></li>
                <li>
                    <form action="/logout" method="POST" class="w-full p-0">
                        <button type="submit" class="w-full text-left px-4 py-2 hover:bg-base-200">Logout</button>
                    </form>
                </li>
            </ul>
        </div>
    </div>
  </div>