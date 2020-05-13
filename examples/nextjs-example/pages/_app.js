import { IntlProvider } from "react-intl";
import { getMessages } from "../i18n/addMessages";
import Layout from "../components/Layout";
import Router from "next/router";
import { useRouter } from "next/router";

export default function MyApp({ Component, pageProps }) {

  // Just a demonstration of switching a locale, you'll need a better solution
  const router = useRouter();

  let {
    query: { locale },
    route,
  } = router;

  if (!locale) locale = "en";

  return (
    <>
      <div>
        <label htmlFor="locale-select">Change language: </label>
        <select
          value={locale}
          id="locale-select"
          onChange={(e) =>
            Router.push({ pathname: route, query: { locale: e.target.value } })
          }
        >
          <option value="en">English</option>
          <option value="es">Español</option>
        </select>
      </div>
      <IntlProvider locale={locale} messages={getMessages(locale)}>
        <Layout locale={locale}>
          <Component {...pageProps} />
        </Layout>
      </IntlProvider>
    </>
  );
}