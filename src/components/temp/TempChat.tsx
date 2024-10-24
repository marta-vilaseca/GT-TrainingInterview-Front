import React, { useState } from 'react';
import { userData } from '../../services/api'; // Only need this endpoint for now
import { UserResponseData } from '../../types/IAxios';
import RadioButton from '../common/RadioButton';
import Dropdown from '../common/SelectDropdown';
import Button from '../common/Button';
import Loader from '../common/Loader';
import './Form.scss';

// Constants for experience levels and roles
const experienceLevels = {
  'Trainee - 0-1 Years': 'Trainee',
  'Junior - 1-2 Years': 'Junior',
  'Semi-Senior - 2-4 Years': 'Semi-Senior',
  'Senior - 4+ Years': 'Senior',
  'Lead - 8+ Years': 'Lead',
};

const roles = {
  'UX/UI Designer': 'diseñador ux/ui',
  'Frontend Developer': 'frontend',
  'Backend Developer': 'backend',
};

export default function TempChat() {
  const [formData, setFormData] = useState({
    role: '',
    experience: 'Trainee',
  });

  const [responseData, setResponseData] = useState<UserResponseData | null>(
    null
  ); // Store the backend response
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [submittedAnswer, setSubmittedAnswer] = useState<string>('');
  const [loadingState, setLoadingState] = useState({
    formSubmit: false,
    sendAnswer: false,
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);

  // Form submission handler: send role and experience to backend
  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingState((prev) => ({ ...prev, formSubmit: true }));

    try {
      const response: UserResponseData = await userData('/ask', formData);
      setResponseData(response);
      setIsFormSubmitted(true);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoadingState((prev) => ({ ...prev, formSubmit: false }));
    }
  };

  // TEMP - Handle the submission of the user's answer
  const handleSendAnswer = () => {
    setLoadingState((prev) => ({ ...prev, sendAnswer: true }));
    setSubmittedAnswer(userAnswer);

    // Add a delay before showing feedback, to simulate the backend time response
    setTimeout(() => {
      setIsAnswerSubmitted(true);
      setLoadingState((prev) => ({ ...prev, sendAnswer: false }));
    }, 2000);
  };

  // Reset everything
  const handleStartOver = () => {
    setIsFormSubmitted(false);
    setResponseData(null);
    setUserAnswer('');
    setSubmittedAnswer('');
    setIsAnswerSubmitted(false);
  };

  // Render the (temporary) feedback
  const renderFeedback = () => {
    if (!isAnswerSubmitted || !responseData?.feedback) return null;

    return (
      <p className="feedback">
        <strong>Feedback:</strong> {responseData.feedback}
      </p>
    );
  };

  return (
    <div className="container">
      {/* Initial Form for Role and Experience */}
      {!isFormSubmitted && (
        <form className="form" onSubmit={handleSubmitForm}>
          <ul>
            <li>
              <div className="options__radio">
                {Object.keys(roles).map((roleLabel) => (
                  <RadioButton
                    key={roleLabel}
                    id={`role-${roleLabel.toLowerCase().replace(/\s+/g, '-')}`}
                    labelText={roleLabel}
                    name="role"
                    value={roles[roleLabel as keyof typeof roles]} // Use short form value
                    checked={
                      formData.role === roles[roleLabel as keyof typeof roles]
                    } // Compare short form
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setFormData({
                        ...formData,
                        role: e.target.value as keyof typeof roles,
                      })
                    }
                  />
                ))}
              </div>
            </li>
            <li>
              <Dropdown
                id="experienceLevel"
                labelText="Experience Level"
                name="experienceLevel"
                value={
                  Object.keys(experienceLevels).find(
                    (key) =>
                      experienceLevels[key as keyof typeof experienceLevels] ===
                      formData.experience
                  ) || ''
                }
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  const fullValue = e.target.value;
                  const shortValue =
                    experienceLevels[
                      fullValue as keyof typeof experienceLevels
                    ];
                  setFormData({ ...formData, experience: shortValue });
                }}
                options={Object.keys(experienceLevels)}
              />
            </li>
            <li>
              <Button type="submit">Submit</Button>
            </li>
          </ul>
        </form>
      )}

      {/* Loader for the form submission */}
      {loadingState.formSubmit && <Loader />}

      {/* Question and Answer Section */}
      {isFormSubmitted && responseData && (
        <div className="question-section">
          {/* Render the prompt */}
          <p className="question">{responseData.prompt}</p>
          {/* Show input form if no answer has been submitted yet */}
          {!isAnswerSubmitted && (
            <div className="answer-section">
              <textarea
                placeholder="Type your answer here..."
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                rows={4}
              />
              <div className="buttons">
                <Button
                  onClick={handleSendAnswer}
                  disabled={loadingState.sendAnswer}
                >
                  Send
                </Button>
                <Button onClick={handleStartOver}>Start Over</Button>
              </div>
            </div>
          )}
          {/* Display the user's answer after submission */}
          {submittedAnswer && (
            <p className="user-answer">
              <strong>You answered:</strong> {submittedAnswer}
            </p>
          )}
          {loadingState.sendAnswer && <Loader />}{' '}
          {/* Render the feedback after the delay */}
          {renderFeedback()}
          {isAnswerSubmitted && (
            <div className="buttons">
              <Button onClick={handleStartOver}>Start Over</Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
