import styles from "./userView.module.css";

const UserView = () => {
    const usuario = process.env.PUBLIC_URL + '/usuario.png';
    return(
        <div className={styles.container}>
            <div className={styles.userContainer}>
                <div className={styles.Icon}>
                    <img src={usuario} alt="email" />
                </div>
                <p>John Doe</p>
            </div>
            <div className={styles.userContainer}>
                <div className={styles.Icon}>
                    <img src={usuario} alt="email" />
                </div>
                <p>Jane Smith</p>  
            </div>
            <div className={styles.userContainer}>
                <div className={styles.Icon}>
                    <img src={usuario} alt="email" />
                </div>
                <p>Michael Johnson</p>  
            </div>
            <div className={styles.userContainer}>
                <div className={styles.Icon}>
                    <img src={usuario} alt="email" />
                </div>
                <p>Emily Brown</p>
            </div>
            <div className={styles.userContainer}>
                <div className={styles.Icon}>
                    <img src={usuario} alt="email" />
                </div>
                <p>David Wilson</p>  
            </div>
            <div className={styles.userContainer}>
                <div className={styles.Icon}>
                    <img src={usuario} alt="email" />
                </div>
                <p>Sarah Taylor</p>
            </div>
        </div>
    )
}

export default UserView;