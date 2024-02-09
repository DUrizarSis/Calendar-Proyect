import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addEvent, updateEvent, deleteEvent, getEvents } from '../../redux/eventSlice';
import styles from './EventForm.module.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { confirmSuper,confirmUser } from '../../redux/confirmEmpyP';

const EventForm = ({ mode, event, onCancel }) => {

  const userData = useSelector(state => state.loginForm.logUserData);

  const isSuperuser = userData.isSuperuser;
  const teamSuperUserProjects = useSelector(state => state.teamSuperUser.projects);
  const projectUserViewProjects = useSelector(state => state.projectUserView.projects);
  const teamSuperUserIndexProject = useSelector(state => state.teamSuperUser.indexProject);
  const projectUserViewIndexProject = useSelector(state => state.projectUserView.indexProject);

  const projects = isSuperuser ? teamSuperUserProjects : projectUserViewProjects;
  const onProject = isSuperuser ? teamSuperUserIndexProject : projectUserViewIndexProject;
  const confirmSuperP = useSelector(state => state.confirmEmpy.projectSuper);
  const confirmUserP = useSelector(state => state.confirmEmpy.projectUser);
  const dispatch = useDispatch();
  const formRef = useRef();
 
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showName, setShowName] = useState({
    name:'',
    id:''
  })
  const iconDelete = process.env.PUBLIC_URL + '/delete.png';
  const iconCancel = process.env.PUBLIC_URL + '/cancel.png';
  const iconAdd = process.env.PUBLIC_URL + '/add.png';
  const iconUpdate = process.env.PUBLIC_URL + '/update.png';


  useEffect(() => {
    if (userData && userData._id) {
      dispatch(getEvents(userData._id));
    }
  }, [dispatch, userData]);

  useEffect(() => {
    handleNameProyect(event.project ? event.project : projects[onProject]?._id);
  }, [event.project, projects, onProject]);


  const [formData, setFormData] = useState({
    title: event ? event.title : '',
    description: event ? event.description : '',
    start: event ? new Date(event.start) : new Date(),
    end: event ? new Date(event.end) : new Date(),
    color: event ? event.color : '#000000',
    user: userData._id ,
    project: event.project ? event.project : showName.id, 
  });
  
  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Asegúrate de evitar el comportamiento predeterminado del formulario
    if (mode === 'add') {
      dispatch(addEvent(formData));
    } else if (mode === 'edit' && event) {
      dispatch(updateEvent({ id: event._id, updateEvent: formData }));
    }
    onCancel();
  }

  const handleNameProyect = (idProject) => {
    const showNameProject = projects.find((project) => project._id === idProject)?.name || '';
    setShowName({name: showNameProject, id: idProject});
    setFormData((prevData) => ({
      ...prevData,
      project: idProject,
    }));
  };

  // const handleDelete = () => {
  //   if (mode === 'edit' && event) {
  //     dispatch(deleteEvent({id: event._id}));
  //     onCancel();
  //   }
  // };

  const handleDelete = () => {
    setShowConfirmation(true); // Mostrar el mensaje de confirmación al hacer clic en eliminar
  };

  const confirmDelete = () => {
    setShowConfirmation(false); // Ocultar el mensaje de confirmación
    if (mode === 'edit' && event) {
      dispatch(deleteEvent({ id: event._id }));
      onCancel();
    }
  };

  const cancelDelete = () => {
    setShowConfirmation(false); // Ocultar el mensaje de confirmación
  };
  const handleConfirmEmpyProject = () => {
    dispatch(confirmSuper(false));
    dispatch(confirmUser(false))
    onCancel()
  }

  return (
    <>
      <div className={styles.overlay}></div>

      <div className={styles.container}>

        <form ref={formRef} onSubmit={handleSubmit}>

              <div className={styles.iconClose}>
                <img src={iconCancel} alt="close" onClick={onCancel} title='Close'/>  
              </div>

              <div className={styles.formInput}>

                  <label>Title:</label>
                  <input type="text" name="title" value={formData.title} 
                  onChange={(e) => handleInputChange('title', e.target.value)} required />

                  <label>Project:</label>
                  <input type="text" name="project" value={showName.name} 
                  readOnly required />

                  <label>Description:</label>
                  <textarea name="description" value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)} />
                    
                      <label>Start:</label>

                  <DatePicker
                  selected={formData.start}
                  onChange={(value) => handleInputChange('start', value)}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  dateFormat="MMMM d, yyyy h:mm aa"
                  required
                  />

                

                  <label>End:</label>

                  <DatePicker
                  selected={formData.end}
                  onChange={(value) => handleInputChange('end', value)}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  dateFormat="MMMM d, yyyy h:mm aa"
                  required
                  />

                  <label>Color:</label>
                  <select name="color" value={formData.color}  onChange={(e) => handleInputChange('color', e.target.value)}>
                  <option value="#5C7FFF">Blue</option>
                  <option value="#328C46">Green</option>
                  <option value="#FF5A52">Red</option>
                  <option value="#F0FF80">Yellow</option>
                  </select>
            
              </div>

          <div className={styles.containerIcons}>
              {mode === 'add' ? (
                <img src={iconAdd} alt="add" className={styles.icons} onClick={handleSubmit}  title="Add event"/>
              ) : (
                <img src={iconUpdate} alt="update" className={styles.icons} onClick={handleSubmit}  title="Update"/>
              )}
          
              {mode === 'edit' && event &&(
                <img src={iconDelete} alt="delete" className={styles.icons} onClick={handleDelete}  title="Delete"/>
              )}

              {showConfirmation && (
                <div className={styles.containerConfirmDelete}>
                  <p>Are you sure you want to delete this event?</p>
                  <div className={styles.btmYesandNo}>
                    <button onClick={confirmDelete}>Yes</button>
                    <button onClick={cancelDelete}>No</button>
                  </div>

                </div>
                
              )}
              
              {confirmSuperP && (
                <div className={styles.containerConfirmDelete}>
                  <p>You must create a project with a work team to be able to upload an event to the calendar.</p>
                  <div className={styles.btmYesandNo}>
                    <button onClick={handleConfirmEmpyProject}>ok</button>
                  </div>

                </div>
                
              )}
                {confirmUserP && (
                <div className={styles.containerConfirmDelete}>
                  <p>You must be assigned to a project to upload events to the calendar.</p>
                  <div className={styles.btmYesandNo}>
                    <button onClick={handleConfirmEmpyProject}>ok</button>
                  </div>

                </div>
                
              )}


        </div>
          
        </form>
      </div>
    </>
  );
};

export default EventForm;