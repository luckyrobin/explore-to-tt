import { Element, CheerioAPI, Cheerio } from 'cheerio'

function getBackgroundImageUrl($element: Cheerio<Element>) {
  const style = $element.attr('style') || '';
  const backgroundUrlMatch = style.match(/url\(["']?([^"')]+)["']?\)/);
  if (backgroundUrlMatch) {
    return backgroundUrlMatch[1];
  }
  return null;
}

export const getSkuImages = (element: Element, $: CheerioAPI) => ({
  name: $(element).find('.prop-name').text(),
  url: getBackgroundImageUrl($(element).find('.prop-img'))
})

export const getSkuImages2 = (element: Element, $: CheerioAPI) => ({
  name: $(element).find('.sku-item-name').text(),
  url: getBackgroundImageUrl($(element).find('.sku-item-image'))
})

export const getOfferItem = (element: Element, $: CheerioAPI) => ({
  name: $(element).find('.offer-attr-item-name').text(),
  value: $(element).find('.offer-attr-item-value').text(),
})