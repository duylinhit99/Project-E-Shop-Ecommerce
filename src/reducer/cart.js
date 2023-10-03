const initalState = {
    tongQty : 0
}

// Reducer nhận vào 2 giá trị state , action
const cartReducer = (state  = initalState, action) =>{
    console.log(action.type)
    switch(action.type){
        case "ADD_TO_CART": {
            // khi liên quan đến obj/arr thì clone ra 1  obj mới
            //const newList = [...state.list]
            let tong = action.payload;
            // alert(tong)
            //=>đưa vào local
            return {
                tongQty:tong
            }
        }
        case "TANG_CART" : {
            let tong = action.payload

            return {
                tongQty : tong
            }
        }
        // context
        default :
            return state ;
    }
}
export default cartReducer;