import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Api from "../../Api";
function MyProduct(){
    let url = "user/my-product"
    const accessToken = JSON.parse(localStorage.getItem("accessToken"))
    let config = {
        headers : {
            'Authorization' : 'Bearer ' + accessToken,
            'Content-Type' : 'application/x-www-form-urlencoded',
            'Accept' : 'application/json'
        }
    }

    const [data , setData] = useState({})
    useEffect(()=>{
        Api.get(url , config)
        .then(response=>{
            setData(response.data.data)
            console.log(response)
        })
        .catch((error) => console.log(error))
    },[])  
    
    const handleDelete = (productId) =>{
        console.log(productId)
        let url = "user/product/delete/"
        const accessToken = JSON.parse(localStorage.getItem("accessToken"))
        let config = {
            headers : {
                'Authorization' : 'Bearer ' + accessToken,
                'Content-Type' : 'multipart/form-data',
                'Accept' : 'application/json'
            }
        }
            Api.get(url + productId , config)
            .then((response)=>{
                setData(response.data.data)
            })
            .catch((error)=>console.log(error))   
    }
    
    function renderMyProdcuct(){
        if(Object.keys(data).length > 0){
            return Object.keys(data).map((key, index)=>{
                const imgArr = JSON.parse(data[key].image)
                const imageFirst = imgArr[0]
                return(
                    <>
                        <tr key={key}>
                            <td>{data[key].id}</td>
                            <td>{data[key].name}</td>
                            <td><img class="image_my_product" src={"http://localhost:8080/laravel8/laravel8/public/upload/product/" + data[key].id_user + "/" + imageFirst} alt=""/></td>
                            <td>{data[key].price}</td>
                            <td>
                                <Link id="action-product" to={"/account/product/edit/" + data[key].id}><i class="fas fa-edit"></i></Link>
                                <Link id="action-product" onClick={() => handleDelete(data[key].id)}><i class="fas fa-trash-alt"></i></Link>
                            </td>
                        </tr>
                    </>

                )
            })
             
        }
    }
    return(
        <>
            <div className="content-product">
                <table className="table_product">
                    <tr class="title-product">
                        <th>Id</th>
                        <th>Name</th>
                        <th>Image</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                    {renderMyProdcuct()}
                </table>
                
            </div>
            <div className="buttom-add">
                <button type="submit" class="btn btn-default add-product"><Link to={"/account/product/add"}>Add</Link></button>
            </div>
        </>
    )
}
export default MyProduct;