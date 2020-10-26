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
import { orderBy, filter } from 'lodash'

const Issue = ({ number }) => (
  <a href="https://hackclub.com/slack/" className="badge">
    Issue {number}
    <style jsx>{`
      a {
        background-color: #b4436c;
        color: white;
        padding: 3px 12px 3px;
        text-decoration: none;
        text-transform: uppercase;
        transition: 0.125s background-color ease-in-out;
        display: inline-flex;
        align-items: center;
        font-weight: bold;
        border-radius: 999px;
        text-align: center;
        white-space: nowrap;
        font-size: 13px;
        position: absolute;
        margin-left: 15px;
        margin-top: 10px;
      }
      a:hover,
      a:focus {
        background-color: var(--colors-purple);
      }
    `}</style>
  </a>
)

export default function Home(props) {
  return (
    <>
      <Box
        sx={{
          textAlign: 'left',
          background: '#B4436C',
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='32' height='64' viewBox='0 0 32 64' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 28h20V16h-4v8H4V4h28v28h-4V8H8v12h4v-8h12v20H0v-4zm12 8h20v4H16v24H0v-4h12V36zm16 12h-4v12h8v4H20V44h12v12h-4v-8zM0 36h8v20H0v-4h4V40H0v-4z' fill='%23d44c7d' fill-opacity='0.3' fill-rule='evenodd'/%3E%3C/svg%3E\"), linear-gradient(90deg, rgba(180,67,108,1) 0%, rgba(180,67,108,1) 47%, rgba(180,67,108,0.11388305322128855) 100%), url(\"data:image/svg+xml,%3Csvg width='32' height='64' viewBox='0 0 32 64' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 28h20V16h-4v8H4V4h28v28h-4V8H8v12h4v-8h12v20H0v-4zm12 8h20v4H16v24H0v-4h12V36zm16 12h-4v12h8v4H20V44h12v12h-4v-8zM0 36h8v20H0v-4h4V40H0v-4z' fill='%23d44c7d' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E\")",
          marginTop: '0',
          padding: '50px',
          color: 'white'
        }}
      >
        <Container>
          <Heading as="h1" sx={{ fontSize: '5em' }}>
            da name
          </Heading>
          <Heading as="h3" sx={{ marginTop: '10px' }}>
            i ate food, and i couldn't think of a slogan
          </Heading>
        </Container>
      </Box>
      <Container sx={{ marginTop: '30px', marginBottom: '20px' }}>
        <Grid columns={[null, null, 2, 3]} gap={4}>
          {props.posts.map(post => (
            <Link href={`/posts/${post.slug}`} sx={{ textDecoration: 'none' }}>
              <Card
                variant="interactiveALT"
                sx={{
                  display: 'flex',
                  lineHeight: 0,
                  height: '250px',
                  flexDirection: 'column',
                  width: '100%',
                  backgroundImage: `url(${post.image})`,
                  backgroundSize: 'cover',
                  position: 'relative'
                }}
              >
                <Box
                  sx={{
                    lineHeight: 'body',
                    width: '100%'
                  }}
                >
                  <Issue number={post.issue} />
                  <Text
                    sx={{
                      paddingLeft: '20px',
                      paddingRight: '20px',
                      position: 'absolute',
                      bottom: '0px',
                      width: '100%',
                      background: '#B4436C',
                      color: 'white'
                    }}
                  >
                    <Heading
                      as="h2"
                      sx={{
                        marginTop: '10px',
                        marginBottom: '12px',
                        maxWidth: '100%'
                      }}
                    >
                      {post.title}{' '}
                      <span style={{ fontSize: '16px', fontWeight: '400' }}>
                        by {post.author}
                      </span>
                    </Heading>
                  </Text>
                </Box>
              </Card>
            </Link>
          ))}
        </Grid>
      </Container>
      <Container sx={{ marginTop: '30px', marginBottom: '60px' }}>
        <hr />
        <Text sx={{ paddingTop: '16px' }}>NAME </Text>
      </Container>
    </>
  )
}

export async function getStaticProps() {
  var slugger = new GithubSlugger()
  const context = require.context('../posts', false, /\.md$/)
  var posts = []
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
      date: content.data.date,
      issue: content.data.issue
    })
  }
  posts = orderBy(posts, 'title')
  posts = orderBy(posts, 'issue', 'desc')
  console.log(posts)
  return { props: { posts } }
}
