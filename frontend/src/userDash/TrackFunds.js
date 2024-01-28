import { React, useState } from "react";
import { FaCalendarCheck } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import "../AdminDash/adminDashboard.css";
import "./applyfund.css";

function ApplicationCard(props) {
  return (
    <div style={{backgroundColor : "#1f1f38" , display:"flex" , flexDirection : "row" , alignItems: "center"}}className="AppCard">
      <div style={{backgroundColor : "#1f1f38" , display:"flex" , flexDirection : "column" , paddingLeft : "9rem"}}>
        <h5>Name: {props.i.name}</h5>
        <h5>Email: {props.i.email}</h5>
        <h5>contact: {props.i.contact}</h5>
        <h5>startupName: {props.i.startupName}</h5>
        <h5>fundsRequired: {props.i.fundsRequired}</h5>
        <h5>reason: {props.i.reason}</h5>
      </div>
    </div>
  );
}

function TrackFunds() {
  const [data, setData] = useState([]);

  function logOut() {
    localStorage.removeItem("email");
    window.location.assign("/login");
  }

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const email = localStorage.getItem("email");
    console.log("em" + email);
    if (!email) {
      alert("Please Login first!");
      window.location.assign("/login");
    }
    let token = localStorage.getItem("token");
    const response = await fetch(
      "https://crawler-backend.vercel.app/api/findFundRequest",
      {
        headers: {
          Authentication: token,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          email,
        }),
      }
    );

    const data = await response.json();
    console.log(data.user);
    setData(data.user);
  }

  return (
    <div className="TrackFund">
      <nav className="navbar navbar-light navbar-expand-lg py-0">
        <ul className="navbar-nav ms-auto pe-3 ">
          <li className="nav-item">
            <NavLink 
              to="/applyfunds"
              className="nav-link shadow bg-primary rounded text-light m-2"
            >
              Apply for Funds
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/trackFunds"
              className="nav-link shadow bg-primary rounded text-light m-2"
            >
              Track Fund Status
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to=""
              className="nav-link shadow bg-primary rounded text-light m-2"
              onClick={logOut}
            >
              Log Out
            </NavLink>
          </li>
        </ul>
      </nav>

      <br />
      <h1 style={{marginLeft : "32rem"}}>Track Fund Request</h1>
      <br />
      {data?.length === 0 ? (
        <>
          <h1>No Fund Request</h1>
        </>
      ) : (
        data.map((item) => <ApplicationCard i={item} />)
      )}
    </div>
  );
}

export default TrackFunds;
