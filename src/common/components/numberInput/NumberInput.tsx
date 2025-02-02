import { css } from '@emotion/css';
import classNames from 'classnames';
import { NumberInput as HdsNumberInput, NumberInputProps } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { useTheme } from '../../../domain/app/theme/Theme';
import styles from './numberInput.module.scss';

const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      className,
      minusStepButtonAriaLabel,
      plusStepButtonAriaLabel,
      step,
      ...props
    },
    ref
  ) => {
    const { theme } = useTheme();
    const { t } = useTranslation();

    return (
      <HdsNumberInput
        {...props}
        ref={ref}
        className={classNames(
          className,
          styles.numberInput,
          css(theme.textEditor)
        )}
        minusStepButtonAriaLabel={
          minusStepButtonAriaLabel || t('common.numberInput.buttonDecrease')
        }
        plusStepButtonAriaLabel={
          plusStepButtonAriaLabel || t('common.numberInput.buttonIncrease')
        }
        step={step || 1}
      />
    );
  }
);

export default NumberInput;
