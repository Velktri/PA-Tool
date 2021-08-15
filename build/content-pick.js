function readTable(tableData) 
{
    let table = document.getElementsByTagName('table')[0].children[1]
    let rows = table.getElementsByTagName('tr')

    for (let i = 1; i < rows.length; i++)
    {
        if (rows[i].childNodes.length !== 0) 
        {
            rowData = extractRowData(rows[i])
            
            if (tableData[rowData.stationPair] === undefined)
            {
                tableData[rowData.stationPair] = []
            }
            
            tableData[rowData.stationPair].push({ route: rowData.route, status: rowData.status, progress: rowData.progress })
        }
    }

    return tableData
}

function extractRowData(rowData)
{
    let children = rowData.children

    let stationPair = children[0].children[0].innerHTML
    let route = children[2].children[0].children[0].children[0].innerHTML
    let status = children[3].children[0].children[0].children[0].children[1].innerHTML
    let progress = children[5].children[0].innerHTML

    if (status === "RouteCut") { status = "Route Cut" }

    return { route, stationPair, status, progress }
}

function getNextButton()
{
    let pageBtn = document.getElementsByClassName("css-d38mm5")

    for (let i = 0; i < pageBtn.length; i++) {
        if (pageBtn[i].childNodes[0].childNodes[0].getAttribute("aria-label").slice(6, 10) === "next")
        {
            return pageBtn[i]
        }
    }

    return null
}

function getPrevButton()
{
    let pageBtn = document.getElementsByClassName("css-d38mm5")

    for (let i = 0; i < pageBtn.length; i++) {
        if (pageBtn[i].childNodes[0].childNodes[0].getAttribute("aria-label").slice(6, 10) === "prev")
        {
            return pageBtn[i]
        }
    }

    return null
}

function resetToFirstPage()
{
    let prevBtn = getPrevButton()
    while(prevBtn !== null)
    {
        prevBtn.click()
        prevBtn = getPrevButton()
    }
}

function extractDataFromPages()
{
    let data = readTable({})
    let nextButton = getNextButton()
    while (nextButton !== null)
    {
        nextButton.click()
        data = { ...data, ...readTable(data) }
        nextButton = getNextButton()
    }

    return data
}

function compileData(pickObserver)
{
    if (pickObserver !== undefined) { pickObserver.disconnect() }
    resetToFirstPage()
    return extractDataFromPages()
}

function callback(mutations, pickObserver)
{
    if (mutations[0].target.tagName === 'TBODY')
    {
        setTimeout(function() {
            browser.runtime.sendMessage({ command: 'ST_PICK_DATA', data: compileData(pickObserver) })
        }, 500)
    }
}

if (window.location.hash === '#/pick')
{
    console.log('Pick content script loaded.')

    const pickObserver = new MutationObserver(callback)
    pickObserver.observe(document, { attributes: true, childList: true, subtree: true })
}