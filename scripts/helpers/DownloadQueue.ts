import path from 'path'
import { Subject, map, mergeAll, from, Observable } from 'rxjs'
import { downloadImage } from './index'
import { parseURL } from '../helpers'

interface Payload {
  url: string
  outputFolder: string,
  customFilename?: string
}

export class DownloadQueue {
  private downloadQueue$: Subject<Payload> = new Subject()
  public results: Observable<any>
  constructor() {
    this.results = this.downloadQueue$.pipe(
      map((payload) => {
        const { url, outputFolder, customFilename } = payload
        const filename = customFilename ? `${customFilename}.${parseURL(url).ext}` : path.basename(url)
        const filepath = path.join(outputFolder, filename)
        return from(downloadImage(url, filepath))
      }),
      mergeAll(5),
    )
  }

  addToQueue(url: string, outputFolder: string, customFilename?: string) {
    this.downloadQueue$.next({ url, outputFolder, customFilename })
  }
}
