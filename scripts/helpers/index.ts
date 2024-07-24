import fs from 'fs'
import path from 'path'
import { Element, CheerioAPI } from 'cheerio'
import axios from 'axios'

export const getContextByTag = (element: Element, $: CheerioAPI) => {
  switch (element.tagName) {
    case 'img':
      return $(element).attr('src') || ''
    case 'a':
      return $(element).attr('href') || ''
    default:
      return $(element).text()
  }
}

export async function downloadImage(url: string, filepath: string) {
  const directory = path.dirname(filepath)
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true })
  }

  const writer = fs.createWriteStream(filepath)

  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream',
  })

  response.data.pipe(writer)

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve)
    writer.on('error', reject)
  })
}

export const parseURL = (url: string) => {
  const extension = path.basename(url)
  return {
    id: extension.split('.')[0],
    ext: extension.split('.')[1],
  }
}
