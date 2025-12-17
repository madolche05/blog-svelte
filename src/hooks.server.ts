import { createServerClient } from '@supabase/ssr'
import { type Handle, redirect } from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks'
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public'

const supabase: Handle = async ({ event, resolve }) => {
  event.locals.supabase = createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
    cookies: {
      getAll: () => event.cookies.getAll(),
      setAll: (cookiesToSet) => {
        cookiesToSet.forEach(({ name, value, options }) => {
          event.cookies.set(name, value, { ...options, path: '/' })
        })
      },
    },
  })

  event.locals.safeGetSession = async () => {
    const {
      data: { session },
    } = await event.locals.supabase.auth.getSession()
    if (!session) {
      return { session: null, user: null }
    }

    const {
      data: { user },
      error,
    } = await event.locals.supabase.auth.getUser()
    if (error) {
      return { session: null, user: null }
    }

    // Check if profile exists, if not, create one
    const { data: profile, error: profileError } = await event.locals.supabase
        .from('profiles')
        .select('id')
        .eq('id', user.id)
        .single();

    if (profileError && profileError.code === 'PGRST116') { // No rows found
        // Create a basic profile for the new user
        const { error: insertError } = await event.locals.supabase
            .from('profiles')
            .insert({ id: user.id, full_name: user.email, username: user.email?.split('@')[0] }); // Basic default values

        if (insertError) {
            console.error('Error creating profile for user:', insertError);
            // Decide how to handle this error:
            // 1. Log and continue (user might still function but without a proper profile)
            // 2. Redirect to an error page or prevent further access (more strict)
            // For now, we'll just log the error.
        }
    } else if (profileError) {
        console.error('Error fetching profile:', profileError);
    }

    return { session, user }
  }

  return resolve(event, {
    filterSerializedResponseHeaders(name) {
      return name === 'content-range' || name === 'x-supabase-api-version'
    },
  })
}

const authGuard: Handle = async ({ event, resolve }) => {
  const { session, user } = await event.locals.safeGetSession()
  event.locals.session = session
  event.locals.user = user

  const protectedRoutes = ['/admin'];
  const isProtectedRoute = protectedRoutes.some(path => event.url.pathname.startsWith(path));

  if (!event.locals.session && isProtectedRoute) {
    throw redirect(303, '/login')
  }

  if (event.locals.session && event.url.pathname === '/login') {
    throw redirect(303, '/admin')
  }

  return resolve(event)
}

export const handle = sequence(supabase, authGuard)