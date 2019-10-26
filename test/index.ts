import * as assert from 'power-assert'
import npmLatestVersion from '../index'

(async () => {
  const result = await npmLatestVersion({
    module: 'express',
    since: new Date('2019/01/01')
  })
  console.log('result is: ', result)
})()
