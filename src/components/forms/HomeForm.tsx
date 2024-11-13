import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dropdown from '../common/SelectDropdown';
import Button from '../common/Button';
import Loader from '../common/Loader';
import './HomeForm.scss';

import {
  experienceLevels,
  roles,
  themes,
  RoleType,
} from '../../utils/constants';

function HomeForm() {
  const navigate = useNavigate();
  const [homeFormData, setHomeFormData] = useState({
    name: '',
    role: '',
    experience: '',
    theme: 'General',
  });
  const [loadingState, setLoadingState] = useState(false);

  const [formErrors, setFormErrors] = useState({
    experienceLevel: '',
    role: '',
    name: '',
  });

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    // Verificar si hay errores en el formulario antes de enviar
    if (Object.values(formErrors).some((error) => error !== '')) {
      // Si hay algún error, no enviar el formulario
      return;
    }

    setLoadingState(true);

    // Ensure theme is set as empty if none is chosen
    const formData = {
      ...homeFormData,
      theme: homeFormData.theme || 'General',
    };

    // Navigate to /chat and pass the form data as state
    navigate('/chat', { state: formData });
  };

  const handleCancel = (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingState(true);

    // Clear form data if needed
    setHomeFormData({
      name: '',
      role: '',
      experience: '',
      theme: 'General',
    });

    // Navigate to home
    navigate('/');
  };

  const handleClickConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    var hasErrors = false;
    if (!homeFormData.name || homeFormData.name === '') {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        name: 'Completa este campo para continuar.',
      }));
      hasErrors = true;
    } else {
      setFormErrors((prevErrors) => ({ ...prevErrors, name: '' })); // Limpiar error
    }
    if (!homeFormData.experience || homeFormData.experience === '') {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        experienceLevel: 'Selecciona un elemento de la lista.',
      }));
      hasErrors = true;
    } else {
      setFormErrors((prevErrors) => ({ ...prevErrors, experienceLevel: '' })); // Limpiar error
    }
    if (!homeFormData.role || homeFormData.role === '') {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        role: 'Selecciona un elemento de la lista.',
      }));
      hasErrors = true;
    } else {
      setFormErrors((prevErrors) => ({ ...prevErrors, role: '' })); // Limpiar error
    }
    if (hasErrors) {
      return;
    }
    handleSubmitForm(e);
  };
  return (
    <div>
      <form className="form" onSubmit={handleSubmitForm}>
        <ul>
          <li>
            <label className="form__text" htmlFor="name">
              Nombre
            </label>
            <input
              className="form__text"
              type="text"
              name="name"
              placeholder="Introduce tu nombre aquí."
              autoComplete="name"
              required
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const value = e.target.value;
                setHomeFormData({ ...homeFormData, name: value });
              }}
            />
            <p className="error">{formErrors.name}</p>
          </li>
          <li>
            <Dropdown
              id="role"
              labelText="Rol"
              name="role"
              required
              hidden={false}
              value={
                Object.keys(roles).find(
                  (key) =>
                    roles[key as keyof typeof roles] === homeFormData.role
                ) || ''
              }
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                const fullValue = e.target.value;
                const shortValue = roles[fullValue as keyof typeof roles];
                setHomeFormData({ ...homeFormData, role: shortValue });
              }}
              options={Object.keys(roles)}
            />
            <p className="error">{formErrors.role}</p>
          </li>
          <li>
            <Dropdown
              id="experienceLevel"
              labelText="Experiencia"
              name="experienceLevel"
              hidden={false}
              required
              value={
                Object.keys(experienceLevels).find(
                  (key) =>
                    experienceLevels[key as keyof typeof experienceLevels] ===
                    homeFormData.experience
                ) || ''
              }
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                const fullValue = e.target.value;
                const shortValue =
                  experienceLevels[fullValue as keyof typeof experienceLevels];
                setHomeFormData({ ...homeFormData, experience: shortValue });
              }}
              options={Object.keys(experienceLevels)}
            />
            <p className="error">{formErrors.experienceLevel}</p>
          </li>
          <li>
            <Dropdown
              id="theme"
              labelText="Temática"
              name="theme"
              required
              hidden={homeFormData.role === ''}
              value={homeFormData.theme || ''}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                const selectedTheme = e.target.value;
                setHomeFormData({ ...homeFormData, theme: selectedTheme });
              }}
              options={[
                'General',
                ...(themes[homeFormData.role as RoleType] || []),
              ]}
            />
          </li>
          <li>
            <div className="button__container">
              <Button
                className="button__item button__secondary"
                disabled={loadingState}
                onClick={handleCancel}
              >
                Cancelar
              </Button>
              <Button
                className="button__item"
                disabled={loadingState}
                onClick={handleClickConfirm}
              >
                Enviar
              </Button>
            </div>
          </li>
        </ul>
        {loadingState && <Loader />}
      </form>
    </div>
  );
}

export default HomeForm;
