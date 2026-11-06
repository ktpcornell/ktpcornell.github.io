/**
 * Returns the URL only if it is an absolute http(s) link, else null.
 *
 * Member links come from data/members.json, which KTP Manager's profile sync fills from what
 * members submit. React 18 still renders `javascript:` URLs in href, so a link from data is
 * checked before it becomes clickable.
 */
export function safeHttpUrl(value: string | undefined | null): string | null {
  if (!value) return null
  try {
    const url = new URL(value.trim())
    return url.protocol === 'https:' || url.protocol === 'http:' ? url.href : null
  } catch {
    return null
  }
}
