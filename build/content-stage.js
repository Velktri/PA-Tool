// read page data from table
function readTable(waveData)
{
    let table = document.getElementsByTagName('table')[0].children[1]
    let rows = table.getElementsByTagName('tr')

    for (let i = 1; i < rows.length; i++)
    {
        if (rows[i].childNodes.length !== 0)
        {
            let rowData = extractRowData(rows[i])
            if (waveData[rowData.route] === undefined)
            {
                waveData[rowData.route] = []
            }

            waveData[rowData.route].push({ cartName: rowData.cartName, status: rowData.status, dwellTime: rowData.dwellTime })
        }
    }

    return waveData
}

function extractRowData(rowData)
{
    let children = rowData.children

    let cartName = children[0].children[0].innerHTML
    let stageTime = alignStageTime(children[2].children[0].innerHTML)
    let route = children[1].children[0].textContent
    let dwellTime = children[5].children[0].innerHTML

    let status = children[4].children[0].textContent.trim()
    if (status.slice(0, 3) === "Not") { status = "Not Ready" }

    return { route, stageTime, cartName, status, dwellTime }
}

function alignStageTime(stageTime)
{
    let newStageTime = stageTime
    let stageSplit = stageTime.split(':')

    if (stageSplit[1] !== '20' && stageSplit[1] !== '50')
    {
        newStageTime = stageSplit[0] + ':' + (parseInt(stageSplit[1]) + 15)
    }

    return newStageTime
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
        data = readTable(data)
        nextButton = getNextButton()
    }

    return data
}

function compileData(observer)
{
    if (observer !== undefined) { observer.disconnect() }
    resetToFirstPage()
    return extractDataFromPages()
}

function callback(mutations, observer)
{
    if (mutations[0].target.tagName === 'TBODY')
    {
        setTimeout(function() {
            browser.runtime.sendMessage({ command: 'ST_STAGE_DATA', data: compileData(observer) })
        }, 500)
    }
}

if (window.location.hash === '#/stage')
{
    console.log("Content script for Stage is loaded.")

    const observer = new MutationObserver(callback)
    observer.observe(document, { attributes: true, childList: true, subtree: true })
}