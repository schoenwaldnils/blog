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
    { [`Post--${type}`]: type },
  );

  // const qr = `https://chart.googleapis.com/chart?cht=qr&chs=80x80&chld=L|0&chl=${url}&choe=UTF-8`;

  return (
    <article className={classNames}>
      {image &&
        <div className="Post-wrapImage">
          <Picture className="Post-image" imageSrc={image.url} imageAlt={image.alt} color={image.color} />
          {title &&
            <div className="Post-meta">
              <h1 className="Post-title Post-title--inImage u-boxPadding u-maxWidth">{title}</h1>
            </div>
          }
        </div>
      }

      {content && type !== 'list' &&
        <div className="Post-content u-boxPadding u-maxWidth">
          {!image && <h1 className="Post-title Post-title--inContent">{title}</h1>}
          <div className="u-richText" dangerouslySetInnerHTML={{ __html: marked(content) }} />
        </div>
      }

      {tags && type !== 'list' &&
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
