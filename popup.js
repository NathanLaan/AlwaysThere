
//
//https://www.google.ca/search?q=Refused+to+execute+inline+script+because+it+violates+the+following+Content+Security+Policy+directive%3A+%22script-src+'self'+chrome-extension-resource%3A&oq=Refused+to+execute+inline+script+because+it+violates+the+following+Content+Security+Policy+directive%3A+%22script-src+'self'+chrome-extension-resource%3A&aqs=chrome.0.57.304&sugexp=chrome,mod=0&sourceid=chrome&ie=UTF-8
//

function loadPages(){
    chrome.windows.getAll({populate: true}, function(windows) {
        //each window will contain an array of tabs in it
        if(windows !== null){
            pages = new Array();
            var list = $('#browserPagesList')[0];
            list.options.length = 0; 
            for (var i=0 ; i<windows.length ; i++) {
                for (var j=0; j<windows[i].tabs.length; j++) {
                    if( windows[i].tabs[j].title !== "AthLib") {
                        list.options[list.options.length] = new Option(windows[i].tabs[j].title, windows[i].tabs[j].url);
                    }
                };
            };

            chrome.tabs.query({'active': true, 'currentWindow':true}, function(tab) {
                if( tab !== null && tab.length > 0){
                    for (var i=0 ; i<list.options.length ; i++) {
                        if( list.options[i].value == tab[0].id ) {
                            list.options[i].defaultSelected = true;
                            list.selectedIndex = i;
                        }
                    };
                }
            });

        }
    });
}

var windowId = 'AlwaysThere';

$(document).ready(function() {
    $("#navButton").click(function() {
        var pageURL = $('#browserPagesList').val();        
        chrome.windows.create({
            url: pageURL, 
            type: "panel"
        });
    });
    $("#flagsButton").click(function() {   
        chrome.windows.create({
            url: "chrome://flags#enable-panels"
        });
    });
    loadPages();
});

