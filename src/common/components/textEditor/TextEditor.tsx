import '@ckeditor/ckeditor5-build-classic/build/translations/fi';
import '@ckeditor/ckeditor5-build-classic/build/translations/sv';
import './ckeditor.scss';

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import classNames from 'classnames';
import { css } from 'emotion';
import React from 'react';

import { useTheme } from '../../../domain/app/theme/Theme';
import useLocale from '../../../hooks/useLocale';
import InputWrapper, { InputWrapperProps } from '../inputWrapper/InputWrapper';
import styles from './textEditor.module.scss';

export type TextEditorProps = {
  disabled?: boolean;
  label: string;
  onBlur?: () => void;
  onChange: (value: string) => void;
  placeholder?: string;
  value: string;
} & InputWrapperProps;

const TextEditor: React.FC<TextEditorProps> = ({
  className,
  disabled,
  errorText,
  helperText,
  hideLabel,
  id,
  invalid,
  label,
  labelText,
  onBlur,
  onChange,
  placeholder,
  required,
  style,
  tooltipButtonLabel,
  tooltipLabel,
  tooltipText,
  value,
}) => {
  const editor = React.useRef<any>(null);
  const locale = useLocale();
  const { theme } = useTheme();

  const wrapperProps = {
    className,
    disabled,
    errorText,
    hasIcon: false,
    helperText,
    hideLabel,
    id,
    invalid,
    label,
    labelText,
    required,
    style,
    tooltipButtonLabel,
    tooltipLabel,
    tooltipText,
  };

  const setFocusToEditor = () => {
    editor.current?.editing?.view?.focus();
  };

  return (
    <div
      className={classNames(
        'text-editor',
        { invalid: invalid },
        styles.textEditor,
        css(theme.textEditor)
      )}
      id={`${id}-text-editor`}
      onClick={setFocusToEditor}
    >
      <InputWrapper {...wrapperProps} className={styles.inputWrapper}>
        <CKEditor
          key={locale}
          editor={ClassicEditor}
          config={{
            heading: {
              options: [
                {
                  model: 'paragraph',
                  title: 'Paragraph',
                  class: 'ck-heading_paragraph',
                },
                {
                  model: 'heading1',
                  view: 'h1',
                  title: 'Heading 1',
                  class: 'ck-heading_heading1',
                },
                {
                  model: 'heading2',
                  view: 'h2',
                  title: 'Heading 2',
                  class: 'ck-heading_heading2',
                },
                {
                  model: 'heading23',
                  view: 'h3',
                  title: 'Heading 3',
                  class: 'ck-heading_heading3',
                },
                {
                  model: 'heading4',
                  view: 'h4',
                  title: 'Heading 4',
                  class: 'ck-heading_heading4',
                },
                {
                  model: 'heading5',
                  view: 'h5',
                  title: 'Heading 5',
                  class: 'ck-heading_heading5',
                },
                {
                  model: 'heading6',
                  view: 'h6',
                  title: 'Heading 6',
                  class: 'ck-heading_heading6',
                },
              ],
            },
            language: locale,
            placeholder,
            toolbar: {
              items: [
                'heading',
                '|',
                'bold',
                'italic',
                'link',
                '|',
                'bulletedList',
                'numberedList',
                '|',
                'insertTable',
                '-',
                'undo',
                'redo',
              ],
              shouldNotGroupWhenFull: true,
            },
          }}
          data={value}
          onBlur={() => {
            onBlur && onBlur();
          }}
          onChange={(event: any, editor: typeof CKEditor) => {
            const data = editor.getData();
            onChange(data);
          }}
          onReady={(instance: typeof CKEditor) => {
            editor.current = instance;
          }}
        />
      </InputWrapper>
    </div>
  );
};

export default TextEditor;
