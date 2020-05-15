# `handleSidebarMenu()`

Die Sidebar enthält eine Hierarchie von `ul` Elementen, die ein Menü darstellen.

Diese Funktion analysiert die Hierarchie und fügt vor jedem Eintrag, der Untereinträge hat, ein Symbol ein.

Ein Klick auf das Symbol öffnet oder schließt den Eintrag. Der Zustand des Eintrages wird dabei im localStorage gespeichert und beim nächsten Start wieder ausgelesen.