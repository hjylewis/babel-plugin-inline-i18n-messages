import React, { useReducer } from "react";
import dynamic from "next/dynamic";
import { FormattedMessage } from 'react-intl'

const OtherComponent = dynamic({
  loader: () => import("./OtherComponent"),
  loading: () => "Loading...",
});

export default () => {
  const [load, toggle] = useReducer((load) => !load, false);

  if (!load) {
    return <button onClick={toggle}><FormattedMessage id="lazy" /></button>;
  } else {
    return <OtherComponent />;
  }
};
