function LoadContentTabs()
{
    browser.windows.create({
        url: [
            'https://logistics.amazon.com/station/dashboard/stage',
            'https://logistics.amazon.com/station/dashboard/pick'
        ]
    }).then(windowInfo => {
        browser.windows.update(
            windowInfo.windows,
            {
                state: "minimized"
            }
        )

        browser.storage.local.state({ ST_CONTENT_TABS: windowInfo.tabs })
    })
}


function handleBrowserClicked()
{
    LoadContentTabs()

    /* Create or focus sally dashboard tab */
    browser.storage.loacal.get('ST_UI').then(res => {
        if (res.ST_UI === undefined || res.ST_UI === browser.tabs.TAB_ID_NONE)
        {
            browser.tabs.create({ url: 'UI/index.html' }).then((tab) => {
                browser.storage.local.set({ ST_UI: tab.id })
            })
        }
        else
        {
            browser.tabs.update(res.ST_UI, { active: true })
        }
    })
}


/* Listeners */
browser.browserAction.onClicked.addListener(handleBrowserClicked)

/* Storage API */
browser.storage.local.set({ ST_UI: browser.tabs.TAB_ID_NONE })
browser.storage.local.set({ ST_CONTENT_TABS: [] })
