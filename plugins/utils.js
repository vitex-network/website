import Vue from 'vue';
import numeral from 'numeral';
import BigNumber from '~/utils/bigNumber';


export default () => {
  Vue.filter('percent', function (val) {
    let num = Number(val);
    if (isNaN(num)) {
      return '';
    }

    let str = numeral(num).format('0.00 %');
    if (num > 0) {
      str = '+' + str;
    }
    return str;
  });

  Vue.filter('vxFormat', function (val, placeholder = '--') {
    return BigNumber.originFormat(val, 18, 2) || placeholder;
  });

  Vue.filter('formatTradeSymbol', function(val) {
    if (!val) return val;
    let arr = val.split('_');
    arr = arr.map(item => item.split('-')[0]);
    return arr.join('/');
  });
};