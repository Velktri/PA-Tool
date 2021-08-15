function LoadContentTabs()
{
    browser.windows.create({
        url: [
            'https://logistics.amazon.com/station/dashboard/stage',
            'https://logistics.amazon.com/station/dashboard/pick'
        ]
    }).then(windowInfo => {
        browser.windows.update(
            windowInfo.id,
            {
                state: "minimized"
            }
        )

        browser.storage.local.set({ ST_CONTENT_TABS: windowInfo.tabs })
    })
}


function handleMessages(request, sender, sendResponse) 
{
    if (request.command === 'ST_PICK_DATA')
    {
        console.log(request.data)
        //storeData(request.data, 1)
    }

    /* Greeting returning from content message script */
    if (request.command === 'ST_WINDOW_MESSAGE')
    {
        /* Send Execute script to tab */
        browser.storage.local.get('ST_CONTENT_TABS').then((result) => {
            let contentFiles = ["/content-stage.js", "/content-pick.js"]
            let contentTabs = result.ST_CONTENT_TABS

            for (let i = 0; i < contentTabs.length; i++)
            {
                if (sender.tab.id === contentTabs[i].id)
                {
                    browser.tabs.executeScript(
                        sender.tab.id,
                        {
                            file: contentFiles[i],
                            allFrames: true
                        }
                    )
                }
            }
        })
    }
}

function handleBrowserClicked()
{
    LoadContentTabs()

    /* Create or focus sally dashboard tab */
    browser.storage.local.get('ST_UI').then(res => {
        if (res.ST_UI === undefined || res.ST_UI === browser.tabs.TAB_ID_NONE)
        {
            /*browser.tabs.create({ url: 'UI/index.html' }).then((tab) => {
                browser.storage.local.set({ ST_UI: tab.id })
            })*/
        }
        else
        {
            browser.tabs.update(res.ST_UI, { active: true })
        }
    })
}


/* Listeners */
browser.browserAction.onClicked.addListener(handleBrowserClicked)
browser.runtime.onMessage.addListener(handleMessages)


/* Storage API */
browser.storage.local.set({ ST_UI: browser.tabs.TAB_ID_NONE })
browser.storage.local.set({ ST_CONTENT_TABS: [] })
