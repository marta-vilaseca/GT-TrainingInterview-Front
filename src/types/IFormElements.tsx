import React from 'react';

export interface IFormInputTextProps {
  labelText: string;
  id: string;
  name: string;
  value: string;
  type?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
}

export interface IFormTextareaProps {
  labelText?: string;
  placeholder?: string;
  id: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyPress: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  disabled?: boolean;
}

export interface RadioButtonProps {
  id: string;
  labelText: string;
  name: string;
  value: string;
  checked: boolean;
  className?: string;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface FormSelectProps {
  id: string;
  labelText: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  required?: boolean;
  hidden: boolean;
}

export interface FormButtonProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  id?: string;
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}
