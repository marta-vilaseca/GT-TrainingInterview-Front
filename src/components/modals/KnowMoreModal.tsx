import './KnowMoreModal.scss';
import Button from '../common/Button';
import { RxCross1 } from 'react-icons/rx';

type propTypes = {
  showModal: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const KnowMoreModal: React.FC<propTypes> = ({
  showModal,
  onClose,
  children,
}) => {
  return (
    <div className={`container ${showModal ? 'visible' : 'hidden'}`}>
      <div className="background"></div>
      <div className="modal">
        <div className="modal__container">
          <RxCross1 className="modal__cross" onClick={onClose} />
          <h3 className="modal__title">¿Qué es Dora?</h3>
          <h3 className="modal__title">¿Cómo te ayuda?</h3>
          <p className="modal__text">
            Dora es tu <b>entrenadora virtual de entrevistas</b>, diseñada para
            ayudarte a destacar en el perfil seleccionado.
          </p>
          <p className="modal__text">
            Entrena con distintas temáticas acorde a tus necesidades y
            experiencia:
          </p>
          <ul className="modal__text">
            <li className="modal__text__list">
              <b>Diseño UX/UI:</b> Proceso UX, Personas, Flujos, Arquitectura de
              Información, Accesibilidad, Wireframing.
            </li>
            <li className="modal__text__list">
              <b>Frontend:</b> HTML, CSS, JavaScript, Frameworks, Control de
              Versiones.
            </li>
            <li className="modal__text__list">
              <b>Backend:</b> Bases de Datos, APIs, Arquitecturas, Despliegue,
              Seguridad.
            </li>
          </ul>
          <Button className="modal__button" onClick={onClose}>
            Cerrar ayuda
          </Button>
          {children}
        </div>
      </div>
    </div>
  );
};
export default KnowMoreModal;
