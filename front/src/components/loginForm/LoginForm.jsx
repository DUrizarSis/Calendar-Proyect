import { useState } from "react";
import { validation } from "../../validation/validation";
import styles from "./loginForm.module.css"

const LoginForm = ({login}) => {

    const [useData, setUseData] = useState({
        email:'',
        password:''
     });
     const [errors, setError] = useState({});
     const [showLogin, setShowLogin] = useState(true);
     const [showPassword, setShowPassword] = useState(false);

     const handleChange = (e) =>{
        setError(validation({...useData,[e.target.name]:e.target.value}))
        setUseData({...useData, [e.target.name]: e.target.value})  
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        login(useData)
    }

    console.log(useData)

    return(

        <div>

           <h1>Sign in</h1>
           <form onSubmit={handleSubmit}>

                <div> 
                    
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
                <div>

                    <input 
                    type={showPassword ? 'text' : 'password'}
                    id='password'
                    name='password'
                    value={useData.password}
                    onChange={handleChange}
                    placeholder="tu password"
                    />  
                </div>

                <div className={styles.spanError}>
                    <span>{errors.password}</span>
                </div>

                <div>
                    <button>go!</button>
                </div>
                </form>
                <p>¿No tienes una cuenta?<span> Crea una</span> .</p>

        </div>
    )

}

export default LoginForm;