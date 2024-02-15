function formatDateString(date) {
    // Extraer componentes de la fecha
    const day = date.getDate().toString().padStart(2, '0'); // Día del mes
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Mes (0-indexado)
    const year = date.getFullYear(); // Año
    const hours = date.getHours().toString().padStart(2, '0'); // Horas
    const minutes = date.getMinutes().toString().padStart(2, '0'); // Minutos

    // Construir el string de fecha en el formato deseado
    const formattedDateString = `${day}:${month}:${year} ${hours}:${minutes}`;

    return formattedDateString;
}

const validateDateWithinProject = (formData, dateProject) => {
    
    const errors = {};
    
    // Convertir las cadenas de fecha en objetos Date
    const projectStartDate = new Date(dateProject.start);
    const projectEndDate = new Date(dateProject.end);
    console.log(formData)
    console.log(dateProject)
    if (formData.start) {
        const formDataStartDate = formData.start;
        // Verificar si formData.start está dentro del rango de la fecha del proyecto
        if (formDataStartDate < projectStartDate || formDataStartDate > projectEndDate) {
            errors.start = `The event must be created within the project date 
            from ${formatDateString(projectStartDate)} to ${formatDateString(projectEndDate)}`;
        }
    }
  
    if (formData.end) {
        const formDataEndDate = formData.end;
        // Verificar si formData.end está dentro del rango de la fecha del proyecto
        if (formDataEndDate < projectStartDate || formDataEndDate > projectEndDate) {
            errors.start = `The event must be created within the project date 
            from ${formatDateString(projectStartDate)} to ${formatDateString(projectEndDate)}`;
        }
    }
  
    return errors;
};

module.exports = validateDateWithinProject;