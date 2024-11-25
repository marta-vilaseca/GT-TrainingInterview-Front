// src/components/chat/ChatCurrentQuestion.tsx
import { useChatStore } from '../../store/chatStore';
import RadioButton from '../common/RadioButton';
import { renderInlineCode } from '../common/renderInlineCode';
import Dora from '../../assets/dora-white.svg';
import './ChatContainer.scss';

const ChatCurrentQuestion = () => {
  const {
    isChatStarted,
    areQuestionsLoading,
    currentQuestion,
    currentAnswers,
    selectedAnswer,
    isSetCompleted,
    handleAnswerChange,
  } = useChatStore();

  return (
    <>
      {/* Current question section */}
      {isChatStarted &&
        currentQuestion &&
        !isSetCompleted &&
        !areQuestionsLoading && (
          <article className="outer__bubble ia">
            <div className="avatar">
              <img src={Dora} className="avatar__dora" alt="Dora logo" />
            </div>
            <div className="bubble current-question">
              <p>
                <strong>{renderInlineCode(currentQuestion.question)}</strong>
              </p>
              <ul>
                {currentAnswers &&
                  currentAnswers.map((answer: string, index: number) => (
                    <li key={['A', 'B', 'C'][index]}>
                      <RadioButton
                        id={`role-${answer.toLowerCase().replace(/\s+/g, '-')}`}
                        labelText={answer}
                        name="role"
                        value={answer}
                        onChange={(e) => handleAnswerChange(e.target.value)}
                        checked={selectedAnswer === answer}
                      />
                    </li>
                  ))}
              </ul>
            </div>
          </article>
        )}
    </>
  );
};

export default ChatCurrentQuestion;
