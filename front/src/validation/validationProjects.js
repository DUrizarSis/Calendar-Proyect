
const validationProjects = (formData, existingProjects) => {
    const errors = {};
  
    if (!formData.name) {
      errors.name = 'The project name is required';
    } else if (existingProjects.includes(formData.name.toLowerCase())) {
      errors.name = 'The project name already exists';
    }
  
    if (!formData.start) {
      errors.start = 'The start date is required';
    }
  
    if (!formData.end) {
      errors.end = 'The end date is required';
    }
  
    if (formData.team.length === 0) {
      errors.team = 'You must select at least one team member';
    }
  
    return errors;
};
  
module.exports = validationProjects;
  