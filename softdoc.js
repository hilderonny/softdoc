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
    var url = location.origin + location.pathname + location.search + '#' + escapedText;
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

async function loadMarkdown(url, targetselector, donotsetnewurl) {
    var source = await (await fetch(url, { mode: 'no-cors', cache: 'no-cache' })).text();
    var html = marked(source);
    document.querySelector(targetselector).innerHTML = html;
    mermaid.init();
    handleAllLinks();
    if (!donotsetnewurl) history.pushState(null, null, location.origin + location.pathname + '?' + url + location.hash); // URL aktualisieren
}

window.addEventListener('load', async () => {
    await loadMarkdown('SIDEBAR.md', '#sidebar', true);
    if (location.search.length > 1) { // Wenn ?suburl angegeben ist, wird gleich dieses Dokument geladen
        await loadMarkdown(location.search.substring(1), '#content');
        if (location.hash.length > 1) document.getElementById(location.hash.substring(1)).scrollIntoView(); // Mit #id zu einer Überschrift springen
    } else {
        await loadMarkdown('CONTENT.md', '#content');
    }
    mermaid.mermaidAPI.initialize({ securityLevel: 'loose' });
});
