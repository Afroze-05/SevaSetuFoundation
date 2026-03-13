import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Campaigns(){

return(

<div>

<Navbar/>

<div className="container mt-5">

<h2>Current NGO Requirements</h2>

<table className="table">

<thead>

<tr>
<th>Item</th>
<th>Required</th>
<th>Collected</th>
</tr>

</thead>

<tbody>

<tr>
<td>Food Kits</td>
<td>500</td>
<td>320</td>
</tr>

<tr>
<td>School Books</td>
<td>200</td>
<td>150</td>
</tr>

<tr>
<td>Clothes</td>
<td>1000</td>
<td>450</td>
</tr>

</tbody>

</table>

</div>

<Footer/>

</div>

)

}

export default Campaigns