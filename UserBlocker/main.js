function main() {
var blockUserAgent = [];
var blockIP = [];
var blockOS = [];
var blockBrowser = [];

var allowUserAgent = [];
var allowIP = [];
var allowOS = [];
var allowBrowser = [];

var forbiddenHTML = '<center>403 - FORBIDDEN. Your User-Agent has been blocked!<br>If this is a mistake, contact the devs!</center>';

var UserAgentBlocked = false;
var IPBlocked = false;
var OSBlocked = false;
var BrowserBlocked = false;


var blockedList = [];

var niceList = function(array, join, finalJoin) {
    var arr = array.slice(0), last = arr.pop();
    join = join || ', ';
    finalJoin = finalJoin || ' and ';
    return arr.join(join) + finalJoin + last;    
};


if (blockUserAgent.includes(window.navigator.userAgent)) {
    UserAgentBlocked = true;
}

if (allowUserAgent.includes(window.navigator.userAgent)) {
    UserAgentBlocked = false;
}

if (UserAgentBlocked) {
    blockedList.push('User Agent')
}

if (IPBlocked) {
    blockedList.push('IP address')
}

if (OSBlocked) {
    blockedList.push('Operating System')
}

if (BrowserBlocked) {
    blockedList.push('Browser')
}


if (UserAgentBlocked | IPBlocked | OSBlocked | BrowserBlocked) {
    // document.body.innerHTML = (forbiddenHTML+'<br>'+niceList(blockedList)+' blocked.');
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