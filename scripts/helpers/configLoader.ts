import { SelectorType } from 'cheerio'
import { from } from 'rxjs'

export interface PageElement {
  selector: SelectorType
  type: 'text' | 'images' | 'function'
  function?: string
}

export class ConfigLoader {
  private _configs: Record<string, PageElement>
  constructor(configs: Record<string, PageElement>) {
    this._configs = configs
  }

  toObservable() {
    return from(Object.entries(this._configs))
  }
}
