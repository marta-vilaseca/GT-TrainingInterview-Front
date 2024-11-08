import React, { useState } from 'react';
import Button from '../common/Button';
import { ControlsBoxProps } from '../../types/IChatTypes';
import { QuestionData2 } from '../../types/IAxios';
import './Chatbox.scss';

function ControlsBox({ onSubmit, disabled, isChatStarted }: ControlsBoxProps) {
  const [value, setValue] = useState('');

  // Load initial question
  const handleStartChat = async () => {
    setLoadingQuestion(true);
    setControlsBoxDisabled(true);
    setIsChatStarted(true);

    const requestData: QuestionData2 = { role, experience, theme: theme || '' };

    try {
      const { question } = await fetchQuestion(requestData);
      setCurrentQuestion(question);
      setShowCurrentQuestion(true);
    } catch (error) {
      console.error('Failed to fetch question:', error);
    } finally {
      setLoadingQuestion(false);
      setControlsBoxDisabled(false);
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    onSubmit(value);
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit} className="chatbox">
      {!isChatStarted && <Button onClick={handleStartChat}>Empecemos</Button>}
      <Button type="submit" disabled={disabled}>
        <span className="material-symbols-outlined button-icon">send</span>
      </Button>
    </form>
  );
}

export default ControlsBox;
