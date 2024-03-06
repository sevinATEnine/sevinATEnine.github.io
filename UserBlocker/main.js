function main() {
var blockedUserAgents = [
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
];

var forbiddenHTML = '<center>403 - FORBIDDEN. Your User-Agent has been blocked! :)<br>If this is a mistake, contact the devs!<br>(its not)<br>(anyway i\'m not ginving you my email)</center>';


if (blockedUserAgents.includes(window.navigator.userAgent)) {
    document.body.innerHTML = forbiddenHTML;
}


elementToObserve = document.body;

// create a new instance of 'MutationObserver' named 'observer', 
// passing it a callback function
observer = new MutationObserver(function(mutationsList, observer) {
    try {document.querySelector('div').remove();} catch{}
});

// call 'observe' on that MutationObserver instance, 
// passing it the element to observe, and the options object
observer.observe(elementToObserve, {characterData: false, childList: true, attributes: false});



document.querySelectorAll('style').forEach(e => e.remove());

var style = `
* {
    color: green;
    background: black;
    font-family: monospace;

}
`;
var styleElement = document.createElement('style');
styleElement.textContent = style;

var head = document.querySelector('head');
head.appendChild(styleElement);

};

main();