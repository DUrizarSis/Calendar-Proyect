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
import { AddTeam } from '../../redux/teamSuperUser';


const ProjectsForm = () => {
  const users = useSelector(state => state.userEvents.users.normalUsers) || [];
  const userSuper = useSelector(state => state.loginForm.logUserData)
  const existingProjects = useSelector(state => state.projects.projects.map(project => project.name.toLowerCase()));
  const dispatch = useDispatch();

  /////////////////////

  const [projectsList, setProjectsList] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [projectId, setProjectId] = useState(null);

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [projectToDeleteId, setProjectToDeleteId] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/projects/all');
        setProjectsList(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, [projectsList]);
  
  //Handle Reset Form
  const handleResetForm = () => {
    setFormData({
      name: '',
      start: new Date(),
      end: new Date(),
      team: [],
      projectCreator: userSuper.isSuperuser && userSuper._id,
    });
    setIsEditMode(false);
    setProjectId(null);
    setErrors({});
  };

  //Handle Edit Project
  const handleEdit = async(projectId) => {
    const selectedProject = projectsList.find((project) => project._id === projectId);
    setFormData({
      name: selectedProject.name,
      start: new Date(selectedProject.start),
      end: new Date(selectedProject.end),
      team: selectedProject.team,
      projectCreator: userSuper.isSuperuser && userSuper._id,
    });
    setProjectId(projectId); // Guarda el ID del proyecto en edición
    setIsEditMode(true); // Cambia el estado para indicar que está en modo de edición
  };

  //Handle Delete Project
  const handleDelete = (projectId) => {
    setProjectToDeleteId(projectId);
    setShowConfirmation(true);
  };
  
  const confirmDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/projects/${projectToDeleteId}`);

      const updatedProjects = projectsList.filter((project) => project._id !== projectToDeleteId);
      setProjectsList(updatedProjects);
  
      setShowConfirmation(false);
      setProjectToDeleteId(null);
  
      if (response.status === 200) {
        const responseAll = await axios.get('http://localhost:5000/api/projects/all');
        const team = responseAll.data;
    
        const superU = userSuper._id;
    
        dispatch(AddTeam({ team, superU }));
      }
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };
  
  const cancelDelete = () => {
    setShowConfirmation(false);
    setProjectToDeleteId(null);
  };

  ///////////////

  const [formData, setFormData] = useState({
    name: '',
    start: new Date(),
    end: new Date(),
    team: [],
    projectCreator: userSuper.isSuperuser && userSuper._id,

  });

  console.log(formData.projectCreator)

  const [errors, setErrors] = useState({});

  //Handle Name Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    const validationErrors = validationProjects({ ...formData, [name]: value }, existingProjects);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: validationErrors[name] || null }));
  };

  //Handle Date Change
  const handleDateChange = (field, date) => {
    setFormData({
      ...formData,
      [field]: date
    });

    const validationErrors = validationProjects({ ...formData, [field]: date }, existingProjects);
    setErrors((prevErrors) => ({ ...prevErrors, [field]: validationErrors[field] || null }));
  };

  //Handle Team Change
  const handleTeamChange = (selectedOptions) => {
    setFormData({
      ...formData,
      team: selectedOptions.map(option => option.value)
    });

    const validationErrors = validationProjects({ ...formData, team: selectedOptions.map(option => option.value) }, existingProjects);
    setErrors((prevErrors) => ({ ...prevErrors, team: validationErrors.team || null }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validationProjects(formData, existingProjects);

    if (Object.keys(validationErrors).length === 0) {
      try {
        if (isEditMode) { //If is Update
        const response = await axios.put(`http://localhost:5000/api/projects/${projectId}`, formData);

            if (response.status === 200) {

              const responseAll = await axios.get('http://localhost:5000/api/projects/all');
              const team = responseAll.data;
          
              const superU = userSuper._id;
          
              dispatch(AddTeam({team, superU}));

            } 

        } else { //If is'n update
          const response = await axios.post('http://localhost:5000/api/projects', formData);
            
          if (response.status === 201) {

            const responseAll = await axios.get('http://localhost:5000/api/projects/all');
            const team = responseAll.data;
        
            const superU = userSuper._id;
        
            dispatch(AddTeam({team, superU}));
        }}

        //Reset Form and States
        setFormData({
          name: '',
          start: new Date(),
          end: new Date(),
          team: [],
          projectCreator: userSuper.isSuperuser && userSuper._id,
        });
        setIsEditMode(false);
        setProjectId(null);

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

      <div className={styles.containerProjects}>
        <div className={styles.container}>
          <div className={styles.projectsList}>
            <h2>Existing Projects:</h2>
            <ul>
              {projectsList.map((project) => (
                <li key={project._id}>
                  {project.name} -{' '}
                  <button onClick={() => handleEdit(project._id)}>Edit</button>
                  <button onClick={() => handleDelete(project._id)}>Delete</button>
                </li>
              ))}
            </ul>
          </div>
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
          <button type="submit">{isEditMode ? 'Update' : 'Add'}</button>
        </div>

        {isEditMode && (
          <div className={styles.btn}>
            <button type="button" onClick={handleResetForm}>
              New Project
            </button>
          </div>
        )}

        {showConfirmation && (
          <div className={styles.containerConfirmDelete}>
            <p>Are you sure you want to delete this project?</p>
            <div className={styles.btmYesandNo}>
              <button onClick={confirmDelete}>Yes</button>
              <button onClick={cancelDelete}>No</button>
            </div>
          </div>     
        )}

        </form>

      </div>




    </div>
  );
};

export default ProjectsForm;
