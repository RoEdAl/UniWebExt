# Universal Web Extension - conditional compilation for various web browsers

Conditional compilation based on:

* [Babel](http://babeljs.io/),
* [babel-plugin-conditional-compile](http://www.npmjs.com/package/babel-plugin-conditional-compile) plugin,
* [@babel/plugin-proposal-do-expressions](http://babeljs.io/docs/en/babel-plugin-proposal-do-expressions) plugin.

---

With `babel-plugin-conditional-compile` you can use `BROWSER` *macro*:

* `if .. else if ..`:

  ~~~javascript
  if (BROWSER == "Mozilla") {
      browser.browserAction.onClicked.addListener(on_button_clicked);
      browser.contextMenus.onClicked.addListener(on_context_menu);
  } else if (BROWSER == "Chrome") {
      chrome.browserAction.onClicked.addListener(on_button_clicked);
      chrome.contextMenus.onClicked.addListener(on_context_menu);
  }
  ~~~

* `do` expression:

  ~~~javascript
  create_menu_items = do {
        if (BROWSER == "Mozilla")
            () => menu_items.forEach((e) => browser.contextMenus.create(e))
        else if (BROWSER == "Chrome")
            () => {
                const deep_copy = (e) => JSON.parse(JSON.stringify(e));
                deep_copy(menu_items).forEach((e) => chrome.contextMenus.create(e));
            }
    };
  ~~~

See also:

* [Conditional compilation for JavaScript using Babel](https://www.npmjs.com/package/babel-plugin-conditional-compile).
