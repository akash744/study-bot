import React from 'react';  


function LoginForm(){


    return(
		<div class="cont">
			<div class="form sign-in">
				<h2>Sign In</h2>
      			<label>
				  <span>Email Address</span>
				  <input type="email" name="email"></input>
				</label>
				<label>
					<span>Password</span>
					<input type="password" name="password"></input>
      			</label>
				<button class="submit" type="button">Sign In</button>
				<p class="forgot-pass">Forgot Password ?</p>

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

export default LoginForm;