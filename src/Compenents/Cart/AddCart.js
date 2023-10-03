import { useEffect,useContext } from "react";
import { Link } from "react-router-dom";
import Api from "../../Api";
import { UserContext } from "../../UseContext";
import { useDispatch } from "react-redux";
import { addToCart } from "../../actions/cart";

function AddCart(props){
    let {id} = props
    //const xx = useContext(UserContext)
    const dipatch = useDispatch();
    function hanldeCart(){
         // get local ( cart ) xuống để kiểm tra     
        const cart = JSON.parse(localStorage.getItem("cart") || "{}")
        // trả về true thì tăng qty lên 1
        if(cart[id]){
            cart[id] += 1
        }else{
            cart[id] = 1
        }
        localStorage.setItem("cart" , JSON.stringify(cart))
        let tongQty = 0
        if(Object.keys(cart).length > 0){
            Object.keys(cart).map((item , i)=>{
                tongQty = tongQty + cart[item]
            })
        }
        // // xx.getQty(tongQty)
        const action = addToCart(tongQty)
        dipatch(action)
    }
    return(
        <>
            <Link type="button" class="btn btn-fefault cart" onClick={hanldeCart}>
		        <i class="fa fa-shopping-cart"></i>
			    Add to cart
	        </Link>
        </>
        
   )
}
export default AddCart;