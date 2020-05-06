# softdoc

This is the basis for https://softdoc.js.org. **softdoc** is a small JS-Framework for creating dynamic software documentation websites based on MarkDown.

Here you find [softdoc.js](softdoc.js) and [softdoc.css](softdoc.css), which are provided via [jsdelivr](https://www.jsdelivr.com/?docs=gh) in a CDN.

In [docs/index.html](docs/index.html) you find an example implementation which shows how to use **softdoc**.

A full description including a tutorial for how to setup **softdoc** with Git(Hub/Lab) pages can be found [here](https://softdoc.js.org).

[To the GitHub repository](https://github.com/hilderonny/softdoc)

## Smallest template

```html
<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" href="//cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.0.0/build/styles/solarized-light.min.css">
        <link rel="stylesheet" href="//cdn.jsdelivr.net/gh/hilderonny/softdoc@1.1/softdoc.css">
        <script src="//cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
        <script src="//unpkg.com/mermaid@8.5.0/dist/mermaid.min.js"></script>
        <script src="//cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.0.0/build/highlight.min.js"></script>
        <script src="//cdn.jsdelivr.net/gh/hilderonny/softdoc@1.1/softdoc.min.js"></script>
    </head>
    <body>
        <div id="sidebar"></div>
        <div id="content"></div>
    </body>
</html>
```

## JSDELIVR source URLs

```html
<link rel="stylesheet" href="//cdn.jsdelivr.net/gh/hilderonny/softdoc@1.1/softdoc.css">
<script src="//cdn.jsdelivr.net/gh/hilderonny/softdoc@1.1/softdoc.min.js"></script>
```