import { SectionPage } from 'app/components/section-page'

// where the fiction tab goes, and the url that arrives at the list rather than
// at the intro. the root shows the same section as the front page, so canonical
// points there and the two don't compete as separate pages in search.
export const metadata = {
  title: 'fiction',
  alternates: { canonical: '/' },
}

export default function Page() {
  return <SectionPage current="fiction" />
}
