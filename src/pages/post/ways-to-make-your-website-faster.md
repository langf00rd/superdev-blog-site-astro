---
layout: "../../layouts/BlogPost.astro"
title: "5 ways to make your website 10x faster ⚡🚀"
description: "Here are some essential browser extensions every web developer must have."
pubDate: "Aug 18 2022"
banner: "/images/posts/ways-to-make-your-website-faster.png"
slug: "ways-to-make-your-website-faster"
tags: "webdev,productivity,testing,programming"
---

The speed of your website significantly impacts how long people stay on it, the conversion rate, and the number of views it receives. Unfortunately, some developers overlook minor changes that could be implemented to address this issue.

Take a look at these statistics. A **one-second delay**:

- reduces page views by **11%**
- decreases customer satisfaction by **16%**
- reduces conversion rates by **7%**

Although these percentages may appear negligible, they make a significant difference. When a visitor has a negative experience and leaves, it isn't easy to persuade him back.

In this article, I will show you five things you should do right now to improve the speed of your website!

## #1 Minify file sizes

![minify file size meme](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/wh50in48m8f9961wnrub.png)

The larger the file sizes on your website, the more HTTP requests are made on each visit to your page, and the more bandwidth it takes to download your page's content, making your website load slower.

CSS and JavaScript files are typically large. In such cases, reducing the file size can help to improve load time. When a file is minified, unnecessary comments, whitespaces, and formatting are removed. Essentially, anything the computer does not require to understand your code is removed. Reducing file size and increasing the load time

Fortunately, there are numerous online tools available to help you minify files.

- [Minifier](https://www.minifier.org/)
- [HTMLMinifier](https://github.com/kangax/html-minifier)
- [CSSnano](https://github.com/ben-eb/cssnano)
- [UglifyJs](https://github.com/mishoo/UglifyJS2)

## #2 Asynchronously load CSS and JavaScript files

![async load meme](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/r0xok85i9neo8bnz3l4r.png)

Loading imported files asynchronously significantly increases load time. This is how it works.

The synchronous method involves loading files one line at a time. When a file is being loaded, it must finish before other files can be loaded. This process is often reflected in the frontend, where the HTML content is sometimes displayed without CSS styles. After a few seconds, it shows a normal looking website, resulting in a bad experience.

Asynchronous loading involves loading multiple files at the same time. This way, your website does not have to wait for one file's load process to complete before moving on to the next.

Here's how to go about it:

```
<!-- async load CSS file-->
<link rel="preload" href="styles.css" as="style" onload="this.rel='stylesheet'">
```

```
// async load javaScript
<script async src="script.js"></script>
```

You can use the 'defer' attribute to tell the browser not to wait for the 'script' to finish loading. In this fashion, the 'script' loads in the background and executes when the DOM is entirely built.

```
<script defer src="script.js"></script>
```

## #3 Media optimization

Images and media take the longest to load and have larger file sizes than HTML and CSS files.

We are familiar with JPEGs, MP4s, and other file types that typically have larger file sizes, contributing to slower media loads and a poor user experience.

However, some other file formats have relatively smaller file sizes. Even though these files are compressed, they do not affect the resolution or quality of your media files. As a result, while using smaller media files, quality is maintained.

Optimized image file types:

- SVG
- WEBP
- AVIF
- ICO
- TIFF
- ICO

Optimized video file types:

- WEBM
- MPEG-4 Part 14

Optimized audio file types:

- AAC
- OGG
- WAV

## #4. Use a CDN

Content Delivery Networks (CDNs) cache content on servers located all over the world. When a user requests a file, the request is routed to the CDN server closest to the user's geographical location rather than the hosting server, which is likely thousands of miles away. As a result, the load time is reduced.

CDNs you can use today

- Akamai
- CloudFlare
- Stackpath
- CDN77
- CacheFly
- Amazon CloudFront

## #5 Test website performance

![response time meme](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/a8auxbx0mklgya8rnm6j.png)

During testing sessions, you can identify and fix issues affecting your website's performance before it goes live. To diagnose performance issues on your website, use a tool like Google's [PageSpeed](https://pagespeed.web.dev/). You can use the network tab in the dev tools to track the number of requests made and the amount of bandwidth used.

## Conclusion

That's it for this article.

If you found it useful, consider following me on [Twitter](https://twitter.com/langford_dev) and signing up for my weekly [newsletter](https://www.getrevue.co/profile/langford_dev) for more web developer content.
