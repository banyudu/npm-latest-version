# npm-latest-version
Check npm latest versions

## Type definition
```typescript
export interface Options {
    registry?: string;
    module: string;
    since?: Date;
}
export interface Result {
    [distTag: string]: {
        version: string;
        time: Date;
    };
}
export default function npmLatestVersions(options: Options): Promise<Result>
```
## Usage

```typescript
import npmLatestVersions from 'npm-latest-versions'

(async () => {
  const versions = await npmLatestVersions({
    module: 'express',
    since: new Date('2019/01/01')
  })
  // => { latest: { version: '4.17.1', time: '2019-05-26T04:25:34.606Z' } }
})()
```
