import './ChatLoader.scss';
import Dora from '../../assets/dora-white.svg';

const ChatLoader = () => {
  return (
    <div className="outer__bubble ia">
      <div className="avatar">
        <img src={Dora} className="avatar__dora" alt="Dora logo" />
      </div>
      <div className="bubble loading">
        <div className="chatloader"></div>
      </div>
    </div>
  );
};

export default ChatLoader;
