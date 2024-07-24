import { SelectorType } from 'cheerio'
import * as tools from './tools'

interface PageElement {
  selector: SelectorType
  type: 'text' | 'images' | 'function'
  function?: keyof typeof tools
}

export { tools }

export const pageElements: Record<string, PageElement> = {
  title: {
    selector: '.od-pc-offer-title-contain .title-first-column .title-text',
    type: 'text',
  },
  intro_images: {
    selector:
      '.detail-gallery-turn .detail-gallery-turn-wrapper .detail-gallery-img',
    type: 'images',
  },
  sku_images: {
    selector:
      '.pc-sku-wrapper .prop-item-wrapper .prop-item .prop-item-inner-wrapper',
    type: 'function',
    function: 'getSkuImages',
  },
  sku_images2: {
    selector: '.pc-sku-wrapper .sku-module-horizon-list .sku-item-wrapper',
    type: 'function',
    function: 'getSkuImages2',
  },
  specs: {
    selector: '.offer-attr .offer-attr-list .offer-attr-item',
    type: 'function',
    function: 'getOfferItem',
  },
}
