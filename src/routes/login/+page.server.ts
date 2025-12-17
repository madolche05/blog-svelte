import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
    const session = cookies.get('sessionid');
    if (session) {
        throw redirect(303, '/');
    }
};

export const actions: Actions = {
    default: async ({ request, cookies }) => {
        const data = await request.formData();
        const email = data.get('email');
        const password = data.get('password');

        if (!email || !password) {
            return fail(400, { email, missing: true, error: 'Email dan password harus diisi.' });
        }

        // Mock authentication
        if (email === 'admin@example.com' && password === 'password') {
            cookies.set('sessionid', 'mock-session-token', {
                path: '/',
                httpOnly: true,
                sameSite: 'strict',
                secure: import.meta.env.PROD,
                maxAge: 60 * 60 * 24 // 1 hari
            });
            throw redirect(303, '/');
        }

        return fail(400, { email, incorrect: true, error: 'Email atau password salah.' });
    }
};
