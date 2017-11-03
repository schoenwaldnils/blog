import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import debounce from 'debounce-promise';
import stylesheet from './Post.css';
import Picture from '../Picture/Picture';
import { updateField, publishField } from '../../../scripts/contentful-management';

const debouncedUpdateField = debounce(updateField, 500);

const handleChangeField = async ({ id, originalValue, event }) => {
  const newValue = event.target.textContent;
  if (originalValue !== newValue) {
    const res = await debouncedUpdateField(id, 'title', newValue);
    // TODO: show saved change indictor.
    return res;
  }
};

const handleClickSubmit = async (id) => {
  const res = await publishField(id);
  // TODO: show published indictor.
  return res;
};

const Post = ({
  id, url, image, title, date, tags, description, content,
}) => [
  <style dangerouslySetInnerHTML={{ __html: stylesheet }} key="post-style" />,
  <article className="Post u-whiteBox" key="post-article">
    {/* content: url('https://chart.googleapis.com/chart?cht=qr&chs=80x80&chld=L|0&chl={{ site.url }}{{ include.url }}&choe=UTF-8'); */}

    {image &&
      <div className="Post-wrapImage">
        <Picture className="Post-image" imageSrc={image.url} imageAlt={image.alt} />
      </div>}

    <div className="Post-content u-richText u-boxPadding">
      <div className="Post-meta">
        {date &&
          <time className="Post-date">
            {format(date, 'MMM DD, YYYY')}
          </time>}

        {tags &&
          <div className="Post-tags">
            {tags.map(tag => [
              <a className="Post-tag" href={`/tag/${tag}`} key={tag}>{tag}</a>,
              <span className="Post-tagComma" key={`${tag}-comma`}>, </span>,
            ])}
          </div>}
      </div>

      {url ?
        <a href={url}><h1 className="Post-title">{title}</h1></a> :
        <h1 className="Post-title">{title}</h1>
      }

      {description &&
        <p className="Post-description">
          {description}
          {' '}
          <a className="Post-readMore" href={url}>read the full article</a>
        </p>}

      {content && <div className="Post-content" dangerouslySetInnerHTML={{ __html: content }} />}

    </div>
  </article>,
];

Post.defaultProps = {
  id: null,
  url: null,
  image: null,
  date: null,
  tags: [],
  description: null,
  content: null,
};

Post.propTypes = {
  id: PropTypes.string,
  url: PropTypes.string,
  image: PropTypes.object,
  title: PropTypes.string.isRequired,
  date: PropTypes.string,
  tags: PropTypes.array,
  description: PropTypes.string,
  content: PropTypes.string,
};

export default Post;
