import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { format } from 'date-fns';
import stylesheet from './Post.css';

const Post = ({
  url, image, title, date, tags, description, content,
}) => {
  return (
    <article className="Post u-whiteBox">
      <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
      {/* content: url('https://chart.googleapis.com/chart?cht=qr&chs=80x80&chld=L|0&chl={{ site.url }}{{ include.url }}&choe=UTF-8'); */}

      {image &&
        <div className="Post-wrapImage">
          <div className="Post-image" style={{ backgroundImage: `url('${image}')` }} />
        </div>}

      <div className="Post-content u-richText u-boxPadding">
        <div className="Post-meta">
          {date &&
            <time className="Post-date" dateTime="{{ include.date | date: '%F'}}">
              {format(date, 'MMM DD, YYYY')}
            </time>}

          {tags &&
            <div className="Post-tags">
              {tags.map(tag => [
                <Link href={`/tag/${tag}`} key={tag} prefetch>
                  <a className="Post-tag">{tag}</a>
                </Link>,
                <span className="Post-tagComma" key={`${tag}-comma`}>, </span>,
              ])}
            </div>}
        </div>

        {url ?
          <Link href={url}>
            <a><h1 className="Post-title">{title}</h1></a>
          </Link> :
          <h1 className="Post-title">{title}</h1>
        }

        {description &&
          <p className="Post-description">
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
  url: null,
  image: null,
  date: null,
  tags: [],
  description: null,
  content: null,
};

Post.propTypes = {
  url: PropTypes.string,
  image: PropTypes.string,
  title: PropTypes.string.isRequired,
  date: PropTypes.string,
  tags: PropTypes.array,
  description: PropTypes.string,
  content: PropTypes.string,
};

export default Post;
