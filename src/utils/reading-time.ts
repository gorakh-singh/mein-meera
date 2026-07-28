/**
 * Calculate reading time for a post body.
 * Assumes ~230 words per minute (average reading speed).
 */
export function getReadingTime(text: string): string {
  const wordsPerMinute = 230;
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}
