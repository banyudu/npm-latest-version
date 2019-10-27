import * as util from 'util'
import npm from 'npm'

export interface Options {
  registry?: string;
  module: string;
  since?: Date;
}

export interface Result {
  [distTag: string]: {
    version: string;
    time: Date;
  }
}

export default async function npmLatestVersions (options: Options): Promise<Result> {
  return new Promise((resolve, reject) => {
    let npmOptions: any = {}
    if (options.registry) {
      npmOptions.registry = options.registry
    }
    npm.load(npmOptions, () => {
      npm.commands.show([options.module], true, (err, res) => {
        if (err) {
          reject(err)
        } else {
          let versionInfo = res[Object.keys(res)[0]]

          const result: Result = {}

          const distTags = versionInfo['dist-tags']
          for (let tag in distTags) {
            const version = distTags[tag]
            const time = versionInfo.time[version]
            if (time && (!options.since || new Date(time) > new Date(options.since))) {
              result[tag] = {
                version,
                time
              }
            }
          }
          resolve(result)
        }
      })
    })
  })
}
