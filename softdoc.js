var settingstext = localStorage.getItem('settings');
var settings = settingstext ? JSON.parse(settingstext) : { lastmodified: {} };

var renderer = new marked.Renderer();
renderer.code = function(code, language) {
    if(language === 'mermaid')
        return '<div class="mermaid">' + code + '</div>';
    else {
        var validLanguage = hljs.getLanguage(language) ? language : 'plaintext';
        return '<pre><code class="hljs ' + validLanguage + '">' + hljs.highlight(validLanguage, code).value + '</code></pre>';
    }
};
renderer.heading = function(text, level) {
    var escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
    var url = (location.search.length > 1 ? location.search.substring(1) : '') + '#' + escapedText;
    return `<h${level} id="${escapedText}"><a class="anchor" href="${url}">${text}</a></h${level}>`;
};
marked.setOptions({ renderer: renderer });

function handleLink() {
    this.classList.remove('new');
    loadMarkdown(this.getAttribute('href'), '#content');
    event.preventDefault();
    return false;
}

function handleAllLinks(targetselector, checkforupdates) {
    for (atag of document.querySelector(targetselector).querySelectorAll('a')) { // Nur die Links des neu geladenen Dokumentes bearbeiten
        atag.removeEventListener('click', handleLink);
        var href = atag.getAttribute('href');
        if (/^(http(s)?:\/\/)/.test(href))
            atag.setAttribute('target', '_blank');
        else {
            atag.addEventListener('click', handleLink);
            // Für die sidebar werden Links mit "new" markiert, wenn deren Zieldateien ein Änderungsdatum haben, welches neuer ist als der letzte Zugriff
            if (checkforupdates) {
                // Das ist zwar teuer, sollte abr nur beim ersten Aufruf für die Sidebar erfolgen
                // Wir machen dass in einer Promise, damit das im Hintergrund laufen kann und somit das Seiten-Laden nicht unterbrochen wird
                new Promise(async() => {
                    var ataginpromise = atag;
                    var hrefinpromise = href;
                    return fetch(hrefinpromise, { method: 'HEAD', mode: 'no-cors', cache: 'no-cache' }).then((response) => {
                        var lastmodified = Date.parse(response.headers.get('last-modified'));
                        if (!settings.lastmodified[hrefinpromise] || settings.lastmodified[hrefinpromise] < lastmodified) {
                            ataginpromise.classList.add('new');
                        }
                    });
                });
            }
        }
    }
}

async function loadMarkdown(url, targetselector, donotsetnewurl, replacenewurl, checkforupdates) {
    var response = await fetch(url, { mode: 'no-cors', cache: 'no-cache' });
    // Der gerade letzte Zugriff wird im localstorage gespeichert, um später in der sidebar neuere Dokumente markieren zu können
    settings.lastmodified[url] = Date.now();
    localStorage.setItem('settings', JSON.stringify(settings));
    var source = await response.text();
    if (!donotsetnewurl) {
        var historyurl = location.origin + location.pathname + '?' + url;
        if (!replacenewurl) {
            history.pushState(null, null, historyurl); // URL aktualisieren, muss vor Rendering passieren, damit Links auf neue URL zeigen
        } else {
            history.replaceState(null, null, historyurl); // Beim ersten Laden soll die Historie nicht angehängt werden, da man sonst nicht mehr raus kommt
        }
    }
    var html = marked(source);
    // Append "powered by" hint
    html += '<div class="poweredbysoftdoc">powered by <a href="https://softdoc.js.org">softdoc.js</a></div>';
    document.querySelector(targetselector).innerHTML = html;
    mermaid.init();
    handleAllLinks(targetselector, checkforupdates);
    if (location.hash.length > 1) {
        var el = document.getElementById(location.hash.substring(1));
        if (el) el.scrollIntoView(); // Mit #id zu einer Überschrift springen, falls diese existiert
    }
}

window.addEventListener('load', async () => {
    await loadMarkdown('SIDEBAR.md', '#sidebar', true, false, true);
    if (location.search.length > 1) { // Wenn ?suburl angegeben ist, wird gleich dieses Dokument geladen
        await loadMarkdown(location.search.substring(1), '#content', true, false, false);
    } else {
        await loadMarkdown('CONTENT.md', '#content', false, true, false);
    }
    mermaid.mermaidAPI.initialize({ securityLevel: 'loose' });
});

window.addEventListener('popstate', () => {
    this.location.reload(); // Muss aufgerufen werden, da ansonsten nur die URL geändert wird, aber nicht die andere Seite geladen wird
});