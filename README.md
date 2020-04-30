# software-documentation

Anleitung, wie man Software-Repositories mit MarkDown vernünftig dokumentiert und diese Doku auf GitLab Pages hostet.

## Warum?

Es gibt zig Tools für die Software-Entwicklung wie Confluence, Jira, Gitlab Issues, StackEdit, draw.io, Dropbox, NextCloud, OneDrive, mit denen Software begleitend dokumentiert werden kann.

Das Problem hierbei ist, dass dadurch die Informationen an vielen verschiedenen Stellen liegen, die gepflegt und mit einander verknüpft werden müssen. Teilnehmer benötigen jeweils Zugang zu den Tools, was eventuell zusätzliche Kosten verursacht. Und dann kommt noch hinzu, dass der Doku-Stand oft nicht dem Code-Stand entspricht oder man nicht in dessen Historie suchen kann.

GitLab selbst verfügt über ein Issue-System, kann Websites hosten, kann mit Zugriffsrechten umgehen, kann Skripte ausführen (im Rahmen von Pipelines) und hat ein Versionierungssystem für alle Inhalte.

## Wie?

So einfach wie möglich. Das heißt, so wenige Tools wie möglich einsetzen und die Lernkurve flach halten.

Also, ich benutze MarkDown als Format zum Schreiben von Dokumenten. Dazu kommen Plugins wie [mermaid](https://mermaidjs.github.io/#/) zum Zeichnen von Diagrammen und [markedjs](https://github.com/markedjs/marked) zum Generieren von HTML aus MarkDown.

## Okay, lass uns loslegen!

Für ein Softwareprojekt (egal welches) legen wir zuerst fest, dass alle Dokumentation im Stammordner `/doc` zu liegen hat. Dort muss es eine [README.md](doc/README.md) als Einstiegsseite in die Doku sowie eine [CONTENT.md](doc/CONTENT.md) als navigierbares Inhaltsverzeichnis geben. Letztere wird in der Doku als Sidebar angezeigt.

Zum Schreiben verwende ich Visual Studio Code mit dem [Markdown Preview Mermaid Support](https://marketplace.visualstudio.com/items?itemName=bierner.markdown-mermaid) Plugin, damit ich während des MarkDown-Schreibens Diagramme live in der Vorschau sehen kann.

Die Page selbst wird durch einen GitLab CI Runner erzeugt. Dazu wird einfach die Date `.gitlab-ci.yml` im Stammverzeichnis mit diesem Inhalt erzeugt:

```
image: alpine:latest

pages:
  stage: deploy
  script:
  - echo 'Nothing to do...'
  artifacts:
    paths:
    - doc
  only:
  - master
````

Das stellt den Inhalt aus dem Verzeichnis doc bereit, welches wiederum eine HTML-Seite enthält, die wiederum mit markedjs die MarkDown-Dateien aus dem doc-Verzeichnis liest und rendert und ein bisschen aufhübscht.

Der Rest der Doku ist dann [hier](./doc/index.html) zu finden.