import { Link } from "react-router-dom";

function MenuAcc(){
    return(
        <>
        
        <div class="col-sm-3">
			<div class="left-sidebar">
						<h2>Account</h2>
				        <div class="panel-group category-products" id="accordian">
							<div class="panel panel-default">
								<div class="panel-heading">
									<h4 class="panel-title">
										<a data-toggle="collapse" data-parent="#accordian" href="#sportswear">
											<span class="badge pull-right"><i class="fa fa-plus"></i></span>
											Account
										</a>
									</h4>
								</div>
								
							</div>
							<div class="panel panel-default">
								<div class="panel-heading">
									<h4 class="panel-title">
										<Link data-toggle="collapse" data-parent="#accordian" to="/account/product-list">
											<span class="badge pull-right"><i class="fa fa-plus"></i></span>
											My Account
										</Link>
									</h4>
								</div>
							</div>
				        </div>
			</div>
		</div>
        </>
    )
}
export default MenuAcc;