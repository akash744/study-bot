import React, { Component } from 'react';  
import GoogleLogin from 'react-google-login';


class LoginForm extends Component{

	responseGoogle=(response)=>{
		console.log(response);
		console.log(response.profileObj);
	  }

	render(){
		return(
			<div class="cont">
				<div class="form sign-in">
					<h1 id='logo'>
						Study-Bot
					</h1>
					<h2 id='slogan-line-1'>Artificial Intelligence Driving</h2>
					<h2 id='slogan-line-2'>Results for Studying</h2>
					<h3 id= 'subtitle'>Welcome Please Sign In Or Sign Up.</h3>
					  <label>
					  <input type="email" placeholder="Email" ></input>
					</label>
					<label>
						<input type="password" placeholder="Password" ></input>
					  </label>
					<div id="sign-in-sign-up">
						  <button class="submit" type="button">Sign In</button>
						<button class="submit" type="button">Sign Up</button>
					</div>
					<div id="google-login">
						<h5>Or Sign In With</h5>	
						<GoogleLogin
						clientId="631622997506-c5cgjg1hl5nqe8mdjlhqa05qiofo27d8.apps.googleusercontent.com"
						buttonText="Login"
						onSuccess={this.responseGoogle}
						onFailure={this.responseGoogle}
						cookiePolicy={'single_host_origin'}
	
						/>
					</div>
	
				</div>	
				<div class="sub-cont">
					<div class="img">
						<div class="img-text m-up">
							<h2>New here?</h2>
							  <p>Sign up and discover great amount of new opportunities!</p>
						</div>
					</div>
				</div>
			</div>	
		)
	}  
}

export default LoginForm;