import { useEffect, useState } from "react";
import Api from "../../Api";
import { Link } from "react-router-dom";
function Blog(){
		const [data , setData] = useState([])
		let url = "/blog"
		useEffect(()=>{
			Api.get(url)
			.then(response=>{
				setData(response.data.blog.data)
				console.log(response)
			})
			.catch(error=>console.log(error))
		},[url])
		console.log(data)
		function handleBlog(props){
			if(data.length > 0){
				return data.map((value, key)=>{
					return(
						<>
							<div class="single-blog-post">
									<h3>{value.title}</h3>
									<div class="post-meta">
										<ul>
											<li><i class="fa fa-user"></i> Mac Doe</li>
											<li><i class="fa fa-clock-o"></i> 1:33 pm</li>
											<li><i class="fa fa-calendar"></i> DEC 5, 2013</li>
										</ul>
										<span>
											<i class="fa fa-star"></i>
											<i class="fa fa-star"></i>
											<i class="fa fa-star"></i>
											<i class="fa fa-star"></i>
											<i class="fa fa-star-half-o"></i>
										</span>
									</div>
									<a href="">
										<img src={"http://localhost:8080/laravel8/laravel8/public/upload/Blog/image/" + value.image}  alt=""/>
									</a>
									<p>{value.description}</p>
									<Link  class="btn btn-primary" to={"/blog/detail/" + value.id}>Read More</Link>
								</div>
								<div class="pagination-area">
									<ul class="pagination">
										<li><a href="" class="active">1</a></li>
										<li><a href="">2</a></li>
										<li><a href="">3</a></li>
										<li><a href=""><i class="fa fa-angle-double-right"></i></a></li>
									</ul>
								</div>
						</>
					)
				})
			}
		}
    return(
        <div class="col-sm-9">
			<div class="blog-post-area">
				<h2 class="title text-center">Latest From our Blog</h2>
				{handleBlog()}
			</div>
		</div>
    )
}
export default Blog;