import { operatorName }from '~/services/trade';

class OperatorFetcher {
  constructor() {
    this.symbol2operator = {};
  }

  getOperators(tickers) {
    let symbols = [];
    tickers.forEach(element => {
      if(!this.getOperatorsInCache(element.symbol)){
        symbols.push( element.symbol );
      }
    });
    return operatorName(symbols).then(data=> {
      for(let key in data) {
        this.symbol2operator[key] = data[key];
        
      }  
      return this.symbol2operator;
    });
  }

  getOperatorsInCache(symbol) {
    return this.symbol2operator[symbol];
  }
}

export const operatorFetcher = new OperatorFetcher();
