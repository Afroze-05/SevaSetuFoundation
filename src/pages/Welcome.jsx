import {Link} from "react-router-dom";

function Welcome(){

return(

<div className="text-center mt-5">

<h1>SevaSetu NGO</h1>

<h4>Bridging Humanity With Help</h4>

<p>
Join us in supporting communities with food,
education and healthcare programs.
</p>

<div className="mt-4">

<Link className="btn btn-success m-2" to="/donor-login">
Donor Login
</Link>

<Link className="btn btn-primary m-2" to="/donor-register">
Donor Register
</Link>

<Link className="btn btn-dark m-2" to="/admin-login">
Admin Login
</Link>

</div>

</div>

)

}

export default Welcome