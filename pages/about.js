import React from 'react';
import marked from 'marked';
import gravatar from '../source/js/utils';

const Page = () => (
  <div
    className="Page"
    dangerouslySetInnerHTML={{ __html: marked(`
    <img src="${gravatar('nils@schoenwald.media')}" alt="Nils Schönwald">

    I'm a german frontend-developer based in Hamburg.

    More info will come.

    You can find me on [Twitter](https://twitter.com/schoenwaldnils), [Github](https://github.com/schoenwaldnils) and [CodePen](https://codepen.io/schoenwaldnils)

    ## Things I did build:

    [CSStargate](http://csstargate.schoenwald.media/)

    [Rückenwind Lübeck](http://www.rueckenwind-luebeck.de/)

  `) }} />
);

export default Page;
