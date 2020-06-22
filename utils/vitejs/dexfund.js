import {VX_TTI} from "../constant";

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
  
  async getAllTotalVxBalance() {
    return this._client.request('dex_getAllTotalVxBalance');
  }

  async getTotalVxSupply() {
    return this._client.request('mintage_getTokenInfoById', VX_TTI);
  }
}

export default DexFund;
