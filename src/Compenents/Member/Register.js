import {useState} from 'react';
import Error from './Error';
import Api from '../../Api';
function Register(){
    const [inputs , setInputs] = useState({
        name: "",
        email: "",
        password : "",
        phone : "",
        address : "",
        avatar : "",
        level : 0
    })
    const [err , setError] = useState({})
    const [file , setFile] = useState("")
    const [getAvatar , setAvatar] = useState()
    function handleInputs(e){
        //lấy name của thẻ inputs từ form
        let getName = e.target.name;
        let getValue = e.target.value;
        //set vào setInputs
        setInputs(state =>({...state, [getName]:getValue}))
    }
    function handleFiles(e){
        const file = e.target.files;
        //send file to api server
        let render = new FileReader()
        render.onload = (e) =>{
            setAvatar(e.target.result)
            setFile(file[0])
        }
        console.log(file)
        render.readAsDataURL(file[0])
    }
    function hanldeSubmit(e){
        e.preventDefault();
        let flag = true;
        let errorRegister = {};

        if(inputs.name == "") {
            errorRegister.name = "Name không được để trống";
            flag = false;
        }
        if(inputs.email == ""){
            errorRegister.email = "Email không được bỏ trống";
            flag = false;
        }
        if(inputs.password == "") {
            errorRegister.password = "Password không được bỏ trống";
            flag = false;
        }
        if(inputs.phone == "") {
            errorRegister.phone = "Phone không được bỏ trống";
            flag = false;
        }
        if(inputs.address == ""){
            errorRegister.address = "Address không được để trống";
            flag = false;
        }
        if(file.length == 0){
            errorRegister.avatar = "Avatar không được để trống";
        }else{
            // lấy đuôi tên file
            let nameFile = file['name']
            // lấy size file
            let sizeFile = file['size']
            // ktra kích thước file
            if(sizeFile > 1024*1024){
                errorRegister.avatar = "Kích thước file quá lớn"
                flag = false;
            }
            const tailFileList = ["png" , "jpg" , "jpeg" , "PNG" , "JPG"]
            //tách đuôi nameFile
            let tailFile = nameFile.split(".")
            const tailFiles = tailFile[1]
            const checkFile = tailFileList.includes(tailFiles)
            console.log(checkFile)
            if(!checkFile){
                errorRegister.avatar = "File không hợp lệ"
                flag = false
            }
            
        }


        if(!flag){
            setError(errorRegister)
        }else{
            setError("")
        }

        if(flag){
            const data = {
                name : inputs.name, 
                email: inputs.email,
                password: inputs.password,
                phone : inputs.phone,
                address: inputs.address,
                avatar: getAvatar,
                level : 0
            }
            let url = "/register"
            //send data to api
            Api.post(url , data)
            .then(response=>{
                console.log(response)
            })
            .catch((error)=>console.log(error))
        }
    }
    return(
        <>
            <div class="col-sm-4">
				<div class="signup-form">
                    <Error err={err}/>
					<h2>New User Signup!</h2>
					<form onSubmit={hanldeSubmit}>
						<input type="text" name="name" placeholder="Name" onChange={handleInputs}/>
						<input type="email" name="email" placeholder="Email" onChange={handleInputs}/>
						<input type="password" name="password" placeholder="Password" onChange={handleInputs}/>
                        <input type="text" name="phone" placeholder="Phone" onChange={handleInputs}/>
                        <input type="text" name="address" placeholder="Address" onChange={handleInputs}/>
                        <input type="file" name="avatar" placeholder="Avatar" onChange={handleFiles}/>
                        <select name="level" onChange={handleInputs}>
                            <option>0</option>
                            <option>1</option>
                         </select>
						<button type="submit" class="btn btn-default">Signup</button>
					</form>
				</div>
			</div>
        </>
    )
}
export default Register;