import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Api from "../../Api";

function EditProduct(){
    // phương thức useParams lấy id trên url
    let params = useParams()
    const navigate = useNavigate()
    // API 
    let urlShowProd = "user/product/"
    //API update product
    let urlUpdateProd = "user/product/update/"
    let urlCate_Brand = "category-brand"
    // lưu giá trị input vào state
    const [getInputs , setInputs] = useState({
        name: "",
        price : "",
        category : "",
        brand : "",
        status : 1,
        sale : 0,
        company : "",
        avatar : "",
        avatarCheckbox : "",
        detail : ""
    })
    // lưu giá trị category
    const [dataCate , setDataCate] = useState("")
    // lưu giá trị brand
    const [dataBrand , setDataBrand] = useState("")
    // lưu giá trị image lấy từ api về
    const [dataImg , setDataImg] = useState("")
    // lấy id của User
    const [userData , setUserData]  = useState("")
    // lưu toàn bộ value file 
    const [file , setFile] = useState([])
    // lưu giá trị image của checkBox
    const [deleteImg , setdeleteImg] = useState([])
    const [err , setError] = useState({})
    
    const accessToken = JSON.parse(localStorage.getItem("accessToken"))
    let config = {
        headers : {
            'Authorization' : 'Bearer ' + accessToken,
            'Content-Type' : 'application/x-www-form-urlencoded',
            'Accept' : 'application/json' 
        }
    }
    useEffect(()=>{
        Api.get(urlShowProd + params.id , config)
        .then(res=>{
            let productData = res.data.data
            setInputs({
                name : productData.name,
                price : productData.price,
                category : productData.id_category,
                brand : productData.id_brand,
                status : productData.status,
                sale : productData.sale,
                company : productData.company_profile,
                detail : productData.detail
            })
            setDataImg(productData.image)
            setUserData(productData.id_user)
            
        })
        .catch(error=>console.log(error))
    },[])

    useEffect(()=>{
        Api.get(urlCate_Brand)
        .then(res=>{
            setDataCate(res.data.category)
            setDataBrand(res.data.brand)
        })
        .catch((error)=>console.log(error))
    },[])

    function renderCategory(){
        if(dataCate.length > 0){
            return dataCate.map((value, key)=>{
                return(
                    <>
                        <option value={value.id} key={key}>{value.category}</option>
                    </>
                    
                )
            })
        }
    }
    function renderBrand(){
        if(dataBrand.length > 0){
            return dataBrand.map((value, key)=>{
                return(
                    <>
                        <option value={value.id} key={key}>{value.brand}</option>
                    </>
                )
            })
        }
    }
    function handleImage(){
        if(dataImg.length > 0){
            return dataImg.map((value, key)=>{
                return(
                    <li key={key} style={{width:"100px", height:"100px"}}>
                       <label>
                            <img class="image_my_product" src={"http://localhost:8080/laravel8/laravel8/public/upload/product/"+ userData +"/" + value}/>
                            <input type="checkbox" value={value} name="avatarCheckbox"  onChange={()=>handleCheckBox(value)}/>
                        </label>
                    </li>
                )
            })
        }
    }
    function handleStatus(){
        if(getInputs.status == 0){
            return(
                <>
                    <input type="text" id="value_sale" value={getInputs.sale} name="sale"  placeholder="0" onChange={handleInputs}/>%
                </>
            )
        }
    }
    function handleCheckBox(nameImage){
        if(deleteImg.includes(nameImage)){
            setdeleteImg(deleteImg.filter((name) => name !== nameImage))
        }else{
            setdeleteImg([...deleteImg , nameImage])
        }
    }
    const handleInputs = (e) => {
        const getName = e.target.name
        const getValue = e.target.value
        setInputs(state=>({...state, [getName]: getValue}))
    }
    function handleFile(e){
        const files = e.target.files
        const newFile = [...file , ...files]
        setFile(newFile)
        setInputs(state=>({...state , avatar : newFile}))
    }
    function hanldeSubmit(e){
        e.preventDefault()
        let errorProd = {}
        let flag = true;

        if(getInputs.name == ""){
            errorProd.name = "Bạn chưa nhập name";
            flag = false;
        }
        if(getInputs.category == ""){
            errorProd.category = "Bạn chưa chọn Category";
            flag = false;
        }
        if(getInputs.brand == ""){
            errorProd.brand = "Bạn chưa chọn brand"
            flag = false
        }
        if(getInputs.company == ""){
            errorProd.company = "Bạn chưa nhập Company"
            flag = false
        }
        if(file.length == 0){
            errorProd.avatar = "Bạn chưa chọn Avatar"
            flag =false
        }else{
            const typeFile = ['jpg' , 'png' , 'jpeg' , 'PNG' , 'JPG']
            Object.keys(file).map((item , i)=>{
                let nameFile = file[0].name
                let sizeFile = file[0].size
                if(sizeFile > 1024*1024){
                    errorProd.avatar = "Kích thước file lớn"
                    flag = false
                }
                let nameFiles = nameFile.split(".")
                let typeFiles = nameFiles[1]
                const checkFile = typeFile.includes(typeFiles)
                if(!checkFile){
                    errorProd.avatar = "File không hợp lệ"
                    flag = false
                }
            })
        }
        if(getInputs.detail == ""){
            errorProd.detail = "Bạn chưa nhập Detail"
            flag = false
        }

        if(!flag){
            setError(errorProd)
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
                formData.append ('price' , getInputs.price)
                formData.append('category' , getInputs.category)
                formData.append ('name' , getInputs.name)
                formData.append('brand' , getInputs.brand)
                formData.append('status' , getInputs.status)
                formData.append('sale' , getInputs.sale)
                formData.append('company' , getInputs.company)
                formData.append('detail' , getInputs.detail)
                Object.keys(file).map((item , i)=>{
                    formData.append('file[]' , file[item])
                })
                Object.keys(deleteImg).map((item , i)=>{
                    formData.append('avatarCheckBox[]' , deleteImg[item])
                })
            let url = "user/product/update/"
            Api.post(url + params.id , formData , config)
            .then(res=>{
                if(res.data.errors){
                    console.log(res.data.errors)
                }else{
                    console.log(res)
                    navigate("/account/product-list")
                }
            })
            .catch((error)=>console.log(error))
        }
    }
    return(
        <>
            <div class="col-sm-4">
				<div class="signup-form">   
                  
					<h2>New User Signup!</h2>
					<form onSubmit={hanldeSubmit}>
						<input type="text" value={getInputs.name} name="name" placeholder="Name" onChange={handleInputs}/>
						<input type="text" value={getInputs.price} name="price" placeholder="Price" onChange={handleInputs}/>
						<select name="category" value={getInputs.category} onChange={handleInputs}>
                            <option value="">Please schoose category</option>
                            {renderCategory()}
                        </select>
                        <select name="brand" value={getInputs.brand} onChange={handleInputs}>
                            <option value="">Please schoose brand</option>
                            {renderBrand()}
                        </select>
                        <select name="status" value={getInputs.status} onChange={handleInputs}>
                            <option value="0">Sale</option>
                            <option value="1">New</option>
                        </select>
                        {handleStatus()}
                        <input type="text" value={getInputs.company} name="company" placeholder="Company profile" onChange={handleInputs}/>
                        <input type="file" id="files" name="avatar" multiple onChange={handleFile}/>
                        <ul style={{display :"flex" , alignItems : "center" , justifyContent : "space-between"}}>
                            {handleImage()}
                        </ul>
                        <textarea name="detail" value={getInputs.detail} placeholder="Detail" onChange={handleInputs}></textarea>
						<button type="submit" class="btn btn-default">Signup</button>
					</form>
				</div>
			</div>
        </>
    )
}
export default EditProduct;