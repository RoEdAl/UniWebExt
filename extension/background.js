/*
    UniWebExt - background script
*/

// menu items
const
    menu_items = [
        {
            id: "uniwebext-image",
            title: "Show image",
            contexts: ["image"]
        },
        {
            id: "uniwebext-link",
            title: "Show link",
            contexts: ["link"]
        },
        {
            id: "uniwebext-page",
            title: "Show page",
            contexts: ["page"]
        },
        {
            id: "uniwebext-selection",
            title: "Show selection",
            contexts: ["selection"]
        }
    ];

const
    create_menu_items = do {
        if (BROWSER == "Mozilla")
            () => menu_items.forEach((e) => browser.contextMenus.create(e))
        else if (BROWSER == "Chrome")
            () => {
                const deep_copy = (e) => JSON.parse(JSON.stringify(e));
                deep_copy(menu_items).forEach((e) => chrome.contextMenus.create(e));
            }
    };

const
    notify = do {
        if (BROWSER == "Mozilla")
            (title, content) => {
                console.log(`UniWebExt : ${title} : ${content}`);
                browser.notifications.create({
                    "type": "basic",
                    "iconUrl": browser.extension.getURL("icons/icon-48.png"),
                    "title": title,
                    "message": content
                });
            }
        else if (BROWSER == "Chrome")
            (title, content) => {
                console.log(`UniWebExt : ${title} : ${content}`);
                chrome.notifications.create({
                    "type": "basic",
                    "iconUrl": chrome.extension.getURL("icons/icon-48.png"),
                    "title": title,
                    "message": content
                });
            }
    };

const
    on_button_clicked = (tab) => {
        notify("URL", tab.url);
    },

    on_context_menu = (info, tab) => {
        switch (info.menuItemId) {
            case "uniwebext-image":
                notify("Image", info.srcUrl);
                break;

            case "uniwebext-link":
                notify(`Link - ${info.linkText}`, info.linkUrl)
                break;

            case "uniwebext-page":
                notify("Page", tab.url);
                break;

            case "uniwebext-selection":
                notify("Selection", info.selectionText)
                break;
        }
    };

if (CONFIG == "Debug")
    console.log("UniWebExt: Greeting")

create_menu_items();

if (BROWSER == "Mozilla") {
    browser.browserAction.onClicked.addListener(on_button_clicked);
    browser.contextMenus.onClicked.addListener(on_context_menu);
} else if (BROWSER == "Chrome") {
    chrome.browserAction.onClicked.addListener(on_button_clicked);
    chrome.contextMenus.onClicked.addListener(on_context_menu);
}
