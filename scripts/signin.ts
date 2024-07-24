import { chromium } from 'playwright'

;(async () => {
  // Setup
  const browser = await chromium.launch({ headless: false, slowMo: 50 })
  const context = await browser.newContext()
  const page = await context.newPage()

  await page.goto('https://www.1688.com')
  // Teardown
  await new Promise((resolve) => setTimeout(resolve, 60 * 1000))

  await context.storageState({ path: './cache/storage.json' })

  await browser.close()
})()
