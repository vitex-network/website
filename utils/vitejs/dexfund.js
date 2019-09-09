class DexFund {
  constructor(client) {
    this._client = client;
  }
    
  async getCurrentVxMineInfo() {
    return this._client.request('dexfund_getCurrentVxMineInfo');
  }

  async getCurrentFeesForMine() {
    return this._client.request('dexfund_getCurrentFeesForMine');
  }

  async getCurrentPledgeForVxSum() {
    return this._client.request('dexfund_getCurrentPledgeForVxSum');
  }

  async getCurrentDividendPools() {
    return this._client.request('dexfund_getCurrentDividendPools');
  }  
}

export default DexFund;
