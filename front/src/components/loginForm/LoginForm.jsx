import { useState } from "react";
import { validation } from "../../validation/validation";
import { useDispatch, useSelector } from 'react-redux';
import { AddShowLogin } from "../../redux/loginForm";
import styles from "./loginForm.module.css"

const LoginForm = ({login, handleRegister}) => {

    const [useData, setUseData] = useState({
        username:'',
        password:''
     });
     const [errors, setError] = useState({});
    //  const [showLogin, setShowLogin] = useState(true);
     const [showPassword, setShowPassword] = useState(false);
     const showLogin = useSelector(state => state.loginForm.showLogin)
     const dispatch = useDispatch();
     //imagenes
     const invisible = process.env.PUBLIC_URL + '/invisible.png';
     const visible = process.env.PUBLIC_URL + '/visible.png';
     const usuario = process.env.PUBLIC_URL + '/usuario.png';

     const handleChange = (e) =>{
        setError(validation({...useData,[e.target.name]:e.target.value}))
        setUseData({...useData, [e.target.name]: e.target.value})  
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        login(useData)
    }

    const handlePass = () => {
        setShowPassword(!showPassword)
    }

    const handleShowLogin = () => {
        dispatch(AddShowLogin(true));
    }

    return (
        <>
            {showLogin ? (
                <div className={styles.container}>
                    <h1>Sign in</h1>
                    <form onSubmit={handleSubmit} className={styles.formContainer}>
                        <div className={styles.inputForm}>
                            <div className={styles.formIcons}>
                                <img src={usuario} alt="email" />
                            </div>
                            <input
                                type="text"
                                id='username'
                                name='username'
                                value={useData.email}
                                onChange={handleChange}
                                placeholder="your username"
                            />
                        </div>
                        <div className={styles.spanError}>
                            <span>{errors.username}</span>
                        </div>
                        <div className={styles.inputForm}>
                            <div className={styles.formIcons}>
                                <img src={showPassword ? visible : invisible} alt="visible" onClick={()=>handlePass()} />
                            </div>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id='password'
                                name='password'
                                value={useData.password}
                                onChange={handleChange}
                                placeholder="your password"
                            />
                        </div>
                        <div className={styles.spanError}>
                            <span>{errors.password}</span>
                        </div>
                        <div>
                            <button className={styles.btn}>go!</button>
                        </div>
                    </form>
                    <div className={styles.message}>
                        <p>¿No tienes una cuenta? <span onClick={()=>{handleRegister()}}> Crea una</span> .</p>
                    </div>
                </div>
            ) : (
                <div className={styles.containerMsg}>
                    <div className={styles.msg}>
                        <h1>Bienvenido a My Calendar</h1>
                        <p>¡Gracias por unirte a nosotros!</p>
                        <p>Esperamos que disfrutes de tu experiencia con nuestra aplicación.</p>
                        
                        <div>
                            <button onClick={handleShowLogin} className={styles.btn}>go!</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default LoginForm;