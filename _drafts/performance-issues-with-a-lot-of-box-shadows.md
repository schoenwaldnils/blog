---
layout: post
title: Performance issues with a lot of box-shadows
tags:
  - css
  - perfomance
  - box-shadow
---

I reacently took my [Stargate](c-stargate) form codepen and rebuild it on [github](g-stargate).

And I wondered, why the codepen-version runs with smooth 60fps, while the reworked Stargate didn't. So i tried Andy Edinboroughs [CSS Stress Test](css-stress-test). This stress test pinpoints which parts of your site cousing perfomance issues.

So I ran the test, and the result was, that if I'd remove the outer ring, the performance increases.

[c-stargate]: http://codepen.io/schoenwaldnils/pen/lAncx
[g-stargate]: http://csstargate.schoenwald.media/
[css-stress-test]: http://andy.edinborough.org/CSS-Stress-Testing-and-Performance-Profiling
