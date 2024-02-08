import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useSelector, useDispatch } from 'react-redux';
import { AddNewProject, setProjects } from '../../redux/projectSlice';
import axios from 'axios';
import validationProjects from '../../validation/validationProjects';
import { NavLink } from 'react-router-dom';
import styles from './projectsForm.module.css';


const ProjectsForm = () => {
  const users = useSelector(state => state.userEvents.users.normalUsers) || [];
  const userSuper = useSelector(state => state.loginForm.logUserData)
  const existingProjects = useSelector(state => state.projects.projects.map(project => project.name.toLowerCase()));
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: '',
    start: new Date(),
    end: new Date(),
    team: [],
    projectCreator: userSuper.isSuperuser && userSuper._id,

  });

  useEffect(() => {
    // Al montar el componente, obtener la lista de proyectos
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/projects/all');
        const data = response.data;
        dispatch(setProjects(data));
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, [dispatch]);

  console.log(formData.projectCreator)

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    const validationErrors = validationProjects({ ...formData, [name]: value }, existingProjects);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: validationErrors[name] || null }));
  };

  const handleDateChange = (field, date) => {
    setFormData({
      ...formData,
      [field]: date
    });

    const validationErrors = validationProjects({ ...formData, [field]: date }, existingProjects);
    setErrors((prevErrors) => ({ ...prevErrors, [field]: validationErrors[field] || null }));
  };

  const handleTeamChange = (selectedOptions) => {
    setFormData({
      ...formData,
      team: selectedOptions.map(option => option.value)
    });

    const validationErrors = validationProjects({ ...formData, team: selectedOptions.map(option => option.value) }, existingProjects);
    setErrors((prevErrors) => ({ ...prevErrors, team: validationErrors.team || null }));
  };


  const handleSubmit = async(e) => {
    e.preventDefault();

    const validationErrors = validationProjects(formData, existingProjects);

      if (Object.keys(validationErrors).length === 0) {
        try {
          const response = await axios.post('http://localhost:5000/api/projects', formData);
    
          if (response.status === 201) {
            const data = response.data.project;
            console.log(data);
            dispatch(AddNewProject(data));

            setFormData({
              name: '',
              start: new Date(),
              end: new Date(),
              team: [],
              projectCreator: userSuper.isSuperuser && userSuper._id,
            });
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
    <div className={styles.container}>
        <div className={styles.btnClose}>
          <NavLink to="/home">
            <button>Home</button>
          </NavLink>
        </div>

      <form onSubmit={handleSubmit} className={styles.form}>

        <div className={styles.formInputSimple}>
          <label>Project Name:</label>

            <input
              type="text"
              name="name"
              onChange={handleChange}
              value={formData.name}
            />

          {errors.name && <div>{errors.name}</div>}
        </div>

        <div className={styles.formInputDate}>
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

        <div className={styles.formInputDate}>
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

        <div className={styles.formInputSelect}>
          <label>Team members:</label>
            <Select
              isMulti
              options={options}
              value={options.filter(option => formData.team.includes(option.value))}
              onChange={handleTeamChange}
            />
          {errors.team && <div>{errors.team}</div>}
        </div>


        <div className={styles.btn}>
          <button type="submit">Add</button>
        </div>

      </form>
    </div>
  );
};

export default ProjectsForm;
