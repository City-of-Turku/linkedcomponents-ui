import { IconArrowLeft } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router';

import Button from '../../common/components/button/Button';
import ErrorTemplate from '../../common/components/errorTemplate/ErrorTemplate';
import { ROUTES } from '../../constants';
import useLocale from '../../hooks/useLocale';
import MainContent from '../app/layout/MainContent';
import { signIn } from '../auth/authenticate';
import styles from './notSigned.module.scss';

const NotSignedPage: React.FC = () => {
  const { t } = useTranslation();
  const locale = useLocale();
  const history = useHistory();
  const location = useLocation();

  const goToHome = () => {
    history.push(`/${locale}${ROUTES.HOME}`);
  };

  const handleSignIn = () => {
    signIn(`${location.pathname}${location.search}`);
  };

  return (
    <MainContent>
      <ErrorTemplate
        buttons={
          <div className={styles.buttons}>
            <Button
              fullWidth={true}
              iconLeft={<IconArrowLeft />}
              onClick={goToHome}
              type="button"
              variant="secondary"
            >
              {t('common.goToHome')}
            </Button>
            <Button
              fullWidth={true}
              onClick={handleSignIn}
              type="button"
              variant="primary"
            >
              {t('common.signIn')}
            </Button>
          </div>
        }
        text={t('notSigned.text')}
      />
    </MainContent>
  );
};

export default NotSignedPage;
