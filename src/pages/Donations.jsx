import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Donations(){

return(

<div>

<Navbar/>

<div className="container mt-5">

<h2>Your Donations</h2>

<table className="table">

<thead>
<tr>
<th>Date</th>
<th>Campaign</th>
<th>Amount</th>
</tr>
</thead>

<tbody>

<tr>
<td>10 Feb</td>
<td>Food Drive</td>
<td>₹1000</td>
</tr>

</tbody>

</table>

<button className="btn btn-success">
Generate Certificate
</button>

</div>

<Footer/>

</div>

)

}

export default Donations