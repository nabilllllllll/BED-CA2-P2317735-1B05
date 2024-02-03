// Retrieves current URL of the page (protocol + host) and logs it to the console.

const currentUrl = window.location.protocol + "//" + window.location.host;
console.log("currentUrl:", currentUrl);