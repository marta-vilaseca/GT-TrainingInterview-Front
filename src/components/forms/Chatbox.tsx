import './Chatbox.scss';
import { FormTextarea } from '../common/TextArea';

function Chatbox() {
  const [value, setValue] = '';

  const handleOnChange = () => {
    console.log(value);
  };

  return (
    <>
      <form action="">
        <FormTextarea
          id="message"
          name="message"
          value={value}
          onChange={handleOnChange}
        />
      </form>
    </>
  );
}

export default Chatbox;
