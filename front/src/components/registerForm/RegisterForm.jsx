import { useState } from "react";
import { validation } from "../../validation/validation";
import styles from "./registerForm.module.css"

const RegisterForm = ({checkIn}) => {

    const [useData, setUseData] = useState({
        email:'',
        username:'',
        image:'',
        password:'',
        isSuperuser:false,
        confirmPassword: ''
     });
     const [errors, setError] = useState({});
     const [showPassword, setShowPassword] = useState(false);

     const handleChange = (e) => {
        const value =
          e.target.type === "checkbox"
            ? e.target.checked
            : e.target.name === "isSuperuser"
            ? e.target.value === "true" // Convertir la cadena "true" o "false" a booleano
            : e.target.value;
        setError(validation({ ...useData, [e.target.name]: value }));
        setUseData({ ...useData, [e.target.name]: value });
      };
    const handleSubmit = (e)=>{
        e.preventDefault();
        checkIn(useData);
    }

    const handlePass = () => {
        setShowPassword(!showPassword)
    }

    return (
        <div>
            <h1>Sign up</h1>

            <form onSubmit={handleSubmit}>

                    <div> 
                        
                        {/* <div>
                            <img src={iconMail} alt="email" />
                        </div>   */}
                        
                        <input 
                            type="email"
                            id='email'
                            name='email'
                            value={useData.email}
                            onChange={handleChange}
                            placeholder="Tu email"
                        />
                    </div>

                    <div className={styles.spanError}>
                        <span>{errors.email}</span> 
                    </div>

                    <div className={styles.inputForm}> 
                        
                        {/* <div className={styles.formIcons}>
                            <img src={iconUser} alt="username" />
                        </div>   */}
                        
                        <input 
                            type="text"
                            id='username'
                            name='username'
                            value={useData.username}
                            onChange={handleChange}
                            placeholder="Tu usuario"
                            /> 
                    </div>

                    <div className={styles.spanError}>
                        <span>{errors.username}</span> 
                    </div>
                    <div className={styles.inputForm}>
{/* 
                    <div className={styles.formIcons}>
                        <img src={iconMail} alt="nombre" />
                    </div>  */}

                    <input
                    type="text"
                    name="image"
                    value={useData.image}
                    onChange={handleChange}
                    placeholder="Image URL"
                    />

                    </div>
                    <div className={styles.spanError}>
                        <span>{errors.image}</span> 
                    </div>

                    <div className={styles.inputForm}>
                        <label htmlFor="isSuperuser">¿Es superusuario?</label>
                        <select
                            id="isSuperuser"
                            name="isSuperuser"
                            value={useData.isSuperuser}
                            onChange={handleChange}
                        >
                            <option value={true}>Sí</option>
                            <option value={false}>No</option>
                        </select>
                    </div>

                    <div className={styles.inputForm}> 
                        
                        {/* <div className={styles.formIcons}>
                            <img src={showPassword ? visible : invisible} alt="password" onClick={()=>handlePass()}/>
                        </div>   */}
                        
                        <input 
                            type={showPassword ? 'text' : 'password'}
                            id='password'
                            name='password'
                            value={useData.password}
                            onChange={handleChange}
                            placeholder="Tu contraseña"
                            />
                    </div>

                    <div className={styles.spanError}>
                        <span>{errors.password}</span> 
                    </div>

                    <div className={styles.inputForm}> 
                        
                        {/* <div className={styles.formIcons}>
                            <img src={showPassword ? visible : invisible} alt="confirmPassword" onClick={()=>handlePass()}/>
                        </div>   */}
                        
                        <input 
                            type={showPassword ? 'text' : 'password'}
                            id='confirmPassword'
                            name='confirmPassword'
                            value={useData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirme contraseña"
                            />  
                    </div>

                    <div className={styles.spanError}>
                        <span>{errors.confirmPassword}</span> 
                    </div> 

                    <div>
                        <button className={styles.btn}>go!</button>
                    </div>

                </form>
                {/* <p>Ya tienes tu cuenta? <span onClick={()=>{handleRegister()}}> Ingresa aqui</span> .</p> */}
        </div>
    )

}

export default RegisterForm;