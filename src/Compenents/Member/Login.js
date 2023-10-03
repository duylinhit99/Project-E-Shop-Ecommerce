import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../../Api";
import Error from "./Error";

function Login(){
	const navigate = useNavigate()
	const [inputs , setInputs] = useState("")
	const [err , setError] = useState("")
	function handleInputs(e){
		const getName = e.target.name;
		const getValue = e.target.value
		setInputs(state=>({...state,[getName]:getValue}))
	}
	function handleSubmit(e){
		e.preventDefault()
		let flag = true;
		let errLogin = {}

		if(inputs.email == ""){
			errLogin.email = "Email không được để trống"
			flag = false
		}
		if(inputs.password == ""){
			errLogin.password = "Password không được để trống"
			flag = false
		}
		if(!flag){
			setError(errLogin)
		}else{
			setError("")
		}

		if(flag){
			let url = "login"
			const data = {
				email : inputs.email,
				password : inputs.password
			}
			Api.post(url, data)
			.then(response=>{
				if(response.data.errors){
					console.log(response.data.errors)
				}else{
					console.log(response)
					navigate("/")
					const True = JSON.stringify()
					localStorage.setItem("true" , True)
					
					const accessToken = JSON.stringify(response.data.token)
					localStorage.setItem("accessToken" , accessToken)
					
					const appState = JSON.stringify(response.data.Auth)
					localStorage.setItem("appState" , appState)
				}
			})
			.catch(error=>console.log(error))
		}
	}
    return(
        <div className="col-sm-4 col-sm-offset-1">
					<div class="login-form">
						<Error err={err}/>
						<h2>Login to your account</h2>
						<form onSubmit={handleSubmit}>
							<input type="email" name="email" placeholder="Email" onChange={handleInputs}/>
							<input type="password" name="password" placeholder="Password" onChange={handleInputs}/>
							<span>
								<input type="checkbox" class="checkbox"/> 
								Keep me signed in
							</span>
							<button type="submit" class="btn btn-default">Login</button>
						</form>
					</div>
				</div>
    )
}
export default Login;