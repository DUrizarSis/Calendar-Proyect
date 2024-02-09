import { useDispatch, useSelector } from "react-redux";
import styles from "./userView.module.css";
import { addProject } from "../../redux/teamSuperUser";
import { useEffect } from "react";

const UserView = () => {
    const usericon = process.env.PUBLIC_URL + '/usuario.png';
    const team = useSelector(state => state.teamSuperUser.team);
    const users = useSelector(state => state.userEvents.users.normalUsers) || [];
    const projects = useSelector(state => state.teamSuperUser.projects)|| [];
    const indexProject = useSelector(state => state.teamSuperUser.indexProject);
    const dispatch = useDispatch();

    let listUser = [];
 
    useEffect(()=>{
        let usersMatching = [];

        const newArray = team.map(obj => {
            usersMatching = users.filter(user => obj.team.includes(user._id));
            return {_id: obj._id, name: obj.name, usersMatching };
        });

        dispatch(addProject(newArray))
    },[])

    let project = projects[indexProject];

    console.log(projects[indexProject])
    console.log(indexProject)
    if (project) {
        listUser = project.usersMatching.map((user, index) => (
            <div className={styles.userContainer} key={user._id}>
                <div className={styles.Icon}>
                    <img src={usericon} alt="icon" />
                </div>
                <p>{user.username}</p>
            </div>
        ));
    }

    return(

        <div className={styles.container}>
            <div className={styles.title}>
                <h3>Team:</h3>
            </div>

            <div className={styles.containerList}>
                {listUser}
            </div>
            
        </div>
    )
}

export default UserView;