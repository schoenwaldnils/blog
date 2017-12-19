import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import stylesheet from '../source/css/index.css';
import Header from '../source/components/Header/Header';
import Content from '../source/components/Content/Content';
import Footer from '../source/components/Footer/Footer';

const DRIFT_ID = '4r7cns5dxyfi';

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
          <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
          {this.props.styleTags}
        </Head>
        <body>
          <Header />
          <Content>
            <Main />
          </Content>
          <Footer />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans|Karla" />
          <NextScript />

          {/* Google Analytics codeblock */}
          {prod && <script dangerouslySetInnerHTML={{
            __html: `
            (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
          })(window,document,'script','/static/scripts/analytics.js','ga');

            ga('create', 'UA-33721620-2', 'auto');
            ga('send', 'pageview');`,
          }} />}

          {false && <script src={`https://js.driftt.com/include/${Math.ceil(new Date() / 3e5)}/${DRIFT_ID}.js`} type="text/javascript" async="" />}
        </body>
      </html>
    );
  }
}
