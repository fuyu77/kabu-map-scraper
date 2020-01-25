const puppeteer = require('puppeteer')
const fs = require('fs')
const StockTable = require('./stock-table.js')

;(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(process.argv[2])
  const stockTable = new StockTable(page)
  // スクリーニング結果の表のページネーションの最初のページをスクレイピングする
  await stockTable.setCompanyCodes()
  await stockTable.setNextButton()
  // ページネーションの次へ進むボタンが消える最終ページまで各ページをスクレイピングする
  while (stockTable.nextButton) {
    await stockTable.nextButton.click()
    await stockTable.setCompanyCodes()
    await stockTable.setNextButton()
  }
  await browser.close()
  console.log(stockTable.companyCodes)
  const ngCompanyCodes = fs.readFileSync(process.argv[3], 'utf8').split('\n')
  console.log(ngCompanyCodes)
  const recommendedCompanyCodes = stockTable.companyCodes.filter((code) => !ngCompanyCodes.includes(code))
  console.log(recommendedCompanyCodes)
})()
