import React from 'react';

import {
  pasteToTextEditor,
  render,
  screen,
  userEvent,
} from '../../../../utils/testUtils';
import TextEditor, { TextEditorProps } from '../TextEditor';

const label = 'Text editor label';

const defaultProps: TextEditorProps = {
  id: 'text-editor-1',
  label,
  onBlur: jest.fn(),
  onChange: jest.fn(),
  value: '',
};

const renderComponent = (props?: Partial<TextEditorProps>) =>
  render(<TextEditor {...defaultProps} {...props} />);

test('should call onChange', async () => {
  // Mock console.error to silence error caused by ckeditor
  // eslint-disable-next-line no-console
  console.error = jest.fn();
  const onChange = jest.fn();
  renderComponent({ onChange });

  const editor = await screen.findByRole('textbox', {
    name: 'Rikas tekstieditori, main',
  });

  pasteToTextEditor(editor, 'test');
  expect(onChange).toBeCalledWith('<p>test</p>');

  const undoButton = screen.getByRole('button', { name: /peru/i });
  userEvent.click(undoButton);
  expect(onChange).toBeCalledWith('');
});
