# softdoc

Hier gibt es die Grundlage für https://gitlab.com/hilderonny/software-documentation.

Es werden [softdoc.js](softdoc.js) [softdoc.css](softdoc.css) bereitgestellt, welche per [jsdelivr](https://www.jsdelivr.com/?docs=gh) in einem CDN verfügbar gemacht werden.

In [example/index.html](example/index.html) ist eine Beispiel-Implementierung, die zeigt, wie softdoc verwendet werden kann.

Eine vollständige Beschreibung samt Anleitung, wie man das Ganze mit GitLab pages benutzt, ist [hier](https://hilderonny.gitlab.io/software-documentation) zu finden.

```html
<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" href="//cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.0.0/build/styles/solarized-light.min.css">
        <link rel="stylesheet" href="//cdn.jsdelivr.net/gh/hilderonny/softdoc@1.0/softdoc.css">
        <script src="//cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
        <script src="//unpkg.com/mermaid@8.5.0/dist/mermaid.min.js"></script>
        <script src="//cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.0.0/build/highlight.min.js"></script>
        <script src="//cdn.jsdelivr.net/gh/hilderonny/softdoc@1.0/softdoc.min.js"></script>
    </head>
    <body>
        <div id="sidebar"></div>
        <div id="content"></div>
    </body>
</html>
```