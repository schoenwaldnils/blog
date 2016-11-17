---
layout: post
title: "Kerning coused by ::first-letter"
tags:
  - css
  - font
  - kerning
---

`::first-letter` causes kerning

```css
h1,
h2,
h3,
h4 {
  font-family: var(--font-sanchez);
  font-style: normal;
  font-weight: 400;
  line-height: 1.1;
  color: var(--text-color);

  &::first-letter {
    letter-spacing: -.06em;
    color: var(--color-brand);
  }
}
```
