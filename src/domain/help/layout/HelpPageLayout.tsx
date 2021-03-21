import classNames from 'classnames';
import {
  IconCogwheel,
  IconHome,
  IconLayers,
  IconQuestionCircle,
} from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';

import MainLevel from '../../../common/components/sideNavigation/MainLevel';
import SideNavigation from '../../../common/components/sideNavigation/SideNavigation';
import SubLevel from '../../../common/components/sideNavigation/SubLevel';
import { PAGE_HEADER_ID, ROUTES } from '../../../constants';
import useLocale from '../../../hooks/useLocale';
import useWindowSize from '../../../hooks/useWindowSize';
import Container from '../../app/layout/Container';
import styles from './helpPageLayout.module.scss';

const PAGES_WITH_GRAY_BACKGROUND: string[] = [ROUTES.INSTRUCTIONS_FAQ];
const PAGES_WITH_FULL_WIDTH_CONTENT: string[] = [
  ROUTES.INSTRUCTIONS_FAQ,
  ROUTES.INSTRUCTIONS_PLATFORM,
];

const getSideNavigationTop = (): number => {
  const pageHeader = document.getElementById(PAGE_HEADER_ID);
  return pageHeader?.clientHeight ? pageHeader.clientHeight : 0;
};

interface Props {
  children: React.ReactNode;
}

const HelpPageLayout: React.FC<Props> = ({ children }) => {
  const { t } = useTranslation();
  const [sideNavigationTop, setSideNavigationTop] = React.useState(
    getSideNavigationTop()
  );
  const windowSize = useWindowSize();
  const locale = useLocale();
  const { pathname } = useLocation();

  const getLocalePath = (path: string) => `/${locale}${path}`;

  React.useEffect(() => {
    setSideNavigationTop(getSideNavigationTop());
  }, [windowSize]);

  const getIsActive = (localePath: string) => {
    return pathname === localePath;
  };

  const getBackgroundColorClassName = () => {
    if (
      PAGES_WITH_GRAY_BACKGROUND.includes(pathname.replace(`/${locale}`, ''))
    ) {
      return styles.backgroundGray;
    }
    return styles.backgroundWhite;
  };

  const getContentWidthClassName = () => {
    if (
      PAGES_WITH_FULL_WIDTH_CONTENT.includes(pathname.replace(`/${locale}`, ''))
    ) {
      return styles.contentFullWidth;
    }
    return styles.contentDefault;
  };

  const instructionsSubLevels = [
    {
      label: t('helpPage.sideNavigation.labelPlatform'),
      to: getLocalePath(ROUTES.INSTRUCTIONS_PLATFORM),
    },
    {
      label: t('helpPage.sideNavigation.labelGeneral'),
      to: getLocalePath(ROUTES.INSTRUCTIONS_GENERAL),
    },
    {
      label: t('helpPage.sideNavigation.labelControlPanel'),
      to: getLocalePath(ROUTES.INSTRUCTIONS_CONTROL_PANEL),
    },
    {
      label: t('helpPage.sideNavigation.labelFaq'),
      to: getLocalePath(ROUTES.INSTRUCTIONS_FAQ),
    },
  ];

  const technologySubLevels = [
    {
      label: t('helpPage.sideNavigation.labelGeneral'),
      to: getLocalePath(ROUTES.TECHNOLOGY_GENERAL),
    },
    {
      label: t('helpPage.sideNavigation.labelApi'),
      to: getLocalePath(ROUTES.TECHNOLOGY_API),
    },
    {
      label: t('helpPage.sideNavigation.labelImageRights'),
      to: getLocalePath(ROUTES.TECHNOLOGY_IMAGE_RIGHTS),
    },
    {
      label: t('helpPage.sideNavigation.labelSourceCode'),
      to: getLocalePath(ROUTES.TECHNOLOGY_SOURCE_CODE),
    },
    {
      label: t('helpPage.sideNavigation.labelDocumentation'),
      to: getLocalePath(ROUTES.TECHNOLOGY_DOCUMENTATION),
    },
  ];

  const supportSubLevels = [
    {
      label: t('helpPage.sideNavigation.labelTermsOfUse'),
      to: getLocalePath(ROUTES.SUPPORT_TERMS_OF_USE),
    },
    {
      label: t('helpPage.sideNavigation.labelContact'),
      to: getLocalePath(ROUTES.SUPPORT_CONTACT),
    },
  ];

  const levels = [
    {
      icon: <IconHome />,
      label: t('helpPage.sideNavigation.labelInstructions'),
      subLevels: instructionsSubLevels,
      to: getLocalePath(ROUTES.INSTRUCTIONS),
      type: 'toggle',
    },
    {
      icon: <IconCogwheel />,
      label: t('helpPage.sideNavigation.labelTechnology'),
      subLevels: technologySubLevels,
      to: getLocalePath(ROUTES.TECHNOLOGY),
      type: 'toggle',
    },
    {
      icon: <IconQuestionCircle />,
      label: t('helpPage.sideNavigation.labelSupport'),
      subLevels: supportSubLevels,
      to: getLocalePath(ROUTES.SUPPORT),
      type: 'toggle',
    },
    {
      icon: <IconLayers />,
      label: t('helpPage.sideNavigation.labelFeatures'),
      subLevels: [],
      to: getLocalePath(ROUTES.FEATURES),
      type: 'link',
    },
  ];

  return (
    <div
      className={classNames(
        styles.helpPageWrapper,
        getBackgroundColorClassName()
      )}
    >
      <Container>
        <div className={styles.helpPageLayout}>
          <div className={styles.sideNavigation}>
            <div
              style={{
                maxHeight: `calc(100vh - ${sideNavigationTop}px)`,
                top: sideNavigationTop,
              }}
            >
              <SideNavigation
                toggleButtonLabel={t(
                  'helpPage.sideNavigation.toggleButtonLabel'
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
                        type={type as 'link' | 'toggle'}
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
          <div
            className={classNames(styles.content, getContentWidthClassName())}
          >
            {children}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default HelpPageLayout;
