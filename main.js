const puppeteer = require('puppeteer')
const fs = require('fs')
const ScreeningTable = require('./screening-table.js')

;(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(process.argv[2])
  const screeningTable = new ScreeningTable(page)
  // スクリーニング結果の表のページネーションの最初のページをスクレイピングする
  await screeningTable.setCompanyCodes()
  await screeningTable.setNextButton()
  // ページネーションの次へ進むボタンが消える最終ページまで各ページをスクレイピングする
  while (screeningTable.nextButton) {
    await screeningTable.nextButton.click()
    await screeningTable.setCompanyCodes()
    await screeningTable.setNextButton()
  }
  await browser.close()
  console.log(screeningTable.companyCodes)
  const ngCompanyCodes = fs.readFileSync(process.argv[3], 'utf8').split('\n')
  console.log(ngCompanyCodes)
  const recommendedCompanyCodes = screeningTable.companyCodes.filter((code) => !ngCompanyCodes.includes(code))
  console.log(recommendedCompanyCodes)
})()
