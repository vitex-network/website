import WS_RPC from '@vite/vitejs-ws';
import client  from '@vite/vitejs-client';
import DexFund from './dexfund';


// let env = process.env.CONTRACT_ENV;

const goViteServer = {
  production: 'wss://api.vitewallet.com/ws',
  test: 'wss://premainnet.vitewallet.com/test/ws',
  dev: 'wss://premainnet.vitewallet.com/test/ws'
};

// let serverUrl = env === 'production' ? goViteServer.production : goViteServer.test;

let provider = new WS_RPC(goViteServer.production);
let myClient = new client(provider);


let dexFund = new DexFund(myClient);

export { dexFund };