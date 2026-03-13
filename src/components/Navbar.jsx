import {Link} from "react-router-dom";

function Navbar(){

return(

<nav className="navbar navbar-expand-lg navbar-dark bg-dark">

<div className="container">

<Link className="navbar-brand" to="/home">
SevaSetu NGO
</Link>

<div>

<Link className="btn btn-light m-1" to="/campaigns">Campaigns</Link>

<Link className="btn btn-light m-1" to="/donations">Donations</Link>

<Link className="btn btn-light m-1" to="/leaderboard">Leaderboard</Link>

<Link className="btn btn-light m-1" to="/volunteers">Volunteers</Link>

<Link className="btn btn-light m-1" to="/about">About</Link>

<Link className="btn btn-light m-1" to="/contact">Contact</Link>

<Link className="btn btn-warning m-1" to="/profile">Profile</Link>

<Link className="btn btn-danger m-1" to="/">Logout</Link>

</div>

</div>

</nav>

)

}

export default Navbar