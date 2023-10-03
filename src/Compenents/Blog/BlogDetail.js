import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Api from "../../Api";
import Comment from "./Comment";
import ListComment from "./ListComment";
import Rate from "./Rate";

function BlogDetail(){
    let params = useParams()
    let urlBlogDetail = "/blog/detail/" 
    const [dataBlogDetail , setDataBlogDetail] = useState([])
    const [comment , setComment] = useState("")
    useEffect(()=>{
        Api.get(urlBlogDetail + params.id)
        .then(response =>{
           setDataBlogDetail(response.data.data)
           setComment(response.data.data.comment)
           console.log(response.data.data.comment)
        })
        .catch((error)=>console.log(error))
    },[])
    function handleBlogDetail(){
        if(Object.keys(dataBlogDetail).length > 0){
                return(
                    <div class="single-blog-post">
                    <h3>{dataBlogDetail.title}</h3>
                    <div class="post-meta">
                        <ul>
                            <li><i class="fa fa-user"></i> Mac Doe</li>
                            <li><i class="fa fa-clock-o"></i> 1:33 pm</li>
                            <li><i class="fa fa-calendar"></i> DEC 5, 2013</li>
                        </ul>
                    </div>
                    <a href=""><img src={"http://localhost:8080/laravel8/laravel8/public/upload/Blog/image/" + dataBlogDetail.image} alt=""/></a>
                    <p>{dataBlogDetail.content}</p>
                    <div class="pager-area">
                        <ul class="pager pull-right">
                            <li><a href="#">Pre</a></li>
                            <li><a href="#">Next</a></li>
                        </ul>
                    </div>
                </div> 
                )
        }
    }
    return(
        <>
            <div class="col-sm-9">
                <div class="blog-post-area">
						<h2 class="title text-center">Latest From our Blog</h2>
						{handleBlogDetail()}
                </div>
                <div class="rating-area">
						<ul class="ratings">
							<li class="rate-this">Rate this item:</li>
							<Rate/>
							<li class="color">(6 votes)</li>
						</ul>
						<ul class="tag">
							<li>TAG:</li>
							<li><a class="color" href="">Pink <span>/</span></a></li>
							<li><a class="color" href="">T-Shirt <span>/</span></a></li>
							<li><a class="color" href="">Girls</a></li>
						</ul>
					</div>
                <ListComment comment={comment}/>
                <Comment/>
            </div>
        </>
    )
}
export default BlogDetail;