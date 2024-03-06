function main() {
var blockedUserAgents = [
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
];

var forbiddenHTML = '<center>403 - FORBIDDEN. Your User-Agent has been blocked! :)<br>If this is a mistake, contact the devs!<br>(its not)<br>(anyway i\'m not ginving you my email)</center>';


if (blockedUserAgents.includes(window.navigator.userAgent)) {
    document.body.innerHTML = forbiddenHTML;
}

document.getElementById('error_ab1ff6ceb029b079314e09d7015cf0a379bcc55e').remove()


};

main();