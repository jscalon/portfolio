/**
 * The social card shared by every page without a cover of its own.
 *
 * The `?v=` is a cache key, not decoration. LinkedIn keys its processed copy of a preview
 * image to the image URL, not to the page: once it has stored a 160 px thumbnail for a URL
 * it keeps serving that blurry copy, whatever the page later declares and however many times
 * the Post Inspector re-scrapes it. Bumping the version gives LinkedIn a URL it has never
 * seen, which forces a fresh fetch. Bump it again whenever `pnpm og` regenerates the card.
 */
export const SOCIAL_CARD_PATH = "/og-image.png?v=2";
