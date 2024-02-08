import Select from 'react-select';
import styles from './projectView.module.css';
import { useSelector } from 'react-redux';
import { selectProject } from '../../redux/teamSuperUser';
import { useDispatch } from 'react-redux';

const ProjectView = () => {
    const projects = useSelector(state => state.teamSuperUser.projects);
    const projetsSelect = projects.map((obj, index) => ({ value: index, label: obj.name }));
    const dispatch = useDispatch();

    const handleSelectChange = selectedOption => {
        // Aquí puedes acceder al índice seleccionado
        console.log("Índice seleccionado:", selectedOption.value);
        dispatch(selectProject(selectedOption.value))
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