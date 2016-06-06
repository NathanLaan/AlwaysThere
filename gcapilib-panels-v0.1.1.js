//
// TODO: License
//
// GCAPILIB Panels version 0.1.1
//
//

function gcapilib_CreatePanel(pageURL)
{    
    chrome.windows.create({
        url: pageURL,
        type: "panel",
        state: "docked",
        focused: true
    });
}
