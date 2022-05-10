import { IconHome } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';

import MainLevel from '../../../common/components/sideNavigation/MainLevel';
import SideNavigation from '../../../common/components/sideNavigation/SideNavigation';
import SubLevel from '../../../common/components/sideNavigation/SubLevel';
import { ROUTES } from '../../../constants';
import useLocale from '../../../hooks/useLocale';
import useWindowSize from '../../../hooks/useWindowSize';
import getPageHeaderHeight from '../../../utils/getPageHeaderHeight';
import Container from '../../app/layout/Container';
import MainContent from '../../app/layout/MainContent';
import styles from './adminPageLayout.module.scss';

interface Props {
  children: React.ReactNode;
}

const AdminPageLayout: React.FC<Props> = ({ children }) => {
  const { t } = useTranslation();
  const [sideNavigationTop, setSideNavigationTop] = React.useState(
    getPageHeaderHeight()
  );
  const windowSize = useWindowSize();
  const locale = useLocale();
  const { pathname } = useLocation();

  const getLocalePath = (path: string) => `/${locale}${path}`;

  React.useEffect(() => {
    setSideNavigationTop(getPageHeaderHeight());
  }, [windowSize]);

  const getIsActive = (localePath: string) => {
    return pathname === localePath;
  };

  const administrationSubLevels = [
    {
      label: t('adminPage.sideNavigation.organizations'),
      to: getLocalePath(ROUTES.ADMIN_ORGANIZATIONS),
    },
    {
      label: t('adminPage.sideNavigation.users'),
      to: getLocalePath(ROUTES.ADMIN_USERS),
    },
  ];

  const levels = [
    {
      icon: <IconHome />,
      label: t('adminPage.sideNavigation.administration'),
      subLevels: administrationSubLevels,
      to: getLocalePath(ROUTES.ADMIN),
      type: 'toggle',
    },
  ];

  return (
    <div className={styles.adminPageWrapper}>
      <Container>
        <div className={styles.adminPageLayout}>
          <div className={styles.sideNavigation}>
            <div style={{ top: sideNavigationTop }}>
              <SideNavigation
                toggleButtonLabel={t(
                  'adminPage.sideNavigation.toggleButtonLabel'
                )}
              >
                {levels.map(
                  ({ icon, label, subLevels, to, type }, mainLevelIndex) => {
                    return (
                      <MainLevel
                        key={mainLevelIndex}
                        active={getIsActive(to)}
                        icon={icon}
                        label={label}
                        to={to}
                      >
                        {subLevels?.map((props, subLevelIndex) => {
                          return (
                            <SubLevel
                              key={subLevelIndex}
                              {...props}
                              active={getIsActive(props.to)}
                            />
                          );
                        })}
                      </MainLevel>
                    );
                  }
                )}
              </SideNavigation>
            </div>
          </div>
          <div className={styles.content}>
            <MainContent>{children}</MainContent>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AdminPageLayout;
