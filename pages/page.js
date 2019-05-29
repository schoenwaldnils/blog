import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';

import '../source/css/index.css';

import Meta from '../source/components/Meta/Meta';
import Layout from '../source/components/Layout/Layout';
import Post from '../source/components/Post/Post';
// import Button from '../source/components/Button/Button';
import Disqus from '../source/components/Disqus/Disqus';

class Page extends PureComponent {
  constructor(props) {
    super(props);

    if (props.id) {
      this.fields = require(`../source/contentfulPages/${props.id}.json`); // eslint-disable-line
    }
  }

  render() {
    const { type, fields } = this.fields;

    console.log(this.fields);

    return (
      <Fragment>
        {/* <a className="page-edit" href={`/edit?type=${type}&id=${fields.id}`}>
          <Button>Edit</Button>
        </a> */}
        <Meta
          url={`https://schoenwald.media/${fields.slug}/`}
          type="article"
          title={fields.title}
          description={fields.description}
          image={fields.image ? fields.image.url : undefined} />
        <Layout type={type}>
          <Post {...fields} />
          {type === 'post' && <Disqus title={fields.title} pageUrl={fields.slug} />}
        </Layout>
      </Fragment>
    );
  }
}

Page.getInitialProps = ({ query }) => query;

Page.propTypes = {
  type: PropTypes.string.isRequired,
  fields: PropTypes.object.isRequired,
};

export default Page;
