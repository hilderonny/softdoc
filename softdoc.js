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
    loadMarkdown(this.getAttribute('href'), '#content');
    event.preventDefault();
    return false;
}

function handleAllLinks() {
    for (atag of document.querySelectorAll('a')) {
        atag.removeEventListener('click', handleLink);
        if (/^(http(s)?:\/\/)/.test(atag.getAttribute('href')))
            atag.setAttribute('target', '_blank');
        else {
            atag.addEventListener('click', handleLink);
        }
    }
}

async function loadMarkdown(url, targetselector, donotsetnewurl, replacenewurl) {
    var source = await (await fetch(url, { mode: 'no-cors', cache: 'no-cache' })).text();
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
    handleAllLinks();
    if (location.hash.length > 1) {
        var el = document.getElementById(location.hash.substring(1));
        if (el) el.scrollIntoView(); // Mit #id zu einer Überschrift springen, falls diese existiert
    }
}

window.addEventListener('load', async () => {
    await loadMarkdown('SIDEBAR.md', '#sidebar', true);
    if (location.search.length > 1) { // Wenn ?suburl angegeben ist, wird gleich dieses Dokument geladen
        await loadMarkdown(location.search.substring(1), '#content', true);
    } else {
        await loadMarkdown('CONTENT.md', '#content', false, true);
    }
    mermaid.mermaidAPI.initialize({ securityLevel: 'loose' });
});

window.addEventListener('popstate', () => {
    this.location.reload(); // Muss aufgerufen werden, da ansonsten nur die URL geändert wird, aber nicht die andere Seite geladen wird
});