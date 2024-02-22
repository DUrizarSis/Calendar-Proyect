import Select from 'react-select';
import styles from './projectView.module.css';
import { useSelector } from 'react-redux';
import { selectProject } from '../../redux/teamSuperUser';
import { useDispatch } from 'react-redux';
import { selectProjectUser } from '../../redux/projectUserView';
import { useEffect, useState } from 'react';
import { onProject, setOnProject } from '../../redux/projectSlice';
import { addIndexforEventsProject } from '../../redux/eventSlice';

const ProjectView = () => {
    const projecstUser = useSelector(state => state.projectUserView.projects);
    const projects = useSelector(state => state.teamSuperUser.projects);
    const projects2 = useSelector(state => state.projects.projects);
    const user = useSelector(state => state.userView.userData);
    const dispatch = useDispatch();
    const [projetsSelect, setProjetsSelect] = useState([]);

    useEffect(() => {
        let selectOptions = [];

        if (user.isSuperuser) {
            selectOptions = projects.map((obj, index) => ({ value: index, label: obj.name, id: obj._id }));
        } else {
            selectOptions = projecstUser.map((obj, index) => ({ value: index, label: obj.name, id: obj._id }));
        }
        
        setProjetsSelect(selectOptions);

        if(selectOptions.length > 0){
            dispatch(addIndexforEventsProject(selectOptions[0]));
            const defaultProject = projects2[0];
            dispatch(setOnProject(defaultProject));
            console.log(selectOptions[0]);
        }

    }, [user, projects, projecstUser, dispatch]);


    const handleSelectChange = selectedOption => {
        // Aquí puedes acceder al índice seleccionado

        const selectedIndex = selectedOption.value;

        if(user.isSuperuser){ 
            dispatch(addIndexforEventsProject(selectedOption))
            dispatch(selectProject(selectedOption.value));
        }else {
            dispatch(addIndexforEventsProject(selectedOption))
            dispatch(selectProjectUser(selectedOption.value));
        }

        if(projects2.length > 0) {
            const selectedProject = projects2[selectedIndex];
            dispatch(setOnProject(selectedProject));
        }

    };

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