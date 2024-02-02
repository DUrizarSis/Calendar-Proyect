import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addEvent, updateEvent, deleteEvent, getEvents } from '../../redux/eventSlice';
import styles from './EventForm.module.css';
import Datetime from 'react-datetime';

const EventForm = ({ mode, event, onCancel }) => {

  const dispatch = useDispatch();
  const formRef = useRef();

  const iconDelete = process.env.PUBLIC_URL + '/delete.png';
  const iconCancel = process.env.PUBLIC_URL + '/cancel.png';
  const iconAdd = process.env.PUBLIC_URL + '/add.png';
  const iconUpdate = process.env.PUBLIC_URL + '/update.png';


  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    title: event ? event.title : '',
    description: event ? event.description : '',
    start: event ? new Date(event.start) : new Date(),
    end: event ? new Date(event.end) : new Date(),
    color: event ? event.color : '#000000'
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
  };
  

  const handleDelete = () => {
    if (mode === 'edit' && event) {
      dispatch(deleteEvent({id: event._id}));
      onCancel();
    }
  };



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

            <label>Description:</label>
            <textarea name="description" value={formData.description}
             onChange={(e) => handleInputChange('description', e.target.value)} />

            <label>Start:</label>
            <Datetime
              inputProps={{ name: 'start' }}
              value={formData.start}
              onChange={(value) => handleInputChange('start', value)}
              required
            />

            <label>End:</label>
            <Datetime
              inputProps={{ name: 'end' }}
              value={formData.end}
              onChange={(value) => handleInputChange('end', value)}
              required
            />

            <label>Color:</label>
            <select name="color" value={formData.color} onChange={handleInputChange}>
              <option value="#0000FF">Blue</option>
              <option value="#008000">Green</option>
              <option value="#FF0000">Red</option>
              <option value="#FFFF00">Yellow</option>
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
          </div>
          
        </form>
      </div>
    </>
  );
};

export default EventForm;