import Select from 'react-select';
import styles from './projectView.module.css';
import { useSelector } from 'react-redux';
import { selectProject } from '../../redux/teamSuperUser';
import { useDispatch } from 'react-redux';
import { selectProjectUser } from '../../redux/projectUserView';
import { useEffect, useState } from 'react';
import { addIdProjectActual, eventsForProject } from '../../redux/eventSlice';

const ProjectView = () => {
    const projecstUser = useSelector(state => state.projectUserView.projects);
    const projects = useSelector(state => state.teamSuperUser.projects);
    const user = useSelector(state => state.userView.userData);
    const events = useSelector(state => state.events.events);
    const idProjeActual = useSelector(state => state.events.idProjectActual);
    const dispatch = useDispatch();
    const [projetsSelect, setProjetsSelect] = useState([]);


    useEffect(() => {
        let selectOptions = [];

        if (user.isSuperuser) {
            selectOptions = projects.map((obj, index) => ({ value: index, label: obj.name, id: obj._id }));
            setProjetsSelect(selectOptions);
        } else {
            selectOptions = projecstUser.map((obj, index) => ({ value: index, label: obj.name,  id: obj._id  }));
            setProjetsSelect(selectOptions);
        }

        if(projetsSelect[0]) dispatch(addIdProjectActual((projetsSelect[0].id)));
        else dispatch(addIdProjectActual(null));

    }, [user, projects, projecstUser, dispatch]);

    const handleSelectChange = selectedOption => {
        // Aquí puedes acceder al índice seleccionado
        
        dispatch(selectProject(selectedOption.value))
        dispatch(selectProjectUser(selectedOption.value));
        dispatch(addIdProjectActual(selectedOption.id));
    };

    useEffect(()=>{
        let filtered;

        if(idProjeActual !== null){
          filtered = events.filter((event) => event.project === idProjeActual);
          dispatch(eventsForProject(filtered));
        console.log(filtered)
        }

    },[ idProjeActual])

    return (

        <div className={styles.container}>
            <div className={styles.title}>
                <h3>Projects:</h3>
            </div>
            <div className={styles.containerSelect}>
                <Select
                    options={projetsSelect} 
                    className={styles.mySelect}
                    onChange={handleSelectChange}
                />
            </div>
        </div>
    );
}

export default ProjectView;