# `handleLink()`

Dieser Event-Handler wird beim Anklicken eines relativen Links aufgerufen.

Die Funktion lädt die Ziel-Datei des Links per `fetch()` und fügt den in HTML umgewandelten Inhalt mit `loadMarkdown()` in das mit `#content` markierte DIV.
