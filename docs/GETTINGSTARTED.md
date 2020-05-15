# Getting started

## GitLab Pages

Ich gehe mal davon aus, dass es bereits ein umfangreiches Softwareprojekt mit einer Verzeichnisstruktur gibt. Daher beschreibt diese Anleitung bewusst nicht ein Aufsetzen "from scratch".

Im Grunde besteht das Projekt aus zwei Teilen:

1. Ein Verzeichnis `/doc` (oder anders benannt), welches in einer beliebigen Hierarchie die Dokumentation und alle Ressourcen enthält. Im Grunde ist egal, in welchem Verzeichnis die Dokumentation liegt. Wenn man ein anderes wählt, muss man das nur später in der `/.gitlab-ci.yml` eintragen.
2. Die Datei `/.gitlab-ci.yml`, die für den Transfer der Dokumentation auf Gitlab Pages verantwrtlich ist.

## Github Pages

Unter GitHub Pages ist die Einrichtung noch einfacher. Dazu MUSS sich die Dokumentation im Verzeichnis `/docs` befinden.

Anschließend wird in den Projekteinstellungen in GitHub **Settings > Options > GitHub Pages** eingestellt, dass man ein Projektverzeichnis anlegen möchte und als **Source** wird dabei `master branch/docs folder` eingestellt.

Nach jedem Commit wird nun die GitHub Pages Seite neu generiert.

## Verzeichnis `/docs`

In diesem Verzeichniss muss sich die Datei [index.html](index.html) befinden, welche die Dokumentation rendert.

```html
<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" href="//cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.0.0/build/styles/solarized-light.min.css">
        <link rel="stylesheet" href="//cdn.jsdelivr.net/gh/hilderonny/softdoc@1.3/softdoc.css">
        <script src="//cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
        <script src="//unpkg.com/mermaid@8.5.0/dist/mermaid.min.js"></script>
        <script src="//cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.0.0/build/highlight.min.js"></script>
        <script src="//cdn.jsdelivr.net/gh/hilderonny/softdoc@1.3/softdoc.min.js"></script>
    </head>
    <body>
        <div id="sidebar"></div>
        <div id="content"></div>
    </body>
</html>
```

Zuletzt werden noch zwei [MarkDown](https://de.wikipedia.org/wiki/Markdown)-Dateien benötigt, die die Startseite der Dokumentation und das Inhaltsverzeichnis enthalten.

|Datei|Bedeutung|
|---|---|
|[SIDEBAR.md](SIDEBAR.md)|Inhaltsverzeichnis, das am linken Rand der Dokumentation auf jeder Seite angezeigt wird|
|[CONTENT.md](CONTENT.md)|Erste Seite der Dokumentation. Diese wird angezeigt, wenn die Dokumentation erstmalig im Browser aufgerufen wird.|

Die Datei `SIDEBAR.md` sollte ausschließlich aus Listenelementen bestehen. Diese können geschachtelt sein, um Navigationshierarchien darzustellen.

```md
* [Home](CONTENT.md)
* [Thema 1](thema1/README.md)
    * [Unterthema 1](thema1/UNTERTHEMA1.md)
* [Thema 2](thema2/README.md)
    * [Unterthema 2](thema2/UNTERTHEMA2.md)
```

## Aussehen der Dokumentation anpassen

Um das Aussehen der Dokumentation zu verändern, sollte eine eigene CSS-Datei angelegt und in der `index.html` eingebunden werden. Das folgende Beispiel zeigt, wie das Logo und die Farben angepasst werden können.

```css
a { color: green; }
#sidebar::before { content: "☁"; }
h1, h2, h3, h4 { color: red; }
```

Falls der "poweredby" - Slogan am Ende jeder Seite unerwünscht ist, lässt dieser sich per CSS einfach ausblenden:

```css
.poweredbysoftdoc { display: none; }
```

## Datei `/.gitlab-ci.yml`

Diese Datei steuert den GitLab-Runner, der die Dokumentation veröffentlicht und muss sich im Stammverzeichnis des Projektes befinden. Falls es bereits eine solche Datei gibt, braucht diese nur um den unten stehenden Inhalt erweitert zu werden.

```yml
image: alpine:latest

pages:
  stage: deploy
  script:
  - mv doc public
  artifacts:
    paths:
    - public
  only:
  - master
```

Da Gitlab Pages die Eigenart hat, nur aus einem `/public` - Verzeichnis heraus [veröffentlichen zu können](https://gitlab.com/gitlab-org/gitlab-pages/-/issues/84#note_43194091), wird mit der Zeile "`-mv doc public`" der Inhalt des doc-Verzeichnisses temporär in ein public-Verzeichnis kopiert und dann veröffentlicht.

Dabei ist zu beachten, dass es im Projekt nicht bereits ein `/public` - Verzeichnis mit Inhalt gibt, da dessen Inhalt ansonsten ebenfalls veröffentlicht würde. In so einem Fall könnte das Skript folgendermaßen angepasst werden, um den bestehenden Inhalt temporär zu entfernen:

```yml
...
pages:
    ...
    script:
    - mv public public_save
    - mv doc public
```

Falls sich die Dokumentation in einem anderen Verzeichnis befindet, muss man ebenfalls diese Zeile anpassen, z.B. für `/mein/super/doc/verzeichnis`:

```yml
  - mv /mein/super/doc/verzeichnis public
```
