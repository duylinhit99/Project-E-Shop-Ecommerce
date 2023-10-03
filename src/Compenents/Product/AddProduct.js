import { useEffect, useState } from "react";
import Api from "../../Api";
import Error from "../Member/Error";
import { useNavigate } from "react-router-dom";

function AddProduct(){
    // phương thức dùng để chuyển trang 
    const navigate = useNavigate()
    // lưu trữ giá trị category vào state
    const [dataCategory , setDataCategory] = useState("")
    // lưu brand vào state
    const [dataBrand , setDataBrand] = useState("")
    // lưu file ảnh vào state
    const [file , setFile] = useState([])
    // lưu giá trị input vào state
    const [getInput , setInput] = useState({
        name : "",
        price : "",
        category : "",
        brand : "",
        status : 1,
        sale : 0,
        company : "",
        avatar : "",
        detail : ""
    })
    // lưu lỗi vào state
    const [err , setError] = useState({})
    // get API category-brand
    useEffect(()=>{
        Api.get('/category-brand')
        .then(response=>{
            setDataCategory(response.data.category)
            setDataBrand(response.data.brand)
        })
        .catch(error=>console.log(error))
    },[])

    // xử lý input Category
    function renderCategory(){
        if(dataCategory.length > 0){
            return dataCategory.map((value, key)=>{
                return(
                    <option key={key} value={value.id}>{value.category}</option>
                )
            })
        }
    }
    // xử lý input Brand
    function renderBrand(){
        if(dataBrand.length > 0){
            return dataBrand.map((value , key)=>{
                return(
                    <option key={key} value={value.id}>{value.brand}</option>
                )
            })
        }
    }

    // xử lý input sale
    function renderStatus(){
        if(getInput.status == 0){
            return(
                <>
                    <input type="text" id="value_sale" value={getInput.sale} name="sale"  placeholder="0" onChange={handleInputs}/>%
                </>
            )
        }
    }

    // xử lý input ( lấy giá trị name and value của từng input)
    function handleInputs(e){
        let getName = e.target.name
        let getValue = e.target.value
        setInput(state=>({...state, [getName]:getValue}))
    }

    // hàm xử lý file
    function handleFile(e){
        const files = e.target.files
        const newFile = [...file , ...files];
        setFile(newFile)
        setInput(state=>({...state, avatar : newFile}))
    }


    // xử lý nút submit
    function hanldeSubmit(e){
        e.preventDefault()
        let flag = true;
        let errorSubmit = {}

        if(getInput.name == ""){
            errorSubmit.name = "Name không được để trống"
            flag = false;
        }
        if(getInput.price == ""){
            errorSubmit.price = "Price không được để trống"
            flag = false
        }
        if(getInput.category == ""){
            errorSubmit.category = "Category không được để trống"
            flag = false
        }
        if(getInput.brand == ""){
            errorSubmit.brand = "Brand không được để trống"
            flag = false
        }
        if(getInput.company == ""){
            errorSubmit.company = "Company không được để trống"
            flag = false
        }
        if(file.length == 0){
            errorSubmit.avatar = "Avatar không được để trống"
            flag = false
        }else{
            Object.keys(file).map((item, i)=>{
                let nameFile = file[0]['name']
                let sizeFile = file[0]['size']
                if(sizeFile > 1024*1024){
                    errorSubmit.avatar = "kích thước file lớn"
                    flag = false
                }
                if(file.length > 3){
                    errorSubmit.avatar = "Hình ảnh upload quá số lượng"
                    flag = false
                }
                const tailFileList = ["jpg" , "png" , "JPG" , "PNG" , "jpeg"]
                const tailFile = nameFile.split(".")
                console.log(tailFile)
                const tailFiles = tailFile[1]
                const checkFile = tailFileList.includes(tailFiles)
                if(!checkFile){
                    errorSubmit.avatar = "File không hợp lệ"
                    flag = false
                }
            })

        }
        if(getInput.detail == ""){
            errorSubmit.detail = "Detail không được để trống"
            flag = false
        }
        if(!flag){
            setError(errorSubmit)
        }else{
            setError("")
        }
        if(flag){
            const accessToken = JSON.parse(localStorage.getItem("accessToken"))
            let config = {
                headers : {
                    'Authorization' : 'Bearer ' + accessToken,
                    'Content-Type' : 'multipart/form-data',
                    'Accept' : 'application/json'
                }
            }
            let formData = new FormData()
                formData.append('name' , getInput.name)
                formData.append('price' , getInput.price)
                formData.append('category' , getInput.category)
                formData.append('brand' , getInput.brand)
                formData.append('status' , getInput.status)
                formData.append('sale' , getInput.sale)
                formData.append('company' , getInput.company)
                formData.append('detail' , getInput.detail)
                Object.keys(file).map((item , i)=>{
                    formData.append("file[]" , file[item])
                })
            let url = "user/product/add"
            Api.post(url,formData,config)
            .then(response=>{
                if(response.data.errors){
                    console.log(response.data.errors)
                }else{
                    console.log(response)
                    navigate("/account/product-list")
                }
                
            })
            .catch(error=>console.log(error))
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
						<input type="text" name="price" placeholder="Price" onChange={handleInputs}/>
						<select name="category" onChange={handleInputs}>
                            <option value="">Please schoose category</option>
                            {renderCategory()}
                        </select>
                        <select name="brand" onChange={handleInputs}>
                            <option value="">Please schoose brand</option>
                            {renderBrand()}
                        </select>
                        <select name="status" value={getInput.status} onChange={handleInputs}>
                            <option value="0">Sale</option>
                            <option value="1">New</option>
                        </select>
                        {renderStatus()}
                        <input type="text" name="company" placeholder="Company profile" onChange={handleInputs}/>
                        <input type="file" id="files" name="avatar" multiple onChange={handleFile}/>
                        <textarea name="detail" placeholder="Detail" onChange={handleInputs}></textarea>
						<button type="submit" class="btn btn-default">Signup</button>
					</form>
				</div>
			</div>
        </>

    )
}
export default AddProduct;