// src/components/forms/HomeForm.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LoginFormProps } from '../../types/ILoginForm';
import Dropdown from '../common/SelectDropdown';
import Button from '../common/Button';
import Loader from '../common/Loader';
import {
  experienceLevels,
  roles,
  themes,
  RoleType,
} from '../../utils/constants';
import './HomeForm.scss';

interface FormProps {
  homeFormData: LoginFormProps;
  setHomeFormData: React.Dispatch<React.SetStateAction<LoginFormProps>>;
}

const HomeForm: React.FC<FormProps> = ({ homeFormData, setHomeFormData }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loadingState, setLoadingState] = useState(false);

  const [formErrors, setFormErrors] = useState({
    experienceLevel: '',
    role: '',
    name: '',
  });

  useEffect(() => {
    if (location.state) {
      const { name, role, experience, theme } = location.state; // Expecting formData here
      setHomeFormData({
        name: name || '',
        role: role || '',
        experience: experience || '',
        theme: theme || 'General', // default to 'General' if no theme is selected
      });
    }
  }, [location, setHomeFormData]); // This will run when location changes (when coming from ThankYou)

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    // Check for any errors before sending form
    if (Object.values(formErrors).some((error) => error !== '')) {
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
      setFormErrors((prevErrors) => ({ ...prevErrors, name: '' })); // Clear error
    }
    if (!homeFormData.experience || homeFormData.experience === '') {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        experienceLevel: 'Selecciona un elemento de la lista.',
      }));
      hasErrors = true;
    } else {
      setFormErrors((prevErrors) => ({ ...prevErrors, experienceLevel: '' })); // Clear error
    }
    if (!homeFormData.role || homeFormData.role === '') {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        role: 'Selecciona un elemento de la lista.',
      }));
      hasErrors = true;
    } else {
      setFormErrors((prevErrors) => ({ ...prevErrors, role: '' })); // Clear error
    }
    if (hasErrors) {
      return;
    }
    handleSubmitForm(e);
  };
  return (
    <section>
      <form className="form" onSubmit={handleSubmitForm}>
        <ul>
          <li>
            <label className="form__text" htmlFor="name">
              Nombre
            </label>
            <input
              className={`form__text ${formErrors.name ? 'form__error' : ''}`}
              type="text"
              name="name"
              placeholder="Introduce tu nombre aquí."
              autoComplete="name"
              required
              maxLength={50}
              value={homeFormData.name || ''}
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
              className={`form__text ${formErrors.name ? 'form__error' : ''}`}
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
                setHomeFormData({
                  ...homeFormData,
                  role: shortValue,
                  theme: 'General',
                });
              }}
              options={Object.keys(roles)}
            />
            <p className="error">{formErrors.role}</p>
          </li>
          <li>
            <Dropdown
              id="experienceLevel"
              className={`form__text ${formErrors.name ? 'form__error' : ''}`}
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
              className="form__text"
              labelText="Temática"
              name="theme"
              required
              hidden={homeFormData.role === ''}
              value={
                homeFormData.role && homeFormData.theme
                  ? Object.keys(
                      themes[homeFormData.role as RoleType] || {}
                    ).find(
                      (key) =>
                        themes[homeFormData.role as RoleType]?.[key] ===
                        homeFormData.theme
                    ) || 'General'
                  : 'General'
              }
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                const selectedKey = e.target.value;
                const selectedValue =
                  selectedKey === 'General' || !selectedKey
                    ? 'General'
                    : themes[homeFormData.role as RoleType]?.[selectedKey] ||
                      'General';
                setHomeFormData({ ...homeFormData, theme: selectedValue });
              }}
              options={[
                'General',
                ...(homeFormData.role
                  ? Object.keys(themes[homeFormData.role as RoleType] || {})
                  : []),
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
                Volver
              </Button>
              <Button
                className="button__item"
                disabled={loadingState}
                onClick={handleClickConfirm}
              >
                Continuar
              </Button>
            </div>
          </li>
        </ul>
        {loadingState && <Loader />}
      </form>
    </section>
  );
};

export default HomeForm;
