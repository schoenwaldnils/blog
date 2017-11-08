import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { getFields } from '../scripts/contentful-preview';
import Post from '../source/components/Post/Post';
import PostEdit from '../source/components/Post/PostEdit';
import { publishEntry } from '../scripts/contentful-management';

const handleClickSubmit = async (id) => {
  const res = await publishEntry(id);
  // TODO: show published indictor.
  return res;
};


class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 0,
      content: props.fields.content,
    };
  }

  render() {
    const { fields } = this.props;
    delete fields.description;

    const fieldsEdit = fields;
    delete fieldsEdit.image;

    fieldsEdit.content = this.state.content;

    console.log(this.state.content);

    return [
      <Tabs
        className="Post-editTabs"
        selectedTabClassName="is-active"
        selectedTabPanelClassName="is-active"
        disabledTabClassName="is-disabled"
        selectedIndex={this.state.tabIndex}
        onSelect={tabIndex => this.setState({ tabIndex })}>
        <div className="Post-editHeader">
          <TabList className="Post-editTabList">
            <Tab className="Post-editTab">Editor</Tab>
            <Tab className="Post-editTab">Preview</Tab>
          </TabList>
          <button
            className="Post-save"
            onClick={() => handleClickSubmit(fields.id)}
            key="page-save">
            Save
          </button>
        </div>

        <TabPanel
          className="Post-editTabPanel"
          selectedClassName="is-active">
          <PostEdit
            {...fieldsEdit}
            changeContent={content => this.setState({ content })} />
        </TabPanel>
        <TabPanel
          className="Post-editTabPanel"
          selectedClassName="is-active">
          <Post
            {...fields} />
        </TabPanel>
      </Tabs>,
    ];
  }
}

Page.getInitialProps = async ({ query }) => {
  const fields = await getFields(query.id);
  return {
    type: query.type,
    fields: {
      id: query.id,
      title: fields.title,
      slug: fields.slug,
      image: fields.image ? {
        url: fields.image.fields.file.url,
        alt: fields.image.fields.title,
      } : null,
      description: fields.description,
      date: fields.date || null,
      tags: fields.tags || null,
      content: fields.content,
    },
  };
};

Page.propTypes = {
  type: PropTypes.string.isRequired,
  fields: PropTypes.object.isRequired,
};

export default Page;
