module.exports = class StockTable {
  constructor(page) {
    this.page = page
    this.companyCodes = []
  }

  async setCompanyCodes() {
    const companyCodes = await this.page.evaluate(() => {
      const cells = Array.from(document.querySelectorAll('.KM_CODE'))
      return cells.map((cell) => cell.innerText)
    })
    this.companyCodes.push(...companyCodes)
  }

  async setNextButton() {
    this.nextButton = await this.page.$(".KM_TABLEINDEXNEXT")
  }
}
