import browser from 'webextension-polyfill';
import { type, variables } from '@/util';

/*
browser.pageAction.onClicked.addListener(tab => {
  variables.config.getAll().then(config =>
    browser.tabs.sendMessage(tab.id, {
      type: type.click,
      config,
    }),
  );
});
*/

browser.runtime.onMessage.addListener((message, sender) => {
  switch (message.type) {
    case 'load':
      /*
      browser.pageAction.setTitle({
        title: 'jump to the anchored element',
        tabId: sender.tab.id,
      });
      browser.pageAction.setIcon({
        path: '../icons/anchor-selector.svg',
        tabId: sender.tab.id,
      });
      browser.pageAction.show(sender.tab.id);
      */
      break;
    case 'open':
      /*
      Promise.resolve().then(img =>
        browser.pageAction.setIcon({
          imageData: img,
          tabId: sender.tab.id,
        }),
      );
      */
      break;
    case 'close':
      /*
      browser.pageAction.setIcon({
        path: '../icons/anchor-selector.svg',
        tabId: sender.tab.id,
      });
      */
      break;
    case 'get-config':
      return browser.storage.sync
        .get(message.key)
        .then(v => ({ ...variables.config.default, ...v }[message.key]));
    case 'set-config':
      browser.storage.sync.set({ [message.key]: message.value });
      break;
  }
});
