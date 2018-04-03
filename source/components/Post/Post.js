import React from 'react';
import PropTypes from 'prop-types';
// import { format } from 'date-fns';
import marked from '../../js/utils/marked';

import Picture from '../Picture/Picture';
import './Post.css';

const Post = (props) => {
  const {
    image,
    title,
    // date,
    tags,
    content,
  } = props;

  console.log(tags);

  return (
    <article className="Post" key="post-article">
      {/* content: url('https://chart.googleapis.com/chart?cht=qr&chs=80x80&chld=L|0&chl={{ site.url }}{{ include.url }}&choe=UTF-8'); */}

      {(image || title) &&
        <div className="Post-wrapImage">
          {image && <Picture className="Post-image" imageSrc={image.url} imageAlt={image.alt} color={image.color} />}
          {title &&
            <div className="Post-meta">
              <h1 className="Post-title">{title}</h1>
            </div>
          }
        </div>
      }

      {content &&
        <div className="u-boxPadding u-maxWidth">
          <div className="Post-content u-richText" dangerouslySetInnerHTML={{ __html: marked(content) }} />
        </div>
      }

      {tags &&
        <div className="Post-hr">
          <div className="u-boxPadding u-maxWidth">
            Related tags:
            <div className="Post-tags">
              {tags.map(tag => (
                <a className="Post-tagLink" href={`/tag/${tag}`} key={tag}>
                  <button className="Post-tag">
                    {tag}
                  </button>
                </a>
              ))}
            </div>
          </div>
        </div>
      }
    </article>
  );
};

Post.defaultProps = {
  image: null,
  // date: null,
  tags: null,
  content: null,
};

Post.propTypes = {
  image: PropTypes.object,
  title: PropTypes.string.isRequired,
  // date: PropTypes.string,
  tags: PropTypes.array,
  content: PropTypes.string,
};

export default Post;
