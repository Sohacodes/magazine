import {
  Box,
  Container,
  Card,
  Grid,
  Link,
  Heading,
  Image,
  Text
} from 'theme-ui'
import matter from 'gray-matter'
var GithubSlugger = require('github-slugger')
const fs = require('fs')
var dateFormat = require('dateformat')

export default function Home(props) {
  return (
    <>
      <Box
        sx={{
          textAlign: 'left',
          background: '#B4436C',
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='32' height='64' viewBox='0 0 32 64' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 28h20V16h-4v8H4V4h28v28h-4V8H8v12h4v-8h12v20H0v-4zm12 8h20v4H16v24H0v-4h12V36zm16 12h-4v12h8v4H20V44h12v12h-4v-8zM0 36h8v20H0v-4h4V40H0v-4z' fill='%23d44c7d' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E\")",
          marginTop: '0',
          padding: '50px',
          color: 'white'
        }}
      >
        <Container>
          <Heading as="h1" sx={{ fontSize: '5em' }}>
            Interstellar
          </Heading>
          <Heading as="h3" sx={{ marginTop: '10px' }}>
            Exploring the global issues that impact you.
          </Heading>
        </Container>
      </Box>
      <Container sx={{ marginTop: '20px', marginBottom: '20px' }}>
        <Grid columns={[null, null, 2, 3]} gap={3}>
          {props.posts.map(post => (
            <Link href={`/posts/${post.slug}`} sx={{ textDecoration: 'none' }}>
              <Card variant="interactiveALT">
                <Image
                  src={post.image}
                  sx={{ width: '100%', height: '200px', objectFit: 'cover' }}
                />
                <Text sx={{ paddingLeft: '20px' }}>
                  <Heading sx={{ marginTop: '10px', marginBottom: '12px' }}>
                    {post.title}
                  </Heading>
                  by {post.author} | {dateFormat(post.date, 'mediumDate')}
                </Text>
              </Card>
            </Link>
          ))}
        </Grid>
      </Container>
    </>
  )
}

export async function getStaticProps() {
  var slugger = new GithubSlugger()
  const context = require.context('../posts', false, /\.md$/)
  const posts = []
  console.log(context.keys())
  for (const key of context.keys()) {
    const post = key.slice(2)
    const file = fs.readFileSync(`./posts/${post}`, 'utf8')
    const content = matter(file)
    posts.push({
      title: content.data.title,
      slug: slugger.slug(content.data.title),
      author: content.data.author,
      image: content.data.image ? content.data.image : null,
      date: content.data.date
    })
  }
  console.log(posts)
  return { props: { posts } }
}
