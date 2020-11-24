// eslint-disable-next-line no-undef
__webpack_public_path__ = `/${window.__intl_locale}/`;

import React from "react";
import ReactDOM from "react-dom";
import { IntlProvider, FormattedMessage } from "react-intl";
import { messages } from "./i18n/messages";
import { getLocale } from "./i18n/getLocale";
import CodeSplitExample from "./CodeSplitExample";

import LocaleSwitcher from "./LocaleSwitcher";

var root = document.createElement("div");
root.id = "root";
document.body.appendChild(root);

ReactDOM.render(
  <React.StrictMode>
    <LocaleSwitcher />
    <IntlProvider locale={getLocale()} messages={messages}>
      <p>
        <FormattedMessage id="hello" />
      </p>
      <p>
        <FormattedMessage id="sup" />
      </p>
      <CodeSplitExample />
    </IntlProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
