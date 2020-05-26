# softdoc.js

SoftDoc besteht im Grunde aus der `index.html` Datei, die als Startseite und Grundgerüdt dient, und der `assets/softdoc.js`, die die Programmlogik beinhaltet.

Die konzeptuelle Funktionsweise ist in [Render-Prozess](RENDERING.md) beschrieben.

## index.html

In der `index.html` werden die Skripte für `marked`, `mermaid` und `highlight.js` referenziert.
Für das Code-Formatieren durch `highlight` wird ein Stylesheet `solarized-light.css` verwendet. Hightlight stellt dabei [verschiedene Stile](https://highlightjs.org/static/demo/) bereit, die ebenfalls verwendet werden können, indem man die `style` Referenz anpasst.

```html
<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" href="//cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.0.0/build/styles/solarized-light.min.css">
        <link rel="stylesheet" href="//cdn.jsdelivr.net/gh/hilderonny/softdoc@1.4/softdoc.css">
        <script src="//cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
        <script src="//unpkg.com/mermaid@8.5.0/dist/mermaid.min.js"></script>
        <script src="//cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.0.0/build/highlight.min.js"></script>
        <script src="//cdn.jsdelivr.net/gh/hilderonny/softdoc@1.4/softdoc.min.js"></script>
    </head>
    <body>
        <div id="sidebar"></div>
        <div id="content"></div>
    </body>
</html>
```

Der `body` selbst besteht aus den zwei Bereichen `sidebar` für die Navigation und `content` für den Inhalt.

## softdoc.js

Beim Laden der Seite werden die Inhalte für die Navigationsleiste und die Startseite aus den entsprechenden MarkDown-Dateien geladen.

```js
window.addEventListener('load', async () => {
    await loadMarkdown('SIDEBAR.md', '#sidebar');
    await loadMarkdown('CONTENT.md', '#content');
    mermaid.mermaidAPI.initialize({ securityLevel: 'loose' });
});
```

Dabei wird mit `mermaid.mermaidAPI.initialize({ securityLevel: 'loose' });` festgelegt, dass Diagramme Verlinkungen zulassen sollen.

Außerdem wird `marked` konfiguriert und für das Behandeln von Code-Fragmenten eingerichtet.

```js
var renderer = new marked.Renderer();
renderer.code = function (code, language) {
    if(language === 'mermaid')
        return '<div class="mermaid">' + code + '</div>';
    else {
        var validLanguage = hljs.getLanguage(language) ? language : 'plaintext';
        return '<pre><code class="hljs ' + validLanguage + '">' + hljs.highlight(validLanguage, code).value + '</code></pre>';
    }
};
marked.setOptions({ renderer: renderer });
```

Das Klicken von internen Links führt dazu, dass die URL aktualisiert wird, obwohl die Inhalte nur per AJAX-Calls geladen werden. Dadurch kann man mit den Browser-Buttons in der Historie vor- und zurück navigieren.

Damit das auch funktioniert, und beim Zurück-Navigieren nicht nur die URL in der Browserleiste geändert wird, wird im `onpopstate` event handler die Seite mit der neuen URL neu geladen.

```js
window.addEventListener('popstate', () => {
    this.location.reload();
});
```

Die Sidebar enthält ein Menü, das auf- und zugeklappt werden kann. Die Logik dazu wird in `handleSidebarMenu()` umgesetzt.

## Funktionen

* [handleAllLinks()](softdoc/HANDLEALLLINKS.md)
* [handleLink()](softdoc/HANDLELINK.md)
* [handleSidebarMenu()](softdoc/HANDLESIDEBARMENU.md)
* [loadMarkdown(url, targetselector)](softdoc/LOADMARKDOWN.md)
