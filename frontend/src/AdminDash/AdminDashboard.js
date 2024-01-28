import { useEffect, useState } from "react"
import "./adminDashboard.css"
import { NavLink } from 'react-router-dom';


function AdminDashBoard() {

    function logOut() {
        localStorage.removeItem("email");
        window.location.assign("/login");
    }

    
    const [applications, setApplications] = useState([]);

    async function createStartupUser(props) {

        let name = props.name;
        let phone = props.contact;
        let city = props.city;
        let email = props.email;
        let password = generateRandomPassword(name);
        let userType = "user"
        let dateCreated = await Date.now();
        
        let token = localStorage.getItem('token');
        const response = await fetch('https://crawler-backend.vercel.app/api/auth/createStartupUser', {
			method: 'POST',
			headers: {
                'Authentication': token,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name,
				phone,
                city,
                email,
                password,
                userType,
                dateCreated,
			}),
		})

		const data = await response.json()
        console.log(data)
        if(data.status === "ok")
        {
            window.alert("User Created!");
            window.location.assign("/adminDashboard");
        }
        else
        {
            window.alert("User Already Exists!");
            window.location.assign("/adminDashboard");
        }

    }

    useEffect(() => {
        const res = localStorage.getItem("email");
        if(!res) {
            alert("Please Login first!");
            window.location.assign("/login");
        }
        else{
            getAllApplications();
        }
    }, [])

    function generateRandomPassword(name) {
        return name + "@123"
    }

    async function updateApprovalStatus(props, status) {
        let email = props;
        let token = localStorage.getItem('token');
        const response = await fetch('https://crawler-backend.vercel.app/api/updateApprovalStatus', {
			method: 'PUT',
			headers: {
                'Authentication': token,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
                status,
                email,
			}),
		})

		const data = await response.json()
    }
    
    function handleApprove(props) {
        updateApprovalStatus(props.email, "Approved");
        createStartupUser(props);     
        // sendEmail(random_password);
    }

    function handleReject(props) {     
        updateApprovalStatus(props.email, "Rejected");
        window.alert("Updated!");
        window.location.assign("/adminDashboard");
}

    async function getAllApplications() {
        let token = localStorage.getItem('token');
        const res = await fetch("https://crawler-backend.vercel.app/api/fetchApplications", {method: "GET",headers: {
            'Authentication': token,
            'Content-Type': 'application/json',
        }});
        
        const data = await res.json();
        console.log(data.applications)
        setApplications(data.applications);
    }

    const pending = applications.filter(application => application.approvalStatus == "Pending")
    const approved = applications.filter(application => application.approvalStatus == "Approved")
    const rejected = applications.filter(application => application.approvalStatus == "Rejected")

    function ApplicationCard(props) {
        return <div className="AppCard">

        <h1>{props.i.startupName}</h1>
        <h5>Name: {props.i.name}</h5>
        <h5>Contact: {props.i.contact}</h5>
        <h5>Email: {props.i.email}</h5>
        <h5>City: {props.i.city}</h5>
        <h5>State: {props.i.state}</h5>
        <h5>Startup Description: {props.i.startupDesc}</h5>
        <div className="yui">
        <button className="button1" id="yu" onClick={() => handleApprove(props.i)}>Approve</button>
        <button className="button1" id="ui"onClick={() => handleReject(props.i)}>Reject</button>
        </div>
        </div>
    }

    return <div className="bgimage">

    <nav  className="navbar navbar-light navbar-expand-lg py-0"> 
         <ul className="navbar-nav ms-auto pe-3 ">
         <li className="nav-item">
                <a className='loginButton' ><img className = "upstartlogo1"src="https://cdn-icons-png.flaticon.com/512/3153/3153346.png"/></a>
            </li>
        <li className="nav-item">
        
            <button to="" id ="logout"className="button1" onClick={logOut}>Log Out</button>
        </li>
      </ul>
  
   

</nav>

    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridGap: 10 }}>
    <div><br /><h1>Pending Startups</h1>
    {pending.map((app) => <ApplicationCard i={app}/>)}
    </div>
    <div><br /><h1>Approved Startups</h1>
    {approved.map((app) => <ApplicationCard i={app}/>)}
    </div>
    <div><br /><h1>Rejected Startups</h1>
    {rejected.map((app) => <ApplicationCard i={app}/>)}
    </div>
    </div>



</div>
}

export default AdminDashBoard