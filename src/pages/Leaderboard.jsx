import Navbar from "../components/Navbar";

function Leaderboard(){

return(

<div>

<Navbar/>

<div className="container mt-5">

<h2>Top Donors</h2>

<table className="table">

<thead>
<tr>
<th>Rank</th>
<th>Name</th>
<th>Donation</th>
</tr>
</thead>

<tbody>

<tr>
<td>1</td>
<td>Rahul</td>
<td>₹5000</td>
</tr>

<tr>
<td>2</td>
<td>Priya</td>
<td>₹4000</td>
</tr>

</tbody>

</table>

</div>

</div>

)

}

export default Leaderboard