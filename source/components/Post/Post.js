import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
// import { format } from 'date-fns';
import marked from '../../js/utils/marked';

import Picture from '../Picture/Picture';
import './Post.css';

const Post = (props) => {
  const {
    type,
    image,
    title,
    // date,
    tags,
    content,
  } = props;

  const classNames = cn(
    'Post',
    {[`Post--${type}`]: type},
  );

  // const qr = `https://chart.googleapis.com/chart?cht=qr&chs=80x80&chld=L|0&chl=${url}&choe=UTF-8`;

  return (
    <article className={classNames}>
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
  type: undefined,
  image: undefined,
  // date: undefined,
  tags: undefined,
  content: undefined,
};

Post.propTypes = {
  type: PropTypes.string,
  image: PropTypes.object,
  title: PropTypes.string.isRequired,
  // date: PropTypes.string,
  tags: PropTypes.array,
  content: PropTypes.string,
};

export default Post;
