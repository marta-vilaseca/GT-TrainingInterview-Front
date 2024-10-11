import React, { useState } from 'react';
import { postFeedback, userData } from '../../services/api';
import RadioButton from '../common/RadioButton';
import Dropdown from '../common/SelectDropdown';
import Button from '../common/Button';
import Loader from '../common/Loader';
import './Form.scss';

interface LoginFormData {
  role: string;
  experience: string;
}

const experienceLevels = {
  'Trainee - 0-1 Years': 'Trainee',
  'Junior - 1-2 Years': 'Junior',
  'Semi-Senior - 2-4 Years': 'Semi-Senior',
  'Senior - 4+ Years': 'Senior',
  'Lead - 8+ Years': 'Lead',
};

const roles = ['UX/UI Designer', 'Frontend Developer', 'Backend Developer'];

export default function TempChat() {
  const [formData, setFormData] = useState<LoginFormData>({
    role: '',
    experience: 'Trainee',
  });

  console.log('Current formData:', formData); // Monitor formData changes

  const [question, setQuestion] = useState<string | null>(null); // Question from the backend
  const [userAnswer, setUserAnswer] = useState<string>(''); // User's input answer
  const [submittedAnswer, setSubmittedAnswer] = useState<string>(''); // User's submitted answer
  const [feedback, setFeedback] = useState<string | null>(null); // Feedback message from backend
  const [feedbackStatus, setFeedbackStatus] = useState<
    'success' | 'error' | null
  >(null); // Track feedback status
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false); // Track if form was submitted
  const [isFeedbackReceived, setIsFeedbackReceived] = useState<boolean>(false); // Track if feedback was received

  const [loadingFormSubmit, setLoadingFormSubmit] = useState<boolean>(false); // Loader for the first form
  const [loadingSendAnswer, setLoadingSendAnswer] = useState<boolean>(false); // Loader for sending the answer

  // const handleSubmitForm = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setIsFormSubmitted(true);
  //   setLoadingFormSubmit(true); // Start loader for form submit

  //   try {
  //     const response: string = await userData('/ask', formData); // Fetch the question
  //     setQuestion(response); // Set the question
  //   } catch (error) {
  //     console.error('Error fetching question:', error);
  //   } finally {
  //     setLoadingFormSubmit(false); // Stop loader
  //   }
  // };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted with data:', formData); // Check the formData being submitted
    setIsFormSubmitted(true);
    setLoadingFormSubmit(true);

    try {
      const response: string = await userData('/ask', formData);
      setQuestion(response);
    } catch (error) {
      console.error('Error fetching question:', error);
    } finally {
      setLoadingFormSubmit(false);
    }
  };

  const handleSendAnswer = async () => {
    setLoadingSendAnswer(true); // Start loader for sending answer
    try {
      setSubmittedAnswer(userAnswer); // Store the submitted answer
      const response = await postFeedback('/feedback', {
        answer: userAnswer,
      }); // Assume response is a string (feedback message)

      setFeedback(response); // Set the feedback message
      // Use keyword detection to determine if the feedback indicates an error
      if (
        response.toLowerCase().includes('error') ||
        response.toLowerCase().includes('incorrect')
      ) {
        setFeedbackStatus('error'); // Mark as error
      } else {
        setFeedbackStatus('success'); // Mark as success
      }
      setIsFeedbackReceived(true); // Mark feedback as received
    } catch (error) {
      console.error('Error sending answer:', error);
    } finally {
      setLoadingSendAnswer(false); // Stop loader
    }
  };

  const handleTryAgain = () => {
    // Attempt to resubmit the answer if the feedback was an error
    handleSendAnswer();
  };

  const handleStartOver = () => {
    setIsFormSubmitted(false);
    setQuestion(null);
    setUserAnswer('');
    setSubmittedAnswer('');
    setFeedback(null);
    setFeedbackStatus(null);
    setIsFeedbackReceived(false);
  };

  const handleAskAnotherQuestion = async () => {
    setLoadingFormSubmit(true); // Start loader for fetching a new question
    try {
      const response: string = await userData('/ask', formData); // Fetch a new question
      setQuestion(response); // Set the new question
      setUserAnswer(''); // Reset user answer
      setSubmittedAnswer(''); // Reset submitted answer
      setFeedback(null); // Reset feedback
      setFeedbackStatus(null); // Reset feedback status
      setIsFeedbackReceived(false); // Re-enable input
    } catch (error) {
      console.error('Error fetching new question:', error);
    } finally {
      setLoadingFormSubmit(false); // Stop loader
    }
  };

  return (
    <div className="container">
      {/* Loader for the form submission */}
      {loadingFormSubmit && <Loader />}

      {/* Initial Form for Role and Experience */}
      {!isFormSubmitted && (
        <form className="form" onSubmit={handleSubmitForm}>
          <ul>
            <li>
              <div className="options__radio">
                {roles.map((role) => (
                  <RadioButton
                    key={role}
                    id={`role-${role.toLowerCase().replace(/\s+/g, '-')}`}
                    labelText={role}
                    name="role"
                    value={role}
                    checked={formData.role === role}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value })
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
                  ) || '' // Default to empty string if no match is found
                }
                onChange={(e) => {
                  const fullValue = e.target.value; // Long form selected
                  const shortValue =
                    experienceLevels[
                      fullValue as keyof typeof experienceLevels
                    ]; // Convert to short form
                  setFormData({ ...formData, experience: shortValue }); // Store short form in state
                }}
                options={Object.keys(experienceLevels)} // Display long form options
              />
            </li>
            <li>
              <Button type="submit">Submit</Button>
            </li>
          </ul>
        </form>
      )}

      {/* Question and Answer Section */}
      {isFormSubmitted && question && (
        <div className="question-section">
          <p className="question">{question}</p>

          {!isFeedbackReceived && (
            <div className="answer-section">
              <textarea
                placeholder="Type your answer here..."
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                rows={4}
              />
              <div className="buttons">
                <Button onClick={handleSendAnswer}>Send</Button>
                <Button onClick={handleStartOver}>Start Over</Button>
              </div>
            </div>
          )}

          {/* Display user answer after clicking send */}
          {submittedAnswer && (
            <p className="user-answer">
              <strong>You answered:</strong> {submittedAnswer}
            </p>
          )}

          {/* Loader for sending the answer */}
          {loadingSendAnswer && <Loader />}

          {feedback && (
            <p className="feedback">
              <strong>Feedback:</strong> {feedback}
            </p>
          )}

          {/* Conditional Buttons based on feedback status */}
          {isFeedbackReceived && (
            <div className="buttons">
              {feedbackStatus === 'error' ? (
                <Button onClick={handleTryAgain}>Try Again</Button>
              ) : (
                <Button onClick={handleAskAnotherQuestion}>
                  Ask Another Question
                </Button>
              )}
              <Button onClick={handleStartOver}>Start Over</Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
