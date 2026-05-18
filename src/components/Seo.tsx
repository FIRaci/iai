import { Helmet } from "react-helmet-async"

interface SeoProps {
  title: string
  description: string
  path?: string
  type?: "article" | "website"
  image?: string
}

const SITE = "https://iai-flax-sigma.vercel.app"
const DEFAULT_IMAGE = "/icons.svg"

export function Seo({ title, description, path = "", type = "website", image = DEFAULT_IMAGE }: SeoProps) {
  const url = `${SITE}${path}`
  const fullTitle = `${title} | IAI`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={`${SITE}${image}`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${SITE}${image}`} />
      <link rel="canonical" href={url} />
    </Helmet>
  )
}
