import React, { useState } from 'react';
import { FormTextarea } from '../common/TextArea';
import Button from '../common/Button';
import { ChatboxProps } from '../../types/IChatTypes';
import './Chatbox.scss';

function Chatbox({ onSubmit, disabled }: ChatboxProps) {
  const [value, setValue] = useState('');

  // Handle text area change
  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    onSubmit(value);
    setValue('');
  };

  // Detect "Enter" key press and submit the form
  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent); // Cast to use existing handleSubmit
    }
  };

  return (
    <form onSubmit={handleSubmit} className="chatbox">
      <FormTextarea
        id="message"
        name="message"
        value={value}
        onChange={handleOnChange}
        onKeyPress={handleKeyPress}
        placeholder="Escribe tu respuesta aquí..."
        disabled={disabled}
      />
      <Button type="submit" disabled={disabled}>
        <span className="material-symbols-outlined button-icon">send</span>
      </Button>
    </form>
  );
}

export default Chatbox;
