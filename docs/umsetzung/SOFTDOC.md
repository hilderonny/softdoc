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
        <link rel="stylesheet" href="//cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.0.0/build/styles/solarized-light.min.css">
        <link rel="stylesheet" href="//cdn.jsdelivr.net/gh/hilderonny/softdoc@1.1.1/softdoc.css">
        <script src="//cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
        <script src="//unpkg.com/mermaid@8.5.0/dist/mermaid.min.js"></script>
        <script src="//cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.0.0/build/highlight.min.js"></script>
        <script src="//cdn.jsdelivr.net/gh/hilderonny/softdoc@1.1.1/softdoc.min.js"></script>
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

Damit das auch funktioniert, und beim Zurück-Navigieren nicht nur die URL in der Browserleiste geändert wird, wird im `onpostate` event handler die Seite mit der neuen URL neu geladen.

```js
window.addEventListener('popstate', () => {
    this.location.reload();
});
```

### `loadMarkdown(url, targetselector)`

Die Funktion erwartet mit `url` eine URL auf eine Markdown-Datei.

Diese Datei wird mit `fetch` geladen, anschließend mit `marked` geparst, mit `mermaid` Diagramme und mit `highlight.js` Code-Fragemente formatiert.

Danach wird das generierte HTML in jenes Element auf der Seite geschrieben, welches mit der XPATH-Angabe `targetselector` erreichbar ist. Der bestehende Inhalt wird dabei ersetzt.

Zum Schluss werden alle Links im generierten HTML mit `handleAllLinks()` analysiert und angepasst.

Die URL der geladenen Datei wird in der Broser-Historie abgelegt, damit mit den Browser-Buttons vor- und zurück navigiert werden kann.

### `handleAllLinks()`

Diese Funktion analysiert alle auf der gerenderten Seite enthaltenen Links.

Absolute externe Links, die mit `http://` oder `https://` beginnen, werden so angepasst, dass die Ziel-Seiten in neuen Browser-Tabs geöffnet werden, um den Lesefluss nicht zu unterbrechen.

Relative Links werden als Verweise auf Markdown-Dateien verstanden und bekommen einen JavaScript-Handler `handleLink()`, der das Laden und Rendern der Ziel-Datei übernimmt. Ein relatives Verlinken auf andere Dateien außer Markdown-Dateien wird derzeit nicht unterstützt.

### `handleLink()`

Dieser Event-Handler wird beim Anklicken eines relativen Links aufgerufen.

Die Funktion lädt die Ziel-Datei des Links per `fetch()` und fügt den in HTML umgewandelten Inhalt mit `loadMarkdown()` in das mit `#content` markierte DIV.
