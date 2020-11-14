/**
 * @external {Page} https://pptr.dev/#?product=Puppeteer&version=v1.7.0&show=api-class-page
 * @param {Page} page
 * @return {Promise<void>}
 */
 
const fileNamify = require('filenamify-url')
const fse = require('fs-extra')
const moment = require('moment')
const path = require('path')

module.exports = async function (page, outputDir) {
  const output = path.join(outputDir, fileNamify(page.url(), {replacement: '_'}) + '-' + moment().format('MM-DD-YYYY_x') + '.png')
  const pageHeight = await page.$eval('body', body => body.clientHeight)
  
  fse.ensureFileSync(output)

  if(pageHeight < 16300) {
    await page.screenshot({ path: output, fullPage: true });
  } else {
    await page.evaluate(() => { window.scrollTo(0, 0); })
    await page.screenshot({ path: output });
  }
}
