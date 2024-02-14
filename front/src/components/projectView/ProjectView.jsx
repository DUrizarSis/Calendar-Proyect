import Select from 'react-select';
import styles from './projectView.module.css';
import { useSelector } from 'react-redux';
import { selectProject } from '../../redux/teamSuperUser';
import { useDispatch } from 'react-redux';
import { selectProjectUser } from '../../redux/projectUserView';
import { useEffect, useState } from 'react';

const ProjectView = () => {
    const projecstUser = useSelector(state => state.projectUserView.projects);
    const projects = useSelector(state => state.teamSuperUser.projects);
    const user = useSelector(state => state.userView.userData);
    const dispatch = useDispatch();
    const [projetsSelect, setProjetsSelect] = useState([]);



    useEffect(() => {
        let selectOptions = [];

        if (user.isSuperuser) {
            selectOptions = projects.map((obj, index) => ({ value: index, label: obj.name }));
        } else {
            selectOptions = projecstUser.map((obj, index) => ({ value: index, label: obj.name }));
            console.log(selectOptions)
        }
        setProjetsSelect(selectOptions);
    }, [user, projects, projecstUser, dispatch]);


    const handleSelectChange = selectedOption => {
        // Aquí puedes acceder al índice seleccionado
        user.isSuperuser 
        dispatch(selectProject(selectedOption.value))
        dispatch(selectProjectUser(selectedOption.value));
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