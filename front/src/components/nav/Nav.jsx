import { useSelector } from "react-redux";
import styles from "./nav.module.css";

const Nav = ({logout}) => {
    const user = useSelector(state => state.userView.userData)
    const logoutIcon = process.env.PUBLIC_URL + '/logout.png';
    const projectIcon = process.env.PUBLIC_URL + '/project.png';

    const handleLogout = () => {
        logout();
    }

    return(
        <div className={styles.container}>
            <div className={styles.title}>
                <h2>My calendar.</h2>
            </div>
            {user.isSuperuser === true && 
            <div className={styles.logout}>
                <img src={projectIcon} alt="project" title='Create project' className={styles.projectIcon}/>
            </div>
            }
            <div className={styles.logout}>
                <img src={logoutIcon} alt="logout" onClick={handleLogout} title='logout' className={styles.logoutIcon}/>
            </div>
        </div>
    )
}

export default Nav;