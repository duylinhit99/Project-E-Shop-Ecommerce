import Head from './Compenents/Layout/Head';

import Footer from './Compenents/Layout/Footer';
import MenuLeft from './Compenents/Layout/MenuLeft';
import Slider from './Compenents/Layout/Slider';
import { useLocation } from 'react-router-dom';
import MenuAcc from './Compenents/Layout/MenuAcc';
import MenuLeftCart from './Compenents/Layout/MenuLeftCart';
// import { useState } from 'react';
// import { UserContext } from './UseContext';
import { Provider } from 'react-redux';
import store from './store';
function App(props) {
  let params = useLocation()
  // const [tongQty , setQty] = useState(0)

  // function getQty(data){
  //     console.log(data)
  //     setQty(data)
  //     localStorage["tongQty"] = JSON.stringify(data)
  // }


  function handleMenu(){
      if(params['pathname'].includes('/account')){
        return(
          <MenuAcc/>
        )
      }else if (params['pathname'].includes('/cart')){
        return(
          <MenuLeftCart/>
        )
      }else{
        return(
          <MenuLeft/>
        )
      }
  }
  return (
    <>
      {/* <UserContext.Provider value={{
           tongQty:tongQty,
           getQty:getQty
        }}
      
      > */}
      <Provider store={store}>
        <Head/>
           <Slider/>
              <section id='slider'>
                  <div class='row'>
                      {handleMenu()}
                      {props.children}
                  </div>
             </section>
        <Footer/>
      </Provider>
        
      {/* </UserContext.Provider> */}
       
    </>
  );
}

export default App;
