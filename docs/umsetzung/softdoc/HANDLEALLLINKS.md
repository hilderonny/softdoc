# `handleAllLinks()`

Diese Funktion analysiert alle auf der gerenderten Seite enthaltenen Links.

Absolute externe Links, die mit `http://` oder `https://` beginnen, werden so angepasst, dass die Ziel-Seiten in neuen Browser-Tabs geöffnet werden, um den Lesefluss nicht zu unterbrechen.

Relative Links werden als Verweise auf Markdown-Dateien verstanden und bekommen einen JavaScript-Handler `handleLink()`, der das Laden und Rendern der Ziel-Datei übernimmt. Ein relatives Verlinken auf andere Dateien außer Markdown-Dateien wird derzeit nicht unterstützt.
