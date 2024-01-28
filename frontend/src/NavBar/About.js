import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useState } from "react";
import "./about.css";
import "bootstrap/dist/css/bootstrap.min.css";
function About() {
  const [details,setDetails]=useState({
    name:"",
    email:"",
    message:""
})
async function sendData() {
    const {name , email, message}=details;
    const response = await fetch('https://crawler-backend.vercel.app/api/contactus', {
        method: 'POST',
        body: JSON.stringify({
            name,
            email,
            message
        }),
    })

    const data = await response.json()
    window.alert("Email has been send...!")
}
const Input = (e) => {
   let name = e.target.name;
    let value = e.target.value;

    setDetails({ ...details, [name]: value });
}
  return (

<section className="mb-4">

    <h1 className="h1-responsive font-weight-bold text-center my-4">Contact Us</h1>
    <h4 className="text-center w-responsive mx-auto mb-5">Do you have any questions? Please do not hesitate to contact us. Our team will come back to you within
        a matter of hours to help you.</h4>

    <div className="row">

        <div className="col-md-9 mb-md-0 mb-5">
            <form id="contact-form" style={{backgroundColor : "#1f1f38" , marginLeft :"20rem"} } name="contact-form" >

                <div className="row">

                    <div className="col-md-6">
                        <div className="md-form mb-0">
                            <label for="name" className="">Your name</label>
                            <input type="text" id="name" onChange={Input} style={{height: "2rem"}} value={details.name} name="name" className="form-control"/>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="md-form mb-0">
                            <label for="email" className="">Your email</label>
                            <input type="text" id="email" onChange={Input} style={{height: "2rem"}} value={details.email}   name="email" className="form-control"/>
                        </div>
                    </div>

                </div>

                <div style={{marginTop :"1.5rem"}}className="row">

                    <div className="col-md-12">

                        <div className="md-form">
                            <label for="message">Your message</label>
                            <textarea type="text" id="message" onChange={Input} value={details.message} name="message" rows="2" className="form-control md-textarea"></textarea>
                        </div>

                    </div>
                </div>

            <div style={{marginTop :"2rem"}} className="text-center text-md-left">
                <a className="btn btn-primary"  onClick={sendData} >Send</a>
            </div>
            </form>

        </div>


    </div>

</section>

  );
}

export default About;
