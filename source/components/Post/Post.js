import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import stylesheet from './Post.css';

const Post = ({ url, image, title, date, tags, description, content }) => {
  return (
    <article className="Post u-whiteBox">
      <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
      {/* content: url('https://chart.googleapis.com/chart?cht=qr&chs=80x80&chld=L|0&chl={{ site.url }}{{ include.url }}&choe=UTF-8'); */}

      {image && <div className="Post-wrapImage">
        <div className="Post-image" style={{ backgroundImage: `url('${image}')` }} />
      </div>}

      <div className="Post-content u-richText u-boxPadding">
        <div className="Post-meta">
          {date && <time className="Post-date" dateTime="{{ include.date | date: '%F'}}">
            {format(date, 'MMM DD, YYYY')}
          </time>}

          {tags && <div className="Post-tags">
            {tags.map(tag => (
              <span>
                <a className="Post-tag" href={`/tag/${tag}`}>{tag}</a><span className="Post-tagComma">, </span>
              </span>
            ))}
          </div>}
        </div>

        <h1 className="Post-title">{title}</h1>

        {description && <p className="Post-description">
          {description}
          {' '}
          <a className="Post-readMore" href={url}>read more</a>
        </p>}

        {content && <div className="Post-content" dangerouslySetInnerHTML={{ __html: content }} />}

      </div>
    </article>
  );
};

Post.defaultProps = {
  image: null,
  tags: [],
  content: null,
};

Post.propTypes = {
  url: PropTypes.string.isRequired,
  image: PropTypes.string,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  tags: PropTypes.array,
  description: PropTypes.string.isRequired,
  content: PropTypes.string,
};

export default Post;
