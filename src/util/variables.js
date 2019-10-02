import browser from 'webextension-polyfill';

const variables = {
  config: {
    default: {
      // variables
    },
    get(key) {
      return browser.runtime
        .sendMessage({
          type: 'get-config',
          key,
        })
        .catch(() =>
          browser.storage.sync
            .get(key)
            .then(v => ({ ...variables.config.default, ...v }[key])),
        );
    },
    set(key, value) {
      browser.runtime.sendMessage({ type: 'set-config', key, value });
    },
    getAll() {
      return Promise.all(
        Object.keys(this.default).map(k => this.get(k).then(v => ({ [k]: v }))),
      ).then(v => v.reduce((a, c) => ({ ...a, ...c })));
    },
  },
};

export default variables;
