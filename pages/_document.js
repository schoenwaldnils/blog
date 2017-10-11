import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import stylesheet from '../source/css/index.css';
import Header from '../source/components/Header/Header';
import Content from '../source/components/Content/Content';
import Footer from '../source/components/Footer/Footer';

export default class SmediaDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />));
    const styleTags = sheet.getStyleElement();
    return { ...page, styleTags };
  }

  render() {
    return (
      <html lang="en">
        <Head>
          <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
          <meta content="width=device-width,initial-scale=1" name="viewport" />
          <title>Schoenwald.media</title>
          <meta name="description" content="Thoughts on CSS, JS, and overall clean code." />
          <meta name="theme-color" content="#ba3e48" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Rokkitt" />
          <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
          {this.props.styleTags}
        </Head>
        <body>
          <Header />
          <Content content={<Main />} />
          <Footer />
          <NextScript />
        </body>
      </html>
    );
  }
}
