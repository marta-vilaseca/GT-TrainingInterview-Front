import './KnowMoreModal.scss';
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
    <div className="container">
      <div className={`modal ${showModal ? 'visible' : 'hidden'}`}>
        <RxCross1 onClick={onClose} />
        <h3 className="modal__title">¿Qué es Dora?</h3>
        <h3 className="modal__title">¿Cómo te ayuda?</h3>
        <p className="modal__text">
          Dora es tu entrenadora virtual de entrevistas, diseñada para ayudarte
          a destacar en el perfil seleccionado.{' '}
        </p>
        <p className="modal__text">
          Entrena con distintas temáticas acorde a tus necesidades y
          experiencia:
        </p>
        <ul className="modal__text">
          <li>
            Diseño UX/UI: Proceso UX, Personas, Flujos, Arquitectura de
            Información, Accesibilidad, Wireframing.
          </li>
          <li>
            Frontend: HTML, CSS, JavaScript, Frameworks, Control de Versiones.
          </li>
          <li>
            Backend: Bases de Datos, APIs, Arquitecturas, Despliegue, Seguridad.
          </li>
        </ul>
        <p className="modal__text">
          Con cada entrenamiento refuerzas tus habilidades y mejoras tus áreas
          débiles
        </p>
        {children}
      </div>
    </div>
  );
};
export default KnowMoreModal;
