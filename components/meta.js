import Head from 'next/head'
// サイトに関する情報
import { siteMeta } from 'lib/constants'
const {
  siteTitle,
  siteDesc,
  siteUrl,
  siteLocale,
  siteType,
  siteIcon
} = siteMeta

const Meta = ({ pageTitle }) => {
  // ページのタイトル
  const title = pageTitle ? `${pageTitle} | ${siteTitle}` : siteTitle
  return (
    <Head>
      <title>{title}</title>
      <meta property='pg:title' content={title} />
    </Head>
  )
}

export default Meta
