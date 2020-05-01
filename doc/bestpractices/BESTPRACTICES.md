# Best practices

TODO

- Anwendungsfälle in einzelne Seiten
    - oder Unter-Überschriften, wenn klein genug. Dann zeigen, wie man diese verlinkt (kann das softdoc.js inzwischen?)
- Doku-Seiten, die länger als 3 Monate nicht geändert wurden, sind gute Kanditaten für Prüfungen, ob deren Inhalt noch aktuell ist (Review-Runde einberufen)
- Keine In-Code-Klassenbeschreibung, schlecht wartbar, macht Code unübersichtlich und muss ja doch geschrieben werden.
    - Dann lieber gleich in separater md-Datei mit Beispielen, Diagrammen, Bildern und Referenzen
    - Verweis auf diese Doku im Code als einzeiligen Kommentar
    - Außerdem schwierig zu parsen bei exotischen Sprachen wie Apex und benötigt separaten Build-Step, der ebenfalls gewartet werden muss

Oh Mann, ich denke gerade darüber nach, ob ich softdoc.js als eigenes Produkt veröffentliche. 😒