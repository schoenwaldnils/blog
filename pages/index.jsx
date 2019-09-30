import React from 'react'
import PropTypes from 'prop-types'

import '../source/css/index.css'

import Meta from '../source/components/Meta/Meta'
import {
  TeaserList,
  TeaserListChild,
} from '../source/components/TeaserList/TeaserList'
import Post from '../source/components/Post/Post'
import Layout from '../source/components/Layout/Layout'

const Page = ({ posts, tags, activeTag }) => {
  return (
    <>
      <Meta
        url={activeTag ? `https://schoenwald.media/${activeTag}/` : undefined}
      />
      <Layout type="postList" {...{ tags, activeTag }}>
        <TeaserList>
          {posts.map(post => (
            <TeaserListChild href={post.url} key={post.slug}>
              <Post {...post} type="list" />
            </TeaserListChild>
          ))}
        </TeaserList>
      </Layout>
    </>
  )
}

Page.getInitialProps = async ({ query: { posts, tag, tags } }) => {
  return {
    posts,
    activeTag: tag || undefined,
    tags: tags || undefined,
  }
}

Page.defaultProps = {
  activeTag: undefined,
  tags: undefined,
}

Page.propTypes = {
  posts: PropTypes.array.isRequired,
  activeTag: PropTypes.string,
  tags: PropTypes.array,
}

export default Page
