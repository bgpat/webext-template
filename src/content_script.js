import browser from 'webextension-polyfill';
import { type } from '@/util';

browser.runtime.onMessage.addListener(message => {
  switch (message.type) {
    case type.click:
      browser.runtime.sendMessage({ type: 'open' });
      break;
  }
});

browser.runtime.sendMessage({ type: 'load' });
