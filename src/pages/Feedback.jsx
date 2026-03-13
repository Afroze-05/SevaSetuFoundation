import Navbar from "../components/Navbar";

function Feedback(){

return(

<div>

<Navbar/>

<div className="container mt-5">

<h2>Feedback</h2>

<input className="form-control mb-3" placeholder="Your Name"/>

<textarea className="form-control mb-3" placeholder="Your Feedback"/>

<button className="btn btn-success">
Submit
</button>

</div>

</div>

)

}

export default Feedback