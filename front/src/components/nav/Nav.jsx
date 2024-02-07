import styles from "./nav.module.css";

const Nav = ({logout}) => {
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
            <div className={styles.logout}>
                <img src={projectIcon} alt="project" title='Create project' className={styles.projectIcon}/>
            </div>
        
            <div className={styles.logout}>
                <img src={logoutIcon} alt="logout" onClick={handleLogout} title='logout' className={styles.logoutIcon}/>
            </div>
        </div>
    )
}

export default Nav;