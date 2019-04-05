import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'debounce-promise';
import './Post.css';
// import { updateField } from '../../../scripts/contentful-management';

const updateField = () => {};

const debouncedUpdateField = debounce(updateField, 500);

const handleChangeField = async ({
  id, field, originalValue, content,
}) => {
  const newValue = content;
  if (originalValue !== newValue) {
    const res = await debouncedUpdateField(id, field, newValue);
    // TODO: show saved change indictor.
    return res;
  }
};

const PostEdit = ({
  id,
  title,
  content,
  changeContent,
}) => {
  const handleContentChange = (event) => {
    handleChangeField({
      id,
      field: 'content',
      originalValue: content,
      content: event.target.value,
    });
    changeContent(event.target.value);
  };
  return (
    <article className="Post Post--editor u-whiteBox">
      <div className="Post-content u-richText u-boxPadding">
        <h1
          className="Post-title"
          onInput={event => handleChangeField({
            id,
            field: 'title',
            originalValue: title,
            content: event.target.innerText,
          })}
          data-origvalue={title}
          contentEditable
          dangerouslySetInnerHTML={{ __html: title }}
          key="post-title" />

        { content && (
          <textarea
            className="Post-textarea"
            defaultValue={content}
            onChange={event => handleContentChange(event)} />
        ) }

      </div>
    </article>
  );
};

PostEdit.defaultProps = {
  id: null,
};

PostEdit.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  changeContent: PropTypes.func.isRequired,
};

export default PostEdit;
