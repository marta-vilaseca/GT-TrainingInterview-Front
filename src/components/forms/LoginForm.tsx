import React, { useState, ChangeEvent } from 'react';
import { userData } from '../../services/api';
// import TextInput from '../common/TextInput';
import RadioButton from '../common/RadioButton';
import Dropdown from '../common/SelectDropdown';
import Button from '../common/Button';
import './Form.scss';

interface LoginFormData {
  // name: string;
  role: string; // Changed from roles (array) to role (string)
  experience: string;
}

const experienceLevels = {
  'Trainee - 0-1 Years': 'Trainee',
  'Junior - 1-2 Years': 'Junior',
  'Semi-Senior - 2-4 Years': 'Semi-Senior',
  'Senior - 4+ Years': 'Senior',
  'Lead - 8+ Years': 'Lead',
};

const roles = ['UX/UI Designer', 'Frontend Developer', 'Backend Developer'];

export default function LoginForm() {
  const [formData, setFormData] = useState<LoginFormData>({
    // name: '',
    role: '', // Initialize with empty string
    experience: 'Trainee', // Default to first option
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // console.log('Form data:', formData);

    try {
      const response = await userData('/ask', formData); // Specify the endpoint here
      console.log('Response from API:', response); // Log the response from the API
    } catch (error) {
      console.error('Error submitting form data', error); // Log any errors
    }
  };

  // const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   setFormData({ ...formData, name: e.target.value });
  // };

  const handleRoleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, role: e.target.value });
  };

  const handleExperienceLevelChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const fullValue = e.target.value || Object.keys(experienceLevels)[0];
    const shortValue =
      experienceLevels[fullValue as keyof typeof experienceLevels];
    setFormData({ ...formData, experience: shortValue });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <ul>
        {/* <li>
          <TextInput
            labelText="Name"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleNameChange}
          />
        </li> */}
        <li>
          <div className="options__radio">
            {roles.map((role) => (
              <RadioButton
                key={role}
                id={`role-${role.toLowerCase().replace(/\s+/g, '-')}`}
                labelText={role}
                name="role"
                value={role}
                checked={formData.role === role}
                onChange={handleRoleChange}
              />
            ))}
          </div>
        </li>
        <li>
          <Dropdown
            id="experienceLevel"
            labelText="Experience Level"
            name="experienceLevel"
            value={
              Object.keys(experienceLevels).find(
                (key) =>
                  experienceLevels[key as keyof typeof experienceLevels] ===
                  formData.experience
              ) || ''
            }
            onChange={handleExperienceLevelChange}
            options={Object.keys(experienceLevels)}
          />
        </li>
        <li>
          <Button type="submit">Ask me a Question</Button>
        </li>
      </ul>
    </form>
  );
}
