import { useState } from "react";

function AdminLogin() {

const [email,setEmail] = useState("")
const [password,setPassword] = useState("")

const handleSubmit = (e)=>{
e.preventDefault()
alert("Admin Login Successful")
}

return(

<div className="container mt-5">

<h2>Admin Login</h2>

<form onSubmit={handleSubmit}>

<input
type="email"
placeholder="Admin Email"
className="form-control mb-3"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>

<input
type="password"
placeholder="Password"
className="form-control mb-3"
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>

<button className="btn btn-dark">
Login
</button>

</form>

</div>

)

}

export default AdminLogin