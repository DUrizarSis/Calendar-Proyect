import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addEvent, updateEvent, deleteEvent, getEvents } from '../../redux/eventSlice';
import Datetime from 'react-datetime';

const EventForm = ({ mode, event, onCancel }) => {

  const dispatch = useDispatch();

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
    e.preventDefault();
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
    <form onSubmit={handleSubmit}>
      <label>Title:</label>
      <input type="text" name="title" value={formData.title} onChange={(e) => handleInputChange('title', e.target.value)} required />

      <label>Description:</label>
      <textarea name="description" value={formData.description} onChange={(e) => handleInputChange('description', e.target.value)} />

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

      <button type="submit">{mode === 'add' ? 'Add Event' : 'Update Event'}</button>
      {mode === 'edit' && event &&(
        <button type="button" onClick={handleDelete}>
          Delete Event
        </button>
      )}
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default EventForm;