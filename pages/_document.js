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
          <meta charSet="utf-8" />
          <link rel="manifest" href="/static/site.webmanifest" />
          <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
          {this.props.styleTags}
        </Head>
        <body>
          <Header />
          <Content>
            <Main />
          </Content>
          <Footer />
          <NextScript />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans|Karla" />

          {/* Google Analytics codeblock */}
          {prod && <script dangerouslySetInnerHTML={{
            __html: `
            (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
            })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

            ga('create', 'UA-33721620-2', 'auto');
            ga('send', 'pageview');`,
          }} />}

          {/* Drift codeblock */}
          {true && <script dangerouslySetInnerHTML={{
            __html: `
            !function() {
              var t;
              if (t = window.driftt = window.drift = window.driftt || [], !t.init) return t.invoked ? void (window.console && console.error && console.error("Drift snippet included twice.")) : (t.invoked = !0,
              t.methods = [ "identify", "config", "track", "reset", "debug", "show", "ping", "page", "hide", "off", "on" ],
              t.factory = function(e) {
                return function() {
                  var n;
                  return n = Array.prototype.slice.call(arguments), n.unshift(e), t.push(n), t;
                };
              }, t.methods.forEach(function(e) {
                t[e] = t.factory(e);
              }), t.load = function(t) {
                var e, n, o, i;
                e = 3e5, i = Math.ceil(new Date() / e) * e, o = document.createElement("script"),
                o.type = "text/javascript", o.async = !0, o.crossorigin = "anonymous", o.src = "https://js.driftt.com/include/" + i + "/" + t + ".js",
                n = document.getElementsByTagName("script")[0], n.parentNode.insertBefore(o, n);
              });
            }();
            drift.SNIPPET_VERSION = '0.3.1';
            drift.load('4r7cns5dxyfi');`,
          }} />}
        </body>
      </html>
    );
  }
}
