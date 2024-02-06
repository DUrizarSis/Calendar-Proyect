import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ProjectsForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    start: new Date(),
    end: new Date(),
    team: []
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleDateChange = (field, date) => {
    setFormData({
      ...formData,
      [field]: date
    });
  };

  const handleTeamChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setFormData({
      ...formData,
      team: selectedOptions
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Mini validaciónes
    const validationErrors = {};
    if (!formData.name) {
      validationErrors.name = 'The project name is required';
    }
    if (!formData.start) {
      validationErrors.start = 'The start date is required';
    }
    if (!formData.end) {
      validationErrors.end = 'The end date is required';
    }
    if (formData.team.length === 0) {
      validationErrors.team = 'You must select at least one team member';
    }

    if (Object.keys(validationErrors).length === 0) {
      // Aquí hay que manejar la logica del submit jaja
      console.log(formData);
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Project Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={handleChange}
          value={formData.name}
        />
        {errors.name && <div>{errors.name}</div>}
      </div>

      <div>
        <label>Start date:</label>
        <DatePicker
          selected={formData.start}
          onChange={(date) => handleDateChange('start', date)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="MMMM d, yyyy h:mm aa"
          required
        />
        {errors.start && <div>{errors.start}</div>}
      </div>

      <div>
        <label>End date:</label>
        <DatePicker
          selected={formData.end}
          onChange={(date) => handleDateChange('end', date)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="MMMM d, yyyy h:mm aa"
          required
        />
        {errors.end && <div>{errors.end}</div>}
      </div>

      <div>
        <label>Team members:</label>
        <select
          id="team"
          name="team"
          onChange={handleTeamChange}
          value={formData.team}
          multiple
        >
          {/* Falta la logica de rasterizar a los users de redux */}
        </select>
        {errors.team && <div>{errors.team}</div>}
      </div>

      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  );
};

export default ProjectsForm;
