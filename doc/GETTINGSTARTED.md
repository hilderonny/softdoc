# Getting started

Ich gehe mal davon aus, dass es bereits ein umfangreiches Softwareprojekt mit einer Verzeichnisstruktur gibt. Daher beschreibt diese Anleitung bewusst nicht ein Aufsetzen "from scratch".

Im Grunde besteht das Projekt aus zwei Teilen:

1. Ein Verzeichnis `/doc` (oder anders benannt), welches in einer beliebigen Hierarchie die Dokumentation und alle Ressourcen enthält.
2. Die Datei `/.gitlab-ci.yml`, die für den Transfer der Dokumentation auf Gitlab Pages verantwrtlich ist.

## Verzeichnis `/doc`

Im Grunde ist egal, in welchem Verzeichnis die Dokumentation liegt. Wenn man ein anderes wählt, muss man das nur später in der `.gitlab-ci.yml` eintragen.

In diesem Verzeichniss muss sich die Datei [index.html](index.html) befinden, welche die Dokumentation rendert.

```html
<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" href="assets/solarized-light.min.css">
        <link rel="stylesheet" href="assets/softdoc.css">
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

Zusätzlich wird das Unterverzeichnis `assets` mit all seinen Dateien benötigt. Das Verzeichnis enthält Stylesheets und Skripte, die der Dokumentation beim Rendern helfen.

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
