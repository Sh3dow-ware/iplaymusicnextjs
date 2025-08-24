export function adjustColor(hex: string, percent: number): string {
  hex = hex.replace(/^#/, '');

  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);

  r = Math.min(255, Math.max(0, r + percent));
  g = Math.min(255, Math.max(0, g + percent));
  b = Math.min(255, Math.max(0, b + percent));

  return `#${(r.toString(16).padStart(2, '0'))}${(g.toString(16).padStart(2, '0'))}${(b.toString(16).padStart(2, '0'))}`;
}
