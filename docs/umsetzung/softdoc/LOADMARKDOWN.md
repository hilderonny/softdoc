# `loadMarkdown(url, targetselector)`

Die Funktion erwartet mit `url` eine URL auf eine Markdown-Datei.

Diese Datei wird mit `fetch` geladen, anschließend mit `marked` geparst, mit `mermaid` Diagramme und mit `highlight.js` Code-Fragemente formatiert.

Danach wird das generierte HTML in jenes Element auf der Seite geschrieben, welches mit der XPATH-Angabe `targetselector` erreichbar ist. Der bestehende Inhalt wird dabei ersetzt.

Zum Schluss werden alle Links im generierten HTML mit `handleAllLinks()` analysiert und angepasst.

Die URL der geladenen Datei wird in der Broser-Historie abgelegt, damit mit den Browser-Buttons vor- und zurück navigiert werden kann.
