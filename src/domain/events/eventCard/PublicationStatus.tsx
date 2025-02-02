import { css } from '@emotion/css';
import classNames from 'classnames';
import capitalize from 'lodash/capitalize';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { PublicationStatus as PublicationStatusEnum } from '../../../generated/graphql';
import { useTheme } from '../../app/theme/Theme';
import styles from './publicationStatus.module.scss';

interface Props {
  publicationStatus: PublicationStatusEnum;
}

const PublicationStatus: React.FC<Props> = ({ publicationStatus }) => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  return (
    <span
      className={classNames(
        styles.publicationStatus,
        css(theme.publicationStatus),
        styles[`status${capitalize(publicationStatus)}`]
      )}
    >
      {t(`event.publicationStatus.${publicationStatus}`)}
    </span>
  );
};

export default PublicationStatus;
