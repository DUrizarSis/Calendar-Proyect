import React, { useEffect, useMemo, useState } from 'react';
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

        const filteredProjects = response.data.filter(proj => proj.projectCreator === userSuper._id);
        setProjectsList(filteredProjects);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, [projectsList]);

  const existingProjects = projectsList.map(project => project.name.toLowerCase());
  
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
        dispatch(setProjects(team));
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

  //console.log(formData.projectCreator)

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

  const isNameChanged = isEditMode && formData.name !== projectsList.find(project => project._id === projectId).name;

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!isNameChanged) {
      try {
        // Lógica para la actualización o creación del proyecto sin realizar la validación del nombre
        const response = isEditMode
          ? await axios.put(`http://localhost:5000/api/projects/${projectId}`, formData)
          : await axios.post('http://localhost:5000/api/projects', formData);
  
        if (response.status === 200 || response.status === 201) {
          const responseAll = await axios.get('http://localhost:5000/api/projects/all');
          const team = responseAll.data;
          const superU = userSuper._id;
  
          dispatch(AddTeam({ team, superU }));
          dispatch(setProjects(team));
  
          // Resetear formulario y otros estados
          setFormData({
            name: '',
            start: new Date(),
            end: new Date(),
            team: [],
            projectCreator: userSuper.isSuperuser && userSuper._id,
          });
          setIsEditMode(false);
          setProjectId(null);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      // Realizar la validación del nombre solo si ha cambiado
      const validationErrors = validationProjects(formData, existingProjects);
  
      if (Object.keys(validationErrors).length === 0) {
        try {
          // Lógica para la actualización o creación del proyecto con la validación del nombre
          const response = isEditMode
            ? await axios.put(`http://localhost:5000/api/projects/${projectId}`, formData)
            : await axios.post('http://localhost:5000/api/projects', formData);
  
          if (response.status === 200 || response.status === 201) {
            const responseAll = await axios.get('http://localhost:5000/api/projects/all');
            const team = responseAll.data;
            const superU = userSuper._id;
  
            dispatch(AddTeam({ team, superU }));
            dispatch(setProjects(team));
  
            // Resetear formulario y otros estados
            setFormData({
              name: '',
              start: new Date(),
              end: new Date(),
              team: [],
              projectCreator: userSuper.isSuperuser && userSuper._id,
            });
            setIsEditMode(false);
            setProjectId(null);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      } else {
        setErrors(validationErrors);
      }
    }
  };

  const options = useMemo(() => users.map(user => ({ value: user._id, label: user.username })), [users]);
  return (
   
      <div className={styles.container}>

          <div className={styles.containerprojectsList}>

            <h2 className={styles.headProjectList}>My Projects:</h2>
            <div className={styles.projectsList}>
              <ul>
                {projectsList.map((project) => (
                  <li key={project._id}>
                    <div className={styles.projectItem}>
                      <div>{project.name} -{' '}</div>
                      <div className={styles.btnsProjects}>                    
                        <button className={styles.btnEdit} onClick={() => handleEdit(project._id)}>Edit</button>
                        <button  className={styles.btnDelete} onClick={() => handleDelete(project._id)}>Delete</button>
                      </div>
                    </div>
                    

                  </li>
                ))}
              </ul>
            </div>
            
          </div>

          <div className={styles.containerForm}>

            <div className={styles.contForm}>

              {
                isEditMode ? <h2>Update Project</h2> : <h2>Create New Project</h2>
              }

              <form onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.formInputSimple}>
                    <label>Project Name:</label>

                      <input
                        type="text"
                        name="name"
                        onChange={handleChange}
                        value={formData.name}
                        />

                  <div className={styles.errors}>
                    {isEditMode && !isNameChanged ? "" : (errors.name && <p>{errors.name}</p>)}
                  </div>
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
                      <div className={styles.errors}>
                        {errors.start && <p>{errors.start}</p>}
                      </div>
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

                        <div className={styles.errors}>
                          {errors.end && <p>{errors.end}</p>}
                        </div>
                  </div>

                  <div className={styles.formInputSelect}>
                    <label>Team members:</label>
                      <Select
                        isMulti
                        options={options}
                        value={options.filter(option => formData.team.includes(option.value))}
                        onChange={handleTeamChange}
                        />
                      <div className={styles.errors}>
                        {errors.team && <p>{errors.team}</p>}
                      </div>
                  </div>


                  <div>
                    <button className={styles.btnForm} type="submit">{isEditMode ? 'Update' : 'Add'}</button>
                    {isEditMode && (
                      <button className={styles.btnNewP} type="button" onClick={handleResetForm}>
                        New Project
                      </button>
                    )}
                  </div>



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
      </div>  

  );
};

export default ProjectsForm;
