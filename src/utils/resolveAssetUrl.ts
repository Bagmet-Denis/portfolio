const urlByGlobKey = import.meta.glob<string>(
  [
    '../assets/**/*.{png,jpg,jpeg,webp,gif,svg,PNG,JPG,JPEG,WEBP,GIF,SVG}',
    '!../assets/me.png',
  ],
  {
    eager: true,
    query: '?url',
    import: 'default',
  },
) as Record<string, string>

/**
 * Resolves paths from data files like `src/assets/foo/bar.png` to Vite URLs.
 * If the file was moved under `src/assets/projects/`, tries that path when the legacy path is missing.
 */
export function resolveAssetUrl(path: string): string {
  if (!path) return ''
  const clean = path.replace(/^src\//, '')
  const key = `../${clean}`
  const direct = urlByGlobKey[key]
  if (direct) return direct

  if (clean.startsWith('assets/') && !clean.startsWith('assets/projects/')) {
    const afterAssets = clean.slice('assets/'.length)
    const projectsKey = `../assets/projects/${afterAssets}`
    return urlByGlobKey[projectsKey] ?? ''
  }

  return ''
}

export function resolveAssetUrls(paths: string[]): string[] {
  return [...new Set(paths.map(resolveAssetUrl).filter(Boolean))]
}
