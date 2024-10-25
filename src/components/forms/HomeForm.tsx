import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dropdown from '../common/SelectDropdown';
import Button from '../common/Button';
import Loader from '../common/Loader';
import './HomeForm.scss';

// Constants for experience levels and roles
const experienceLevels = {
  'Trainee - 0-1 Years': 'Trainee',
  'Junior - 1-2 Years': 'Junior',
  'Semi-Senior - 2-4 Years': 'Semi-Senior',
  'Senior - 4+ Years': 'Senior',
  'Lead - 8+ Years': 'Lead',
};

const roles = {
  'UX/UI Designer': 'diseñador ux/ui',
  'Frontend Developer': 'frontend',
  'Backend Developer': 'backend',
};

export default function HomeForm() {
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

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmitForm}>
        <ul>
          <li>
            <label htmlFor="name">Tu nombre:</label>
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
              labelText="Tu rol:"
              name="role"
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
              labelText="Tu experiencia:"
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
            <Button disabled={loadingState}>Enviar</Button>
          </li>
        </ul>
        {loadingState && <Loader />}
      </form>
    </div>
  );
}
