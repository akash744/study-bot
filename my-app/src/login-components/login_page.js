import React from 'react';  
import LoginForm from './login_form'

function LoginPage(){
    return(
        <div className="login_pages" >
            <div className="login_form">
                <LoginForm />
            </div>
        </div>
    )      
}

export default LoginPage;