function ListComment(props){
    function handleComment(){
    let {comment} = props
    if(comment.length > 0){
        return(comment.map((value, key)=>{
            return(
                <li class="media" key={key}>
					<a class="pull-left" href="#">
						<img class="media-object avatar" src={"http://localhost:8080/laravel8/laravel8/public/upload/user/avatar/" + value.image_user} alt=""/>
					</a>
						<div class="media-body">
							<ul class="sinlge-post-meta">
								<li><i class="fa fa-user"></i>Janis Gallagher</li>
								<li><i class="fa fa-clock-o"></i> 1:33 pm</li>
								<li><i class="fa fa-calendar"></i> DEC 5, 2013</li>
							</ul>
							<p>{value.comment}</p>
							<a class="btn btn-primary" href=""><i class="fa fa-reply"></i>Replay</a>
						</div>
				</li>
            )
        }))
    }
}
    return(
        <>
            <div class="response-area">
						<h2>3 RESPONSES</h2>
						<ul class="media-list">
							{handleComment()}
						</ul>					
					</div>
        </>
    )
}
export default ListComment;