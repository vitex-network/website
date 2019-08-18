import http from 'http';
import https from 'https';

export default {
  headers: {
    post: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    'X-Requested-With': 'XMLHttpRequest'
  },
  timeout: 10000,
  withCredentials: false,
  responseType: 'json',
  httpAgent: new http.Agent({
    keepAlive: true
  }),
  httpsAgent: new https.Agent({
    keepAlive: true
  })
};
