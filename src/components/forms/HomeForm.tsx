import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dropdown from '../common/SelectDropdown';
import Button from '../common/Button';
import Loader from '../common/Loader';
import './HomeForm.scss';

import { experienceLevels, roles, themes } from '../../utils/constants';

function HomeForm() {
  const navigate = useNavigate();
  const [homeFormData, setHomeFormData] = useState({
    name: '',
    role: '',
    experience: 'Trainee',
  });
  const [loadingState, setLoadingState] = useState(false);

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingState(true);

    // Navigate to /chat and pass the form data as state
    navigate('/chat', { state: homeFormData });
  };

  const handleCancel = (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingState(true);

    // Navigate to /
    navigate('/');
  };

  return (
    <div className="container">
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
            <div className="button__container">
              <Button disabled={loadingState} onClick={handleCancel}>
                Cancelar
              </Button>
              <Button disabled={loadingState}>Enviar</Button>
            </div>
          </li>
        </ul>
        {loadingState && <Loader />}
      </form>
    </div>
  );
}

export default HomeForm;
