import Link from "next/link";
import { FormattedMessage } from "react-intl";

// Just a demonstration of switching a locale, you'll need a better solution
const LinkWithLocale = ({ locale, href, children }) => (
  <Link href={{ pathname: href, query: { locale } }} >
    <a>{children}</a>
  </Link>
);

export default ({ children, locale }) => (
  <>
    <nav>
      <ul>
        <li>
          <LinkWithLocale locale={locale} href="/">
            <FormattedMessage id="nav.home" />
          </LinkWithLocale>
        </li>
        <li>
          <LinkWithLocale locale={locale} href="/about">
            <FormattedMessage id="nav.about" />
          </LinkWithLocale>
        </li>
      </ul>
    </nav>
    {children}
  </>
);
