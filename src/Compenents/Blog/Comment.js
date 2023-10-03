import { useState } from 'react';
import {Link, useParams} from 'react-router-dom'
import Api from '../../Api';
function Comment(){
	const params = useParams()
	const [comment , setComment] = useState("")
	function hanldeComment(e){
		setComment(e.target.value)
	}
	function hanldePostComment(e){
		// cho form dừng lại
		e.preventDefault()
		const checkLogin = localStorage.getItem("true")
		if(!checkLogin){
			alert("Bạn chưa login")
		}else{
			let  url = "blog/comment/id"
			const userData = JSON.parse(localStorage.getItem("appState"))
			const accessToken = JSON.parse(localStorage.getItem("accessToken"))
			let config = {
				headers : {
					'Authorization' : 'Bearer ' + accessToken,
					'Content-Type' : 'application/x-www-form-urlencoded',
					'Accept': 'application/json'
				}
			}
			if(comment){
				const formData = new FormData()
					formData.append('id_blog' , params.id)
					formData.append('id_user' , userData.id)
					formData.append('id_comment' , 0)
					formData.append('comment', comment)
					formData.append('image_user' , userData.avatar)
					formData.append('name_user', userData.name)
					Api.post(url , formData , config)
					.then(response=>{
						console.log(response)
					})
					.catch((error)=>console.log(error))
			}else{
				alert("Bạn chưa nhập bình luận")
			}
				
		}
	}
    return(
        <div class="replay-box">
			<div class="row">
				<div class="col-sm-12">
					<h2>Leave a replay</h2>
					<div class="text-area">
						<div class="blank-arrow">
							<label>Your Name</label>
						</div>
						<span>*</span>
						<textarea onChange={hanldeComment} name="message" rows="11"></textarea>
						<Link class="btn btn-primary" to="" onClick={hanldePostComment}>post comment</Link>
					</div>
				</div>
			</div>
		</div>
    )
}
export default Comment;