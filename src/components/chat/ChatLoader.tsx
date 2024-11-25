import Dora from '../../assets/dora-white.svg';
import './ChatLoader.scss';

const ChatLoader = () => {
  return (
    <article className="outer__bubble ia">
      <div className="avatar">
        <img src={Dora} className="avatar__dora" alt="Dora logo" />
      </div>
      <div className="bubble loading">
        <div className="chatloader"></div>
      </div>
    </article>
  );
};

export default ChatLoader;
