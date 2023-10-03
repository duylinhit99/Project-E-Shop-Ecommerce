import { useContext, useEffect, useState } from "react";
import Api from "../../Api";
import { Link } from "react-router-dom";
import { UserContext } from "../../UseContext";
import { useDispatch} from "react-redux"
import { addCart, tangCart } from "../../actions/cart";
function Cart(props){
    const xx = useContext(UserContext)
    const dispatch = useDispatch();
    const cart = JSON.parse(localStorage.getItem("cart"))
    let url = "product/cart";
    const [data , setData] = useState({})
    const [tongTotal, settongTotal] = useState("")
    useEffect(()=>{
        Api.post(url, cart)
        .then(res=>{
            setData(res.data.data)
            console.log(res)
        })
        .catch((error)=>console.log(error))
    },[])

    useEffect((e)=>{
        let tongTotal = 0
        Object.keys(data).map((item,i)=>{
            tongTotal += data[item].price * data[item].qty
        })
        settongTotal(tongTotal)
    })
    // xử lý sự kiên click +
    function hanldeTang(e){
        // lấy id của + 
        const getId = e.target.id
        // copy ra data moi 
        let newData =  [...data];
        Object.keys(newData).map((item, index)=>{
            if(getId == newData[item].id){
                newData[item].qty +=1; 
            }
        })
        console.log(newData);
        setData(newData)
        // lấy local ra
        let cart = localStorage.getItem("cart")
        if(cart){
            cart = JSON.parse(cart)
            Object.keys(cart).map((key , index)=>{
                if(getId == key){
                    cart[getId] +=1
                }
            })
        }
        console.log(cart)
        // lưu lại vào local
        localStorage.setItem("cart" , JSON.stringify(cart))
        // lấy local tongQty ra
        let tongQty = 0
        Object.keys(cart).map((item , i)=>{
            tongQty+= cart[item]
        })
        // xx.getQty(tongQty)

        // tính tong qty ( redux)
        const action = tangCart(tongQty)
        dispatch(action)
    }
    // sự kien -
    function hanldeGiam(e){
        const getId = e.target.id
        // tạo 1 biến newData để copy data 
        let newData = [...data]
        Object.keys(newData).map((item, i)=>{
            // kiểm tra
            if(getId == newData[item].id){
                // giảm qty
                newData[item].qty -= 1
            }
            if(newData[item].qty < 1){
                delete newData[item]
            }
        })
        setData(newData)
        // lấy cart từ local về
        let cart = localStorage.getItem("cart")
        if(cart){
            cart = JSON.parse(cart)
            Object.keys(cart).map((item,i)=>{
               if(getId == item){
                    cart[item] -= 1
               }
               if(cart[item] < 1){
                 delete cart[item]
               }
            })
        }
        localStorage.setItem("cart" , JSON.stringify(cart))

        let tongQty = 0
        Object.keys(cart).map((item, i)=>{
            tongQty += cart[item]
        })
        xx.getQty(tongQty)
    }
    // xóa 
    function handleDelete(e){
        // kiểm tra id
        let getId3 = e.target.id
        console.log(getId3)
        // tạo newData
        let newData = [...data]
        Object.keys(newData).map((item , i)=>{
            if(getId3 == newData[item].id){
                delete newData[item]
            }
        })
        console.log(newData);
        // lấy local ra
        let cart = localStorage.getItem("cart")
        if(cart){
            cart = JSON.parse(cart)
            Object.keys(cart).map((key , index)=>{
                if(getId3 == key){
                    delete cart[getId3]
                }
            })
        }
        console.log(cart)
        // lưu lại vào local
        localStorage.setItem("cart" , JSON.stringify(cart))
    }
    function renderDataCart(){
        if(Object.keys(data).length > 0){
            return Object.keys(data).map((item , i )=>{
                const imgArr = JSON.parse(data[item].image)
                const imgFirst = imgArr[0]
                return(
                    <>
						    <tr>
							    <td class="cart_product">
							    	<Link href="">
                                        <img 
                                            src={"http://localhost:8080/laravel8/laravel8/public/upload/product/" + data[item].id_user + "/" + imgFirst}
                                            style={{width : "100px"}}
                                            alt=""/>
                                    </Link>
							    </td>
							    <td class="cart_description">
							    	<h4><a href="">{data[item].name}</a></h4>
							    	<p>Web ID: {data[item].web_id}</p>
							    </td>
							    <td class="cart_price">
							    	<p>{data[item].price}</p>
							    </td>
							    <td class="cart_quantity">
							    	<div class="cart_quantity_button">
							    		<Link class="cart_quantity_up" id={data[item].id} onClick={hanldeTang}> + </Link>
							    		<input class="cart_quantity_input" type="text" name="quantity" value={data[item].qty} autocomplete="off" size="2"/>
							    		<Link class="cart_quantity_down" id={data[item].id} onClick={hanldeGiam}> - </Link>
							    	</div>
							    </td>
							    <td class="cart_total">
							    	<p class="cart_total_price" id = {data[item].id}>{data[item].qty * data[item].price}</p>
							    </td>
							    <td class="cart_delete">
							    	<Link class="cart_quantity_delete" id={data[item].id} onClick={handleDelete}><i class="fa fa-times"></i></Link>
							    </td>
						    </tr>   
                    </>
                )
            })
        }
    }
    function renderTongTotal(){
        return(
            <>
                <ul>
				    <li>Cart Sub Total <span>$59</span></li>
				    <li>Eco Tax <span>$2</span></li>
				    <li>Shipping Cost <span>Free</span></li>
				    <li>Total <span>{tongTotal}</span></li>
				</ul>
                <a class="btn btn-default update" href="">Update</a>
				<a class="btn btn-default check_out" href="">Check Out</a>
            </>
        )
    }
    return(
        <>
        <section id="cart_items">
            <div class="container">
                <div class="breadcrumbs">
				    <ol class="breadcrumb">
				        <li><a href="#">Home</a></li>
				        <li class="active">Shopping Cart</li>
				    </ol>
			    </div>
                <div class="table-responsive cart_info">
                    <table class="table table-condensed">
                        <thead>
						    <tr class="cart_menu">
							    <td class="image">Item</td>
							    <td class="description"></td>
							    <td class="price">Price</td>
							    <td class="quantity">Quantity</td>
							    <td class="total">Total</td>
							    <td></td>
						    </tr>
					    </thead>
                        <tbody>
                            {renderDataCart()}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
        <section id="do_action">
		            <div class="container">
			            <div class="heading">
			            	<h3>What would you like to do next?</h3>
				            <p>Choose if you have a discount code or reward points you want to use or would like to estimate your delivery cost.</p>
			            </div>
			            <div class="row">
				            <div class="col-sm-6">
				    	        <div class="chose_area">
					            	<ul class="user_option">
						               	<li>
						             		<input type="checkbox"/>
						            		<label>Use Coupon Code</label>
						             	</li>
						        	<li>
							        	<input type="checkbox"/>
							           	<label>Use Gift Voucher</label>
							        </li>
						        	<li>
							          	<input type="checkbox"/>
							          	<label>Estimate Shipping & Taxes</label>
							        </li>
						        </ul>
						        <ul class="user_info">
						    	    <li class="single_field">
						    	    	<label>Country:</label>
							        	<select>
								        	<option>United States</option>
								    	    <option>Bangladesh</option>
								    	    <option>UK</option>
								    	    <option>India</option>
								    	    <option>Pakistan</option>
								    	    <option>Ucrane</option>
								    	    <option>Canada</option>
								    	    <option>Dubai</option>
								        </select>
							        </li>
						    	    <li class="single_field">
							        	<label>Region / State:</label>
							        	<select>
								         	<option>Select</option>
								        	<option>Dhaka</option>
								        	<option>London</option>
								        	<option>Dillih</option>
								        	<option>Lahore</option>
								        	<option>Alaska</option>
								    	    <option>Canada</option>
								    	    <option>Dubai</option>
								        </select>
							        </li>
							        <li class="single_field zip-field">
							           <label>Zip Code:</label>
							          <input type="text"/>
							        </li>
						        </ul>
						            <a class="btn btn-default update" href="">Get Quotes</a>
					        	    <a class="btn btn-default check_out" href="">Continue</a>
					        </div>
				        </div>
				        <div class="col-sm-6">
				        	<div class="total_area">
				       	    	{renderTongTotal()}
					        </div>
				        </div>
			        </div>
		        </div>
	        </section>
        </>
    )
}
export default Cart;