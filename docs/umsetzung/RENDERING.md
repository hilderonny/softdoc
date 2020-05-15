# Render-Prozess

```mermaid
graph TD
    b[Markdown parsen]-->g[Diagramme formatieren]
    g-->h[Code formatieren]
    h-->i[Links verarbeiten]
    i-->j[HTML anzeigen]
    subgraph Seite geladen
    a[SIDEBAR.md laden]-->b
    c[CONTENT.md laden]-->b
    end
    subgraph Auf Link geklickt
    d{Externer Link?}-->|Ja|e[Ziel in neuem<br/>Tab öffnen]
    d-->|Nein|f[Ziel-URL laden]
    f-->b
    end
```

Beim Laden der Seite werden die MarkDown-Dateien `SIDEBAR.md` und `CONTENT.md` in die linke Navigationsleiste und in den Hauptbereich geladen.

Dabei werden die Dateien per `fetch()` mit JavaAScript vom Server geholt und danach mit `marked` in HTML umgewandelt.

Beim Umwandeln werden die `code`- Bereiche analysiert. Enthält dieser ```mermaid``` - Code, wird daraus mit mermaid ein Diagramm generiert und ins Ergebnis-HTML eingebunden.

Andernfalls wird mit `highlight.js` der Code farblich entsprechend der Programmiersprache formatiert und ebenfalls ins HTML eingefügt.

In einem weiteren Schritt werden alle `<a href>`- Links analysiert und durch JavaScript-Funktionen ersetzt. Externe Links werden dabei in einem neuen Tab geöffnet. Relative Links werden als Referenzen auf MarkDown-Dateien verstanden und durchlafen denselben Prozess des Ladens und Renderns, wenn sie angeklickt werden. Damit können auch Links innerhalb von Diagrammen mit externen und internen Verweisen versehen werden.

![New badge](umsetzung/newbadge.png)

Softdoc merkt sich im localStorage, welche Seiten bereits angesehen wurden. Alle Seiten, die man noch nicht angesehen hat, werden in der Sidebar mit einer "New" - badge markiert. Ebenso Seiten, die seit dem letzten Besuch aktualisiert wurden. So hat man stets einen Überblick, ob es interessante Neuigkeiten gibt.

Zum Schluss wird das HTML in den Inhaltsbereich geschrieben und der bestehende Inhalt ersetzt.

Die Menüeinträge der Sidebar können auf- und zugeklappt werden. Der Zustand des Zuklappens wird dabei ebenfalls im localStorage gespeichert und beim nächsten Besuch findet man denselben Zustand wie vorher vor.

Die technische Umsetzung erfolgt in der Datei [softdoc.js](umsetzung/SOFTDOC.md).
