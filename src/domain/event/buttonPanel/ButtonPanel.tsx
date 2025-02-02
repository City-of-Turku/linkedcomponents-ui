import { useField } from 'formik';
import { IconCheck, IconPen } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import Button from '../../../common/components/button/Button';
import LoadingSpinner from '../../../common/components/loadingSpinner/LoadingSpinner';
import { PublicationStatus } from '../../../generated/graphql';
import Container from '../../app/layout/Container';
import { authenticatedSelector } from '../../auth/selectors';
import useUser from '../../user/hooks/useUser';
import { EVENT_CREATE_ACTIONS, EVENT_FIELDS } from '../constants';
import {
  getCreateEventButtonWarning,
  isCreateEventButtonVisible,
} from '../utils';
import styles from './buttonPanel.module.scss';

interface Props {
  onSaveDraft: () => void;
  publisher: string;
  saving: PublicationStatus | null;
}

const ButtonPanel: React.FC<Props> = ({ onSaveDraft, publisher, saving }) => {
  const { user } = useUser();
  const { t } = useTranslation();
  const [{ value: type }] = useField({ name: EVENT_FIELDS.TYPE });
  const authenticated = useSelector(authenticatedSelector);

  const isEventButtonVisible = (action: EVENT_CREATE_ACTIONS) => {
    return isCreateEventButtonVisible({
      action,
      authenticated,
      publisher,
      user,
    });
  };

  const getButtonWarning = (action: EVENT_CREATE_ACTIONS) => {
    return getCreateEventButtonWarning({
      action,
      authenticated,
      publisher,
      t,
      user,
    });
  };

  const createWarning = getButtonWarning(EVENT_CREATE_ACTIONS.CREATE_DRAFT);
  const publishWarning = getButtonWarning(EVENT_CREATE_ACTIONS.PUBLISH);

  return (
    <div className={styles.buttonPanel}>
      <Container withOffset={true}>
        <div className={styles.buttonsRow}>
          {isEventButtonVisible(EVENT_CREATE_ACTIONS.CREATE_DRAFT) && (
            <div className={styles.buttonColumn}>
              <Button
                disabled={Boolean(createWarning)}
                fullWidth={true}
                iconLeft={
                  saving === PublicationStatus.Draft ? (
                    <LoadingSpinner
                      className={styles.loadingSpinner}
                      isLoading={true}
                      small={true}
                    />
                  ) : (
                    <IconPen />
                  )
                }
                onClick={onSaveDraft}
                title={createWarning}
                type="button"
                variant="secondary"
              >
                {t('event.form.buttonSaveDraft')}
              </Button>
            </div>
          )}
          {isEventButtonVisible(EVENT_CREATE_ACTIONS.PUBLISH) && (
            <div className={styles.buttonColumn}>
              <Button
                disabled={Boolean(publishWarning || saving)}
                fullWidth={true}
                iconLeft={
                  saving === PublicationStatus.Public ? (
                    <LoadingSpinner
                      className={styles.loadingSpinner}
                      isLoading={true}
                      small={true}
                    />
                  ) : (
                    <IconCheck />
                  )
                }
                title={publishWarning}
                type="submit"
              >
                {t(`event.form.buttonPublish.${type}`)}
              </Button>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default ButtonPanel;
