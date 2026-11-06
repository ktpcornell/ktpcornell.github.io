/**
 * Site-wide settings.
 *
 * SIGN_IN_URL: where the navbar's "Member Sign In" button goes (KTP Manager's sign-in page).
 * Empty hides the button.
 *
 * For now it's KTP Manager's current production address on Vercel (2026-11-06). Once
 * manager.ktpcornell.com is set up (a Vercel domain + a GoDaddy CNAME + the Google OAuth
 * redirect URI), change this to https://manager.ktpcornell.com/signin.
 */
export const SIGN_IN_URL = 'https://ktp-manager.vercel.app/signin'
