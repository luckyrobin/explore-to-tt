import { describe, expect, it, beforeAll } from '@jest/globals'

import { ConfigLoader } from '../configLoader'

describe('Initital the ConfigLoader', () => {
  let configLoader: ConfigLoader
  const elements: any = {
    title: {
      selector: '.title',
      type: 'text',
    },
    image: {
      selector: '.image',
      type: 'images',
    },
  }

  beforeAll(() => {
    configLoader = new ConfigLoader(elements)
  })

  it('#ConfigLoader', () => {
    expect(configLoader).toBeInstanceOf(ConfigLoader)
  })
})
