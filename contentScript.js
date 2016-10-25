var script = document.createElement('script');
script.src = chrome.extension.getURL('background.js');
(document.head||document.documentElement).appendChild(script);
script.parentNode.removeChild(script);