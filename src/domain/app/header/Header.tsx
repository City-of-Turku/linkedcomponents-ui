import { css } from '@emotion/css';
import classNames from 'classnames';
import { IconSignout, Navigation } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';

import {
  MAIN_CONTENT_ID,
  NAVIGATION_ITEMS,
  PAGE_HEADER_ID,
  ROUTES,
} from '../../../constants';
import useLocale from '../../../hooks/useLocale';
import useSelectLanguage from '../../../hooks/useSelectLanguage';
import { signIn, signOut } from '../../auth/authenticate';
import { authenticatedSelector } from '../../auth/selectors';
import { getEventSearchQuery } from '../../eventSearch/utils';
import useUser from '../../user/hooks/useUser';
import { useTheme } from '../theme/Theme';
import styles from './header.module.scss';

const Header: React.FC = () => {
  const { theme } = useTheme();
  const locale = useLocale();
  const history = useHistory();
  const location = useLocation();
  const { changeLanguage, languageOptions } = useSelectLanguage();

  const { t } = useTranslation();
  const authenticated = useSelector(authenticatedSelector);
  const user = useUser();
  const [menuOpen, setMenuOpen] = React.useState(false);

  const isTabActive = (pathname: string): boolean => {
    return location.pathname.startsWith(pathname);
  };

  const goToHomePage = (e?: Event) => {
    e?.preventDefault();
    goToPage(`/${locale}${ROUTES.HOME}`)();
  };

  const goToPage =
    (pathname: string) => (e?: React.MouseEvent<HTMLAnchorElement>) => {
      e?.preventDefault();
      history.push({ pathname });
      toggleMenu();
    };

  const navigationItems = NAVIGATION_ITEMS.map(({ labelKey, url }) => ({
    label: t(labelKey),
    url: `/${locale}${url}`,
  }));

  const handleSignIn = () => {
    signIn(`${location.pathname}${location.search}`);
  };

  const handleSignOut = (e: React.MouseEvent) => {
    e.preventDefault();
    signOut();
  };

  const hideNavRow = location.pathname.includes(
    `${ROUTES.EDIT_EVENT.replace(':id', '')}`
  );

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSearch = (text: string) => {
    history.push({
      pathname: `/${locale}${ROUTES.SEARCH}`,
      search: getEventSearchQuery({ text }),
    });
  };

  return (
    <Navigation
      id={PAGE_HEADER_ID}
      menuOpen={menuOpen}
      onMenuToggle={toggleMenu}
      menuToggleAriaLabel={t('navigation.menuToggleAriaLabel')}
      skipTo={`#${MAIN_CONTENT_ID}`}
      skipToContentLabel={t('navigation.skipToContentLabel')}
      className={classNames(css(theme.navigation), styles.navigation, {
        [styles.hideNavRow]: hideNavRow,
      })}
      onTitleClick={goToHomePage}
      title={t('appName')}
      titleUrl={`/${locale}${ROUTES.HOME}`}
      logoLanguage={locale === 'sv' ? /* istanbul ignore next */ 'sv' : 'fi'}
    >
      <Navigation.Row>
        {navigationItems.map((item, index) => (
          <Navigation.Item
            key={index}
            active={isTabActive(item.url)}
            className={styles.navigationItem}
            href={item.url}
            label={item.label}
            onClick={goToPage(item.url)}
          />
        ))}
      </Navigation.Row>
      <Navigation.Actions>
        <Navigation.Search
          onSearch={handleSearch}
          searchLabel={t('navigation.searchEvents')}
        />
        {/* USER */}
        <Navigation.User
          authenticated={Boolean(authenticated && user.user)}
          className={classNames(
            styles.userDropdown,
            css(theme.navigationDropdown)
          )}
          label={t('common.signIn')}
          onSignIn={handleSignIn}
          userName={user?.user?.displayName || user?.user?.email}
        >
          <Navigation.Item
            label={t('common.signOut')}
            href="#"
            icon={<IconSignout aria-hidden />}
            variant="supplementary"
            onClick={handleSignOut}
          />
        </Navigation.User>
        <Navigation.LanguageSelector
          buttonAriaLabel={t('navigation.languageSelectorAriaLabel')}
          className={classNames(
            styles.languageSelector,
            css(theme.navigationDropdown)
          )}
          label={t(`navigation.languages.${locale}`)}
        >
          {languageOptions.map((option) => (
            <Navigation.Item
              key={option.value}
              href="#"
              lang={option.value}
              label={option.label}
              onClick={changeLanguage(option)}
            />
          ))}
        </Navigation.LanguageSelector>
      </Navigation.Actions>
    </Navigation>
  );
};

export default Header;
