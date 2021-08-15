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

function storeData(data, tabID)
{
    /* Close content tab */
    browser.storage.local.get("ST_CONTENT_TABS").then((result) => {
        if (result.ST_CONTENT_TABS[tabID].id !== browser.tabs.TAB_ID_NONE)
        {
            browser.tabs.remove(result.ST_CONTENT_TABS[tabID].id)
            result.ST_CONTENT_TABS[tabID] = browser.tabs.TAB_ID_NONE
            browser.storage.local.set({ ST_CONTENT_TABS: result.ST_CONTENT_TABS })
        }
    })

    /* Store content data */
    browser.storage.local.get("ST_CONTENT_DATA_SEPERATE").then(result => {
        result.ST_CONTENT_DATA_SEPERATE[tabID] = data
        browser.storage.local.set({ ST_CONTENT_DATA_SEPERATE: result.ST_CONTENT_DATA_SEPERATE })

        /*if (Object.keys(result.ST_CONTENT_DATA_SEPERATE[0]).length > 0 && Object.keys(result.ST_CONTENT_DATA_SEPERATE[1]).length > 0)
        {
            mergeCartData(result.ST_CONTENT_DATA_SEPERATE[0]).then(cartData => {
                browser.storage.local.set({ carts: injectPickData(cartData, result.ST_CONTENT_DATA_SEPERATE[1]) })
                browser.storage.local.set({ ST_CONTENT_DATA_SEPERATE: [{}, {}] })
                browser.storage.local.get('SO_UI').then((res) => {
                    browser.tabs.sendMessage(res.SO_UI, { command: 'SO_carts_updated' })
                })
            })
        }*/
    })
}

function handleMessages(request, sender, sendResponse)
{
    if (request.command === 'ST_STAGE_DATA')
    {
        storeData(request.data, 0)
    }

    if (request.command === 'ST_PICK_DATA')
    {
        storeData(request.data, 1)
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
browser.storage.local.set({ ST_CONTENT_DATA_SEPERATE: [{}, {}] })
browser.storage.local.set({ ST_CONTENT_TABS: [] })
