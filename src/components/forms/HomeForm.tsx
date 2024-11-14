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
    experience: 'Trainee',
    theme: '',
  });
  const [loadingState, setLoadingState] = useState(false);

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
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
      experience: 'Trainee',
      theme: '',
    });

    // Navigate to home
    navigate('/');
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmitForm}>
        <ul>
          <li>
            <label htmlFor="name">Nombre</label>
            <input
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
          </li>
          <li>
            <Dropdown
              id="experienceLevel"
              labelText="Experiencia"
              name="experienceLevel"
              hidden={false}
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
          </li>
          <li>
            <Dropdown
              id="theme"
              labelText="Temática"
              name="theme"
              hidden={homeFormData.role === ''}
              value={homeFormData.theme || ''}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                const selectedTheme = e.target.value;
                setHomeFormData({ ...homeFormData, theme: selectedTheme });
              }}
              options={[
                'general',
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
              <Button className="button__item" disabled={loadingState}>
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
