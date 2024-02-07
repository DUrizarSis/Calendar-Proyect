import React, { useState } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useSelector, useDispatch } from 'react-redux';
import { AddNewProject } from '../../redux/projectSlice';
import axios from 'axios';

const ProjectsForm = () => {

  const users = useSelector(state => state.userEvents.users.normalUsers);

  const dispatch = useDispatch();

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

  const handleTeamChange = (selectedOptions) => {
    setFormData({
      ...formData,
      team: selectedOptions.map(option => option.value)
    });
  };


  const handleSubmit = async(e) => {
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
        try {
          const response = await axios.post('http://localhost:5000/api/projects', formData);
    
          if (response.status === 201) {
            const data = response.data.project;
            console.log(data);
            dispatch(AddNewProject(data));
          } else {
            console.error('Internal Error Server');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      } else {
        setErrors(validationErrors);
      }
  };

  const options = users.map(user => ({ value: user._id, label: user.username }));

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Project Name:</label>
        <input
          type="text"
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
        <Select
          isMulti
          options={options}
          value={options.filter(option => formData.team.includes(option.value))}
          onChange={handleTeamChange}
        />
        {errors.team && <div>{errors.team}</div>}
      </div>


      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  );
};

export default ProjectsForm;
