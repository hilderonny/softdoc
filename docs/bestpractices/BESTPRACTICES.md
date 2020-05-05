# Best practices

## Spezifikation

Software-Spezifikationen sollten am Besten in separate kleine Anwendungsfälle gegliedert werden. Dabei sollte stets von einem ganz genau definierten Benutzer ausgegangen werden, der das System bedient. Diese Frage sollte man für jeden Anwendungsfall beantworten und genau erläutern:

**Als WER möchte ich WAS machen, um WELCHES ZIEL zu erreichen?**

Also zum Beispiel für eine Klempnerfirma:

*Als Kundendienstmitarbeiter möchte ich ein eingehendes Telefonat protokollieren, um dem Außendienst mitzuteilen, zum wem er zu fahren hat und was genau er dort reparieren soll.*

Solche Anwendungsfälle sollten jeweils in einer separaten MarkDown-Datei beschrieben und in der Navigation (SIDEBAR.md) verlinkt werden. Die Navigation könnte dann so aussehen:

* Anwendungsfälle
    * Kundendienst
        * Telefonat protokollieren
        * Auskunft über vereinbarten Termin erteilen
        * Nach Zufriedenheit erkundigen
    * Außendienst
        * Auftragsliste für heutigen Tag einsehen
        * Auftrag als erledigt markieren

## Dokumentation aktuell halten

Da die Doku als Text im Repository gespeichert wird, ist dort auch ersichtlich, wann das letzte Mal eine Änderung an einem Doku-Dokument erfolgt ist.

Je nachdem, wie oft Änderungen am System gemacht wurden, sollte regelmäßig die Dokumentation auf Aktualität hin geprüft werden.

Das geht am Einfachsten, indem man nachsieht, welche MArkdown-Dateien länger als beispielsweise 3 Monate nicht geändert wurden. Solche Dateien sind oft ein guter Hinweis auf eine veraltete Dokumentation.

Hat man solche Dokumente identifiziert, sollte man sie genau prüfen und an den aktuellen Stand des Systems anpassen.

Dadurch wird man "gezwungen", sich auch mit älteren Funktionen wieder zu beschäftigen, an denen man eine Weile nichts geändert hat, die aber eventuell durch Änderungen an anderen Stellen beeinflusst oder obsolet geworden sind.

## Code Dokumentation

Ich halte von Dokumentation von Code innerhalb von Kommentarblöcken nicht viel. Man ist dabei auf eine bestimmte Syntax beschränkt und kann oftmals keine Visualisierung (Bilder, Diagramme, Beispielcode) verwenden. Falls man das doch tut, bläht die Inline-Dokumentation die Code-Datei oftmals dermaßen auf, dass diese nur noch schlecht wartbar ist.

Zudem wird meist ein separater Build-Prozess benötigt, um die Dokumentation zu extrahieren und lesbare Dokumente daraus zu erstellen.

Ich halte es für sinnvoll, für Klassendokumentationen eigene Markdown-Dokumente zu schreiben, in denen man sich austoben kann. Den Aufwand des Schreiben hat man so oder so. Nur die Wartung ist einfacher.
Im Code selbst kann man an entsprechenden Stellen Kommentare mit Verweisen auf die Dokumentation platzieren, um die Verwendung von Funktionen nachschlagen zu können.

Das hat auch für das Qualitätsteam, welches die Testfälle schreibt, Vorteile. Diese können sich damit begnügen, die Dokumentation zu lesen, um Testfälle für das erwartete Verhalten von Funktionen zu schreiben und müssen sich nicht durch Code-Dateien durchwühlen.
