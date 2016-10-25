'use strict';

// whitelist for urls
var urlWhitelist = {
    'www.coursehero.com': true,
    'www.sparknotes.com': true,
    'nfs.sparknotes.com': true,
    'www.litcharts.com': true,
    'www.cliffsnotes.com': true,
    'www.shmoop.com': true,
    'lit.genius.com': true,
    'genius.com': true,
    'www.genius.com': true
};

var logeing = function () {
    // Check if load times should be logged and check for browser support
    if (!urlWhitelist.hasOwnProperty(window.location.host) || !(window.performance && window.performance.timing)) return;
    
    var timing = window.performance.timing,
        timingData = {
            'fields': {
                'URL': window.location.href,
                'Latency': timing.responseStart - timing.fetchStart,
                'Transfer': timing.responseEnd - timing.responseStart,
                'DOM Processing to Interactive': timing.domInteractive - timing.domLoading,
                'DOM Interactive to Complete': timing.domComplete - timing.domInteractive,
                'OnLoad': timing.loadEventEnd - timing.loadEventStart,
                'Timestamp': (new Date()).toUTCString()
            },
            'typecast': true 
        },
        http = new XMLHttpRequest(),
        url = "https://api.airtable.com/v0/appa4HLwmnDbJb8TQ/YOUR_AIR_TABLE_IDENTIFIER";

    // Get URL
    console.log('Logging timing for ' + window.location.href);

    // Latency (responseStart – fetchStart)
    // How long it takes the response to get to the user’s device. This includes the time it takes for the request to 
    // get to the server, the time it takes the server to render a response, and the time until the first byte of that 
    // response gets back to the user’s device.
    console.log('Latency ' + timingData.fields['Latency'] + ' ms');
    
    // Transfer (responseEnd – responseStart)
    // How long it takes the browser to download the response from the server.
    console.log('Transfer ' + timingData.fields['Transfer'] + ' ms');

    // DOM Processing to Interactive (domInteractive – domLoading)
    // How long the browser spends loading the webpage until the user can starting interacting with it.
    console.log('DOM Processing to Interactive ' + timingData.fields['DOM Processing to Interactive'] + ' ms');

    // DOM Interactive to Complete (domComplete – domInteractive)
    // How long it takes for the browser to load images/videos and execute any Javascript code listening for the DOMContentLoaded event.
    console.log('DOM Interactive to Complete ' + timingData.fields['DOM Interactive to Complete'] + ' ms');
    
    // Onload (loadEventEnd – loadEventStart)
    // How long it takes the browser to execute Javascript code waiting for the window.load event.
    console.log('Onload ' + timingData.fields['OnLoad'] + ' ms');

    // Log data to AirTable
    http.open('POST', url, true);
    http.setRequestHeader('Authorization', 'Bearer YOUR_AIR_TABLE_API_KEY');
    http.setRequestHeader('Content-type', 'application/json');
    http.send(JSON.stringify(timingData));
};

window.onload = function () {
    setTimeout(logeing, 3000);
};