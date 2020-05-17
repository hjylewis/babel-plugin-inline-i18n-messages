import { FormattedMessage } from "react-intl";
import CodeSplitExample from "../components/CodeSplitExample";

export default function Home() {
  return (
    <>
      <p>
        <FormattedMessage id="hello" />
      </p>
      <CodeSplitExample />
    </>
  );
}
