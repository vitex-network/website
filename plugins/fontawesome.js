import Vue from 'vue';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';

import faTwitter from '@fortawesome/fontawesome-free-brands/faTwitter';
import faGithub from '@fortawesome/fontawesome-free-brands/faGithub';
import faLinkin from '@fortawesome/fontawesome-free-brands/faLinkedin';
import faDiscord from '@fortawesome/fontawesome-free-brands/faDiscord';
import faTelegram from '@fortawesome/fontawesome-free-brands/faTelegramPlane';
import faReddit from '@fortawesome/fontawesome-free-brands/faReddit';
import faPlusCircle from '@fortawesome/fontawesome-free-solid/faPlusCircle';
import faWechat from '@fortawesome/fontawesome-free-brands/faWeixin';
import faYoutube from '@fortawesome/fontawesome-free-brands/faYoutube';
import faWeibo from '@fortawesome/fontawesome-free-brands/faWeibo';

export default () => {
  library.add(faGithub, faLinkin, faTwitter, faDiscord, faPlusCircle, faTelegram, faReddit, faWechat, faYoutube, faWeibo);

  Vue.component('fa-icon', FontAwesomeIcon);
};
