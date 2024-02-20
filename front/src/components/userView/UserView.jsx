import { useDispatch, useSelector } from "react-redux";
import styles from "./userView.module.css";
import { addProject } from "../../redux/teamSuperUser";
import { useEffect, useState } from "react";
import { getEventsforProjectAndIdUser } from "../../redux/eventSlice";
import { addProject2 } from "../../redux/projectUserView";

const UserView = ({handleYourEvents}) => {
    const usericon = process.env.PUBLIC_URL + '/usuario.png';
    const teamSuper = useSelector(state => state?.teamSuperUser?.team);
    const teamUser = useSelector(state=> state.projectUserView.team);
    const userLogin = useSelector(state => state.loginForm.logUserData);
    
    const users = useSelector(state => state?.userEvents?.users?.normalUsers) || [];

    const projectsUser = useSelector(state=> state.projectUserView.projects);
    const projectsSuper = useSelector(state => state?.teamSuperUser?.projects)|| [];

    const indexProjectSuper = useSelector(state => state?.teamSuperUser?.indexProject);
    const indexProjectUser = useSelector(state=> state?.projectUserView?.indexProject);

    const dispatch = useDispatch();

    const [lastClickedElementId, setLastClickedElementId] = useState(null); // Estado para almacenar el último elemento clickeado

    const team = teamSuper.length > 0 
                ? teamSuper
                : teamUser;

    const projects = userLogin.isSuperuser 
                    ? projectsSuper
                    : projectsUser;

    const indexProject = userLogin.isSuperuser 
                        ? indexProjectSuper
                        : indexProjectUser;
                        
    useEffect(() => {
        let newArray = [];
        let usersMatching = [];
                
        newArray = team.map(obj => {

            usersMatching = users.filter(user => obj.team.includes(user._id));
            
            return { _id: obj._id, name: obj.name, usersMatching, start: obj.start, end: obj.end };

        });
        console.log(newArray)
        if (!userLogin.isSuperuser) {
            newArray = newArray.map(obj => {
                   let updatedUsersMatching = obj.usersMatching.filter(user => user._id !== userLogin._id);
                            return { ...obj, usersMatching: updatedUsersMatching };
            });
            }
        
            !userLogin.isSuperuser 
                                    ? dispatch(addProject2(newArray))
                                    : dispatch(addProject(newArray));
                
    }, [dispatch, users, team, userLogin]);

    useEffect(() => {
        // Restaurar el último elemento clickeado desde el almacenamiento local al cargar la página
        const eventJSON = localStorage.getItem('eventKey');
        const eventKey = JSON.parse(eventJSON);
        if (eventKey) {
            setLastClickedElementId(eventKey);
        }
    }, []);

    useEffect(() => {
        // Cambiar el fondo del último elemento clickeado a azul
        if (lastClickedElementId) {
            const lastClickedElement = document.querySelector(`.${styles.userContainer}[data-key="${lastClickedElementId}"]`);
            if (lastClickedElement) {
                lastClickedElement.style.backgroundColor = 'rgb(189, 218, 245)';
            }
        }
    }, [lastClickedElementId]); // Ejecutar este efecto cada vez que lastClickedElementId cambie

    const handleClickUser = (event, userId, project) => {
        const useDataCalender = { idUser: userId, idProject: project };

        console.log(useDataCalender)
        dispatch(getEventsforProjectAndIdUser(useDataCalender));
        localStorage.setItem('useDatacalender', JSON.stringify({ useDataCalender }));
        localStorage.setItem('accessYourCalender', 'true');

        localStorage.setItem('eventKey', JSON.stringify(event.currentTarget.dataset.key));
    
        // Restaurar el fondo del último elemento clickeado a su color original si existe
        if (lastClickedElementId) {
            const lastClickedElement = document.querySelector(`.${styles.userContainer}[data-key="${lastClickedElementId}"]`);
            if (lastClickedElement) {
                lastClickedElement.style.backgroundColor = ''; // Restaurar el color original
            }
        }
    
        // Cambiar el fondo del nuevo elemento clickeado a azul
        event.currentTarget.style.backgroundColor = 'rgb(189, 218, 245)';
    
        // Actualizar el ID del último elemento clickeado en el estado
        setLastClickedElementId(event.currentTarget.dataset.key);
    
        // Aquí puedes ejecutar la lógica que necesites cuando se hace clic en el usuario
        // console.log("Clic en usuario con ID:", userId);
        // console.log("Clic en project:", project);
    };
    
    let listUser = [];
    let project = projects[indexProject];
    console.log(projects[indexProject])
    if (project) {
        listUser = project.usersMatching.map((user, index) => (
            <div
                className={styles.userContainer}
                key={user._id}
                data-key={user._id} // Utiliza data-key para almacenar la clave en el elemento
                onClick={(event) => handleClickUser(event, user._id, project._id)}
            >
                <div className={styles.Icon}>
                    <img src={usericon} alt="icon" />
                </div>
                <p>{user.username}</p>
            </div>
        ));
    }

    const handlebackgroundColorOff = () => {
        if (lastClickedElementId) {
            const lastClickedElement = document.querySelector(`.${styles.userContainer}[data-key="${lastClickedElementId}"]`);
            if (lastClickedElement) {
                lastClickedElement.style.backgroundColor = ''; // Remueve el color de fondo
            }
        }
    } 
    return(
        <div>
            <button onClick={() => { handleYourEvents(); handlebackgroundColorOff(); }} className={styles.btnMy}>My Projects</button>
            <div className={styles.container}>
                <div className={styles.title}>
                    <h3>Team:</h3>
                </div>
        
                <div className={styles.containerList}>
                    {listUser}
                </div>
                
            </div>
        </div>
    )
}

export default UserView;