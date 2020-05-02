# softdoc.js

SoftDoc besteht im Grunde aus der `index.html` Datei, die als Startseite und Grundgerüdt dient, und der `assets/softdoc.js`, die die Programmlogik beinhaltet.

Die knzeptuelle Funktionsweise ist in [Render-Prozess](RENDERING.md) beschrieben.

## index.html

In der `index.html` werden die Skripte für `marked`, `mermaid` und `highlight.js` referenziert.
Für das Code-Formatieren durch `highlight` wird ein Stylesheet `solarized-light.css` verwendet. Hightlight stellt dabei [verschiedene Stile](https://highlightjs.org/static/demo/) bereit, die ebenfalls verwendet werden können, indem man die `style` Referenz anpasst.

```html
<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" href="assets/solarized-light.min.css">
        <link rel="stylesheet" href="assets/style.css">
        <script src="assets/marked.js"></script>
        <script src="assets/mermaid.min.js"></script>
        <script src="assets/highlight.min.js"></script>
        <script src="assets/softdoc.js"></script>
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

### `loadMarkdown(url, targetselector)`

Die Funktion erwartet mit `url` eine URL auf eine Markdown-Datei.

Diese Datei wird mit `fetch` geladen, anschließend mit `marked` geparst, mit `mermaid` Diagramme und mit `highlight.js` Code-Fragemente formatiert.

Danach wird das generierte HTML in jenes Element auf der Seite geschrieben, welches mit der XPATH-Angabe `targetselector` erreichbar ist. Der bestehende Inhalt wird dabei ersetzt.

Zum Schluss werden alle Links im generierten HTML mit `handleAllLinks()` analysiert und angepasst.

### `handleAllLinks()`

Diese Funktion analysiert alle auf der gerenderten Seite enthaltenen Links.

Absolute externe Links, die mit `http://` oder `https://` beginnen, werden so angepasst, dass die Ziel-Seiten in neuen Browser-Tabs geöffnet werden, um den Lesefluss nicht zu unterbrechen.

Relative Links werden als Verweise auf Markdown-Dateien verstanden und bekommen einen JavaScript-Handler `handleLink()`, der das Laden und Rendern der Ziel-Datei übernimmt. Ein relatives Verlinken auf andere Dateien außer Markdown-Dateien wird derzeit nicht unterstützt.

### `handleLink()`

Dieser Event-Handler wird beim Anklicken eines relativen Links aufgerufen.

Die Funktion lädt die Ziel-Datei des Links per `fetch()` und fügt den in HTML umgewandelten Inhalt mit `loadMarkdown()` in das mit `#content` markierte DIV.
