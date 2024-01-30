import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addEvent, updateEvent, deleteEvent, getEvents } from '../../redux/eventSlice';

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
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name.includes('start') || name.includes('end') ? new Date(value) : value,
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
      <input type="text" name="title" value={formData.title} onChange={handleInputChange} required />

      <label>Description:</label>
      <textarea name="description" value={formData.description} onChange={handleInputChange} />

      <label>Start:</label>
      <input type="datetime-local" name="start" value={formData.start.toISOString().slice(0, 16)} onChange={handleInputChange} required />

      <label>End:</label>
      <input type="datetime-local" name="end" value={formData.end.toISOString().slice(0, 16)} onChange={handleInputChange} required />

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