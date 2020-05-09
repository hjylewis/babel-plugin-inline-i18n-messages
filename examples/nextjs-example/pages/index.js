import { IntlProvider, FormattedMessage } from "react-intl";
import { messages } from "./i18n/messages";
import CodeSplitExample from "./CodeSplitExample";

export default function Home() {
  return (
    <IntlProvider locale="en" messages={messages}>
      <div>
        <p>
          <FormattedMessage id="hello" />
        </p>
        <p>
          <FormattedMessage id="sup" />
        </p>
        <CodeSplitExample />
      </div>
    </IntlProvider>
  );
}
