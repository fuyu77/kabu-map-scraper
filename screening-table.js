module.exports = class ScreeningTable {
  constructor(page) {
    this.page = page
    this.companyCodes = []
  }
  
  // スクリーニング結果の表の証券コードを取得してthis.companyCodesの配列に追加する
  async setCompanyCodes() {
    const companyCodes = await this.page.$$eval('.KM_CODE', (nodes) => nodes.map((node) => node.innerText))
    this.companyCodes.push(...companyCodes)
  }
  
  // ページネーションの次へ進むボタンのElementHandleを取得する
  // 次へボタンが存在しない（ページネーションの終端の）場合、nullを返す
  async setNextButton() {
    this.nextButton = await this.page.$('.KM_TABLEINDEXNEXT')
  }
}
