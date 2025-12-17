import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    const session = event.cookies.get('sessionid');

    if (!session && !event.url.pathname.startsWith('/login')) {
        throw redirect(303, '/login');
    }

    if (session && event.url.pathname === '/login') {
        throw redirect(303, '/');
    }

    const response = await resolve(event);
    return response;
};
