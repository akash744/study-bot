import React from 'react';  


function LoginForm(){
    return(
        <div class="container" id="container">
	        <div class="form-container sign-in-container">
				<h1 id='logo'>
					Study-Bot
				</h1>
		        <form action="#">
			        <h2>Artificial Intelligence Driving Results for Studying</h2>
			        <h3 id= 'subtitle'>Welcome Please Sign In Or Sign Up.</h3>
			        <input type="email" placeholder="Email" />
			        <input type="password" placeholder="Password" />
					
					<div id="remember-me-forgot-pwd">
						<div id="remember-me">
							<input type="checkbox" id="remember_me"/>
							<label>
								Remember Me
							</label>
						</div>
						<div id="forgot-pwd">
							<a href="#"> Forgot Password ?</a>
						</div>
					</div>	
					<div id="sign-in-sign-up">
						<button>Sign In</button>
						<button>Sign Up</button>
					</div>
					<div id="external-sign-in">
						<h4>
							Or Sign In With 
						</h4>
					</div>
		        </form>
	        </div>  
			<div class="overlay-container">
				<div class="overlay">
					<div class="overlay-panel overlay-right">
						<h1>Hello</h1>
					</div>
				</div>
			</div>
        </div>
    )      
}

export default LoginForm;