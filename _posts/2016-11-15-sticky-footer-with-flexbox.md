---
layout: post
title: Sticky footer with flexbox
description: With flexbox there is now a simple way to let your footer stick to the bottom.
date: 2016-11-15 01:15:00 +0200
tags:
  - css
  - flexbox
  - footer
has_codepen: true
---

With flexbox there is now a simple way to let your footer stick to the bottom, when there is not enough content, and make it static when there is.

At first we need the DOM. One wrapper, in this case the body-element itself, and at least 2 child-elements. I'm also including the header here, because it is often used in this kind of arrangement.

```html
<body>
  <div class='Header'></div>
  <div class='Content'></div>
  <div class='Footer'></div>
</body>
```

And now give the `body` `display: flex` and `flex-direction: column` to stack the three child elements vertically.
Also the `html` and `body` elements need to be at least `100vh` in height.

```css
html,
body {
  min-height: 100vh;
}

body {
  display: flex;
  flex-direction: column;
}
```

The trick now is to give the `.Content`-element the `flex-grow: 1` so the the footer gets pushed to the bottom.
You also can add `flex-shrink: 0` to the other elements so that they don't get squished when the viewport is too small.

```css
.Header,
.Footer {
  flex-shrink: 0;
}

.Content {
  flex-grow: 1;
}
```

And voilá your footer is at the bottom all the time.

## The complete result:

{% codepen c00705534da233982aa90ed744e36377|610 %}
