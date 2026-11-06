/**
 * Returns the URL only if it is an absolute http(s) link, else null.
 *
 * Member links come from data/members.json, which KTP Manager's profile sync fills from what
 * members submit. React 18 still renders `javascript:` URLs in href, so a link from data is
 * checked before it becomes clickable.
 */
export function safeHttpUrl(value: string | undefined | null): string | null {
  if (!value) return null
  let candidate = value.trim()
  // Members sometimes paste "linkedin.com/in/name" without a scheme; treat a bare host/path as https.
  if (!/^[a-z][a-z0-9+.-]*:/i.test(candidate) && /^[\w-]+(\.[\w-]+)+(\/|$)/.test(candidate)) {
    candidate = `https://${candidate}`
  }
  try {
    const url = new URL(candidate)
    return url.protocol === 'https:' || url.protocol === 'http:' ? url.href : null
  } catch {
    return null
  }
}
