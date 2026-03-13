import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Home(){

return(

<div>

<Navbar/>

<div className="container mt-5">

<h2>About Our NGO</h2>

<p>
SevaSetu works to provide food, education,
and healthcare support to communities in need.
</p>

<div className="row mt-4">

<div className="col-md-4">
<img src="/src/assets/ngo1.jpg" className="img-fluid"/>
</div>

<div className="col-md-4">
<img src="/src/assets/ngo2.jpg" className="img-fluid"/>
</div>

<div className="col-md-4">
<img src="/src/assets/ngo3.jpg" className="img-fluid"/>
</div>

</div>

</div>

<Footer/>

</div>

)

}

export default Home