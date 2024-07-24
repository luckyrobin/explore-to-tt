import fs from 'fs'
import path from 'path'
import { chromium } from 'playwright'
import { load } from 'cheerio'
import { pageElements, tools } from './configs/page-1688'
import { getContextByTag, parseURL } from './helpers'
import { DownloadQueue } from './helpers/DownloadQueue'

const args = process.argv.slice(2)
const URL = args[0]
const PRODUCT_ID = parseURL(URL).id
const TARGET_DIR = `resources/${PRODUCT_ID}`
// 'https://detail.1688.com/offer/684389879823.html'

const saveResource = async (name: string, resouces: Record<string, any>) => {
  const folderPath = path.resolve(__dirname, `../../${TARGET_DIR}`)
  const filePath = path.join(folderPath, `${name}.json`)

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true })
  }

  fs.writeFileSync(filePath, JSON.stringify(resouces, null, 2), 'utf8')
}

;(async () => {
  const browser = await chromium.launch({ headless: true, slowMo: 50 })
  const context = await browser.newContext({
    storageState: './cache/storage.json',
  })
  const page = await context.newPage()

  await page.goto(URL)

  const content = await page.content()
  const $ = load(content)

  const DETAIL_DATA: Record<string, any> = {}
  const download_queue = new DownloadQueue()
  download_queue.results.subscribe()

  for (const key in pageElements) {
    const ITEM = pageElements[key]
    DETAIL_DATA[key] = []
    $(ITEM.selector).each((index, element) => {
      if (ITEM.type === 'text') {
        DETAIL_DATA[key].push(getContextByTag(element, $))
      }
      if (ITEM.type === 'images') {
        const images_url = getContextByTag(element, $)
        download_queue.addToQueue(images_url, `${TARGET_DIR}/${key}`, `${PRODUCT_ID}-${index}`)
        DETAIL_DATA[key].push(images_url)
      }
      if (ITEM.type === 'function') {
        const obj:any = ITEM.function && tools[ITEM.function](element, $)
        obj?.url && download_queue.addToQueue(obj.url, `${TARGET_DIR}/${key}`, `${PRODUCT_ID}-${obj?.name}`)
        DETAIL_DATA[key].push(obj)
      }
    })
  }

  await saveResource(PRODUCT_ID, DETAIL_DATA)
  await browser.close()
})()
