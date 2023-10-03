import { useEffect, useState } from "react";
import Error from "./Error";
import Api from "../../Api"
function Account(){
    const [err , setErrror] = useState({})
    const [getAvatar , setAvatar] = useState()
    const [getFile , setFile] = useState("")
    const [user , setUser] = useState({
        name : "",
        email: "",
        password : "",
        phone : "", 
        address : "",
        avatar : "",
        level : ""
    })
    useEffect(()=>{
        let userData = localStorage.getItem("appState")
        if(userData){
            userData = JSON.parse(userData)
            setUser({
                name : userData.name,
                email : userData.email,
                phone : userData.phone,
                address : userData.address,
            })
        }
    },[])
    function handleInputs(e){
        let getName = e.target.name
        let getValue = e.target.value
        setUser(state=>({...state, [getName]: getValue}))
    }
    function handleFiles(e){
        let file = e.target.files;
        let render = new FileReader()
        render.onload = (e) =>{
            setAvatar(e.target.result)
            setFile(file[0])
        }
        render.readAsDataURL(file[0])
    }
    function hanldeSubmit(e){
        e.preventDefault()
        let flag = true
        let errorSubmit = {}
        if(user.name == ""){
            errorSubmit.name = "Name không được bỏ trống"
            flag = false
        }
        if(user.phone == ""){
            errorSubmit.phone = "Phone không được bỏ trống"
            flag = false
        }
        if(user.address == ""){
            errorSubmit.address = "Address không được bỏ trống"
            flag = false
        }
        if(getFile.length == 0){
            errorSubmit.avatar = "Avatar không được bỏ trống"
            flag = false
        }else{
            let nameFile = getFile['name']
            let sizeFile = getFile['sizeFile']
            if(sizeFile > 1024*1024){
                errorSubmit.avatar = "File quá lớn"
                flag = false
            }

            let tailFileList = ["jpg" , "png" , "jpeg" , "PNG" ,"JPG"]
            let tailFile = nameFile.split(".")
            let tailFiles = tailFile[1]
            let checkFile = tailFileList.includes(tailFiles)
            if(!checkFile){
                errorSubmit.avatar = "File không hợp lệ"
                flag = false
            }
        }
        if(!flag){
            setErrror(errorSubmit)
        }else{
            setErrror("")
        }
        if(flag){
            let url = "user/update/"
            const userData = JSON.parse(localStorage.getItem("appState"))
            const accessToken = JSON.parse(localStorage.getItem("accessToken"))
            let config = {
                headers: {
                    'Authorization' : 'Bearer ' + accessToken,
                    'Content-Type' : 'application/x-www-form-urlencoded',
                    'Accept' : 'application/json'
                }
            }
            const formData = new FormData()
                formData.append('name' , user.name)
                formData.append('email' , user.email)
                formData.append('password' , user.password ? user.password : "")
                formData.append('phone' , user.phone)
                formData.append('address' , user.address)
                formData.append('avatar' , getAvatar)
                formData.append('level' , 0)
            Api.post(url + userData.id , formData , config)
            .then(response=>{
                if(response.data.errors){
                    setErrror(response.data.errors)
                }else{
                    console.log(response.data.Auth)
                    localStorage.setItem("appState" , JSON.stringify(response.data.Auth))
                    localStorage.setItem("accessToken" , JSON.stringify(response.data.token))
                }
            })
            .catch((error)=>console.log(error))
        }
    }
    return(
        <div class="col-sm-4">
				<div class="signup-form">
                    <Error err={err}/>
					<h2>User Update!</h2>
					<form onSubmit={hanldeSubmit}>
						<input type="text" value={user.name} name="name" placeholder="Name" onChange={handleInputs}/>
						<input type="email" value={user.email} name="email" readOnly placeholder="Email" onChange={handleInputs}/>
						<input type="password" value={user.password} name="password" placeholder="Password" onChange={handleInputs}/>
                        <input type="text" value={user.phone} name="phone" placeholder="Phone" onChange={handleInputs}/>
                        <input type="text" value={user.address} name="address" placeholder="Address" onChange={handleInputs}/>
                        <input type="file" name="avatar" placeholder="Avatar" onChange={handleFiles}/>
                        <select name="level" onChange={handleInputs}>
                            <option>0</option>
                            <option>1</option>
                         </select>
						<button type="submit" class="btn btn-default">Signup</button>
					</form>
				</div>
			</div>
    )
}
export default Account;