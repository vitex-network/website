import Vue from 'vue';
import numeral from 'numeral';


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
};