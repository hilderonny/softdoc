# software-documentation

Das hier ist eine Anleitung, wie man Software-Repositories mit MarkDown vernünftig dokumentiert und diese Doku auf GitLab Pages hostet.

## Warum?

Es gibt zig Tools für die Software-Entwicklung wie Confluence, Jira, Gitlab Issues, StackEdit, draw.io, Dropbox, NextCloud, OneDrive, mit denen Software begleitend dokumentiert werden kann.

Das Problem hierbei ist, dass dadurch die Informationen an vielen verschiedenen Stellen liegen, die gepflegt und mit einander verknüpft werden müssen. Teilnehmer benötigen jeweils Zugang zu den Tools, was eventuell zusätzliche Kosten verursacht. Und dann kommt noch hinzu, dass der Doku-Stand oft nicht dem Code-Stand entspricht oder man nicht in dessen Historie suchen kann.

GitLab selbst verfügt über ein Issue-System, kann Websites hosten, kann mit Zugriffsrechten umgehen, kann Skripte ausführen (im Rahmen von Pipelines) und hat ein Versionierungssystem für alle Inhalte.

## Wie?

So einfach wie möglich. Das heißt, so wenige Tools wie möglich einsetzen und die Lernkurve flach halten.

Also, ich benutze MarkDown als Format zum Schreiben von Dokumenten. Dazu kommen Plugins wie [mermaid](https://mermaidjs.github.io/#/) zum Zeichnen von Diagrammen und [markedjs](https://github.com/markedjs/marked) zum Generieren von HTML aus MarkDown.

## Okay, lass uns loslegen!

Weiter geht's mit [der Dokumentation selbst](https://hilderonny.gitlab.io/software-documentation/).