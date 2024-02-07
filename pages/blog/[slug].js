import { getPostBySlug } from 'lib/api'
import extractText from 'lib/extract-text'
import Meta from 'components/meta'
import Container from 'components/container'
import PostHeader from 'components/post-header'
import PostBody from 'components/post-body'
import ConvertBody from 'components/convert-body'
import PostCategories from 'components/post-categories'
import {
  TwoColumn,
  TwoColumnMain,
  TwoColumnSidebar
} from 'components/two-column'
import Image from 'next/image'
import { getPlaiceholder } from 'plaiceholder'
// ローカルの代替アイキャッチ画像
import { eyecatchLocal } from 'lib/constants'

const Post = ({
  title,
  publish,
  content,
  eyecatch,
  categories,
  description
}) => {
  return (
    <Container>
      <Meta
        pageTitle={title}
        pageDesc={description}
        pageImg={eyecatch.url}
        pageImgW={eyecatch.width}
        pageImgH={eyecatch.height}
      />
      <article>
        <PostHeader title={title} subtitle='Blog Article' publish={publish} />
        <figure>
          <Image
            src={eyecatch.url}
            alt=''
            layout='responsive'
            width={eyecatch.width}
            height={eyecatch.height}
            sizes='(min-width: 1152px) 1152px, 100vw'
            priority
            placeholder='blur'
            blurDataURL={eyecatch.blurDataURL}
          />
        </figure>
        <TwoColumn>
          <TwoColumnMain>
            <PostBody>
              <ConvertBody contentHTML={content} />
            </PostBody>
          </TwoColumnMain>
          <TwoColumnSidebar>
            <PostCategories categories={categories} />
          </TwoColumnSidebar>
        </TwoColumn>
      </article>
    </Container>
  )
}

const getStaticPaths = async () => {
  return {
    paths: ['/blog/schedule', '/blog/music', '/blog/micro'],
    fallback: false
  }
}

const getStaticProps = async ({ params }) => {
  const { slug } = params
  const post = await getPostBySlug(slug)
  if (!post) {
    return {
      notFound: true
    }
  }
  const description = extractText(post.content)
  const eyecatch = post.eyecatch ?? eyecatchLocal
  const { base64 } = await getPlaiceholder(eyecatch.url)
  console.log('Base64 Blur Data:', base64)
  eyecatch.blurDataURL = base64
  return {
    props: {
      title: post.title,
      publish: post.publishDate,
      content: post.content,
      eyecatch: eyecatch,
      categories: post.categories,
      description: description
    }
  }
}
export default Post
export { getStaticProps, getStaticPaths }
