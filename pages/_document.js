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
    const prod = process.env.NODE_ENV === 'production';
    return (
      <html lang="en">
        <Head>
          <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
          <meta content="width=device-width,initial-scale=1" name="viewport" />
          <title>Schönwald</title>
          <meta name="description" content="Thoughts on CSS, JS, and overall clean code." />
          <meta name="theme-color" content="#ba3e48" />
          <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
          {this.props.styleTags}
          {prod && <script dangerouslySetInnerHTML={{
            __html: `
            (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
            })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

            ga('create', 'UA-33721620-2', 'auto');
            ga('send', 'pageview');`,
          }} />}
        </Head>
        <body>
          <Header />
          <Content content={<Main />} />
          <Footer />
          <NextScript />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans|Karla" />
        </body>
      </html>
    );
  }
}
