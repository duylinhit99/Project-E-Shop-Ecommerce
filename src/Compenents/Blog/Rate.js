import StarRatings from "react-star-ratings";
import { useEffect, useState } from "react"; 
import Api from "../../Api";
import { useParams } from "react-router-dom";
    function Rate(){
        const [rating, setRating] = useState(0)
        let params = useParams()
        function changeRating( newRating, name ) {
          setRating(newRating)
          // - xu ly logic
          // - xu ly api
            const checkLogin = localStorage.getItem("true")
            if(!checkLogin){
                alert("Bạn chưa login")
            }else{
                const userData = JSON.parse(localStorage.getItem("appState"))
                const accessToken = JSON.parse(localStorage.getItem("accessToken"))
                let url = "blog/rate/"
                let config = {
                  headers : {
                    'Authorization' : 'Bearer ' + accessToken,
                    'Content-Type' : 'application/x-www-form-urlencoded',
                    'Accept' :'application/json'
                  }
                }
                const rate = new FormData()
                  rate.append('user_id' , userData.id)
                  rate.append('blog_id' , params.id)
                  rate.append('rate' , newRating)
                Api.post(url + params.id , rate, config)
                .then(response=>{
                    console.log(response)
                })
                .catch((error)=>console.log(error))
            }
        }

        let url = "blog/rate/" 
        useEffect(()=>{
          Api.get(url + params.id)
          .then(response=>{

            // tính điểm tbc trong này
            
            let tongRate =0
            let tongID = response.data.data
            tongID.map(function(value, key){
                 tongRate = tongRate + value.rate
            })

            let tbcRate = tongRate/tongID.length
            setRating(tbcRate)

          })
          .catch((error)=>console.log(error))
        },[url])
        return (
          <StarRatings
            rating={rating}
            starRatedColor="blue"
            changeRating={changeRating}
            numberOfStars={6}
            name='rating'
          />
        );
       
    }
    export default Rate;		
					
					
					
					
					
					
					
					
					
					
					
					