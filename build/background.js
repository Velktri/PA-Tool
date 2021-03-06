function handleRemoved(tabID)
{
    browser.storage.local.get("ST_UI").then(res => {
        if (tabID === res.ST_UI)
        {
            browser.storage.local.set({ ST_UI: browser.tabs.TAB_ID_NONE })
        }
    })


    browser.storage.local.get("ST_CONTENT_TABS").then(res => {
        res.ST_CONTENT_TABS.forEach((tab, i) => {
            if (tabID === tab) {
                let updatedTabArray = res.ST_CONTENT_TABS
                updatedTabArray[i] = browser.tabs.TAB_ID_NONE
                browser.storage.local.set({ ST_CONTENT_TABS: updatedTabArray })
            }
        })
    })
}

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
        browser.storage.local.set({ ST_CONTENT_TABS: windowInfo.tabs.map(tab => tab.id) })
    })
}

function storeData(data, tabIndex)
{
    /* Close content tab 
    browser.storage.local.get("ST_CONTENT_TABS").then((result) => {
        if (result.ST_CONTENT_TABS[tabIndex].id !== browser.tabs.TAB_ID_NONE)
        {
            browser.tabs.remove(result.ST_CONTENT_TABS[tabIndex].id)
            result.ST_CONTENT_TABS[tabIndex] = browser.tabs.TAB_ID_NONE
            browser.storage.local.set({ ST_CONTENT_TABS: result.ST_CONTENT_TABS })
        }
    })*/

    /* Store content data */
    if (tabIndex === 0)
    {
        browser.storage.local.set({ ST_CART_DATA: data }).then(() => {
            browser.storage.local.get('ST_UI').then((res) => {
                browser.tabs.sendMessage(res.ST_UI, { command: 'ST_CART_DATA_UPDATED' })
            })
        })
    }

    if (tabIndex === 1) 
    {
        browser.storage.local.set({ ST_STATION_PAIR_DATA: data }).then(() => {
            browser.storage.local.get('ST_UI').then((res) => {
                browser.tabs.sendMessage(res.ST_UI, { command: 'ST_STATION_DATA_UPDATED' })
            })
        })
    }
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
                if (sender.tab.id === contentTabs[i])
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
    /* Create or focus UI dashboard tab */
    browser.storage.local.get('ST_UI').then(res => {
        if (res.ST_UI === undefined || res.ST_UI === browser.tabs.TAB_ID_NONE)
        {
            // check and close all old ST tabs
            browser.tabs.query({ url: "moz-extension://ecf056b9-e569-40a2-809e-c5b6865cf141/*"}).then(tabs => {
                tabs.forEach(tab => {
                    browser.tabs.remove(tab.id)
                })
                return Promise.resolve()
            }).then(() => {
                // create new UI tab
                browser.tabs.create({ url: 'UI/index.html' }).then((tab) => {
                    browser.storage.local.set({ ST_UI: tab.id })
                })
            })
        }
        else
        {
            browser.tabs.update(res.ST_UI, { active: true })
        }
    })

    browser.storage.local.get("ST_CONTENT_TABS").then(res => {
        if (res.ST_CONTENT_TABS[0] === browser.tabs.TAB_ID_NONE &&
            res.ST_CONTENT_TABS[1] === browser.tabs.TAB_ID_NONE) 
        {
            LoadContentTabs()
        }
        else if (res.ST_CONTENT_TABS[0] !== browser.tabs.TAB_ID_NONE &&
                 res.ST_CONTENT_TABS[1] !== browser.tabs.TAB_ID_NONE)
        {
            // do nothing
        }
        else
        {
            /* Close content tab */
            res.ST_CONTENT_TABS.forEach(tab => {
                if (tab !== browser.tabs.TAB_ID_NONE)
                {
                    browser.tabs.remove(tab)
                }
            })

            LoadContentTabs()
        }
    })
}


/* Listeners */
browser.tabs.onRemoved.addListener(handleRemoved)
browser.browserAction.onClicked.addListener(handleBrowserClicked)
browser.runtime.onMessage.addListener(handleMessages)


/* Storage API */
browser.storage.local.set({ ST_UI: browser.tabs.TAB_ID_NONE })
browser.storage.local.set({ ST_CART_DATA: {} })
browser.storage.local.set({ ST_STATION_PAIR_DATA: {} })
browser.storage.local.set({ ST_CONTENT_TABS: [browser.tabs.TAB_ID_NONE, browser.tabs.TAB_ID_NONE] })
