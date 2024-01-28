import {React, useState} from "react";
import { FaCalendarCheck } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import PerDashboard from "./perDashboard";
import RevenueGrowth from "./revenueGrowth";
import { useEffect } from "react";
import "../AdminDash/adminDashboard.css"
import FundForm from "./FundForm"
import "./applyfund.css";

function ApplyFunds() {

    function logOut() {
        localStorage.removeItem("email");
        window.location.assign("/login");
    }
    const [diffDays, setdiffDays] = useState();

    useEffect(() => {
        getData();
    }, [])

    async function getData() {
        const email = localStorage.getItem("email");
        console.log(email);
        if (!email) {
            alert("Please Login first!");
            window.location.assign("/login");
        }
        let token = localStorage.getItem('token');
        const response = await fetch('https://crawler-backend.vercel.app/api/findUser', {
            headers: {
                'Content-Type': 'application/json',
                'Authentication': token,
            },
            method: 'POST',
            body: JSON.stringify({
                email,
            }),
        })

        const data = await response.json()
        console.log(data);
    }

    return (

        <div className="FormFund">

            <div>
                <nav  className="navbar navbar-light navbar-expand-lg py-0">

                    <ul className="navbar-nav ms-auto pe-3 ">
                        <li className="nav-item">
                            <NavLink to="/applyfunds" className="nav-link shadow bg-primary rounded text-light m-2" >Apply for Funds</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/trackFunds" className="nav-link shadow bg-primary rounded text-light m-2">Track Fund Status</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="" className="nav-link shadow bg-primary rounded text-light m-2" onClick={logOut}>Log Out</NavLink>
                        </li>
                    </ul>
                </nav>
                <br />

                <h1 style={{ textAlign: "center" }}>Apply For Request</h1>
                    <FundForm />
            </div>
        </div>
    );
}

export default ApplyFunds;