import './Forget.css';
import { useState } from "react"
import Header from "../NavBar/Header"

const Forget = () => {

    const [user, setUser] = useState({
        password: "", email: "",cpassword: ""
    });

    let name, value;
    const Input = (e) => {
        name = e.target.name;
        value = e.target.value;

        setUser({ ...user, [name]: value });
    }

    const SendDataLogin = async (e) => {
        e.preventDefault();

        const { email, password , cpassword } = user;

        const res = await fetch("https://crawler-backend.vercel.app/api/auth/forgotPassword", {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email, password ,cpassword
            })
        });


        if (res.status === 400) {
            window.alert("Invalid Credentials!");
            console.log("Invalid Credentials!");
            window.location.href = "/login"

        } else {
            alert("Password Changed successfully");
            localStorage.setItem("email", email);
        }

    }

    return (
        <>
        <Header/>
            <div className='loginForm'>
                <div className="container" id="container">
                    <div className="form-container sign-in-container">
                        <form action="#">
                            <h1>Reset Password</h1>
                            <input type="email" className='input1' onChange={Input} value={user.email} placeholder="Email" name="email" />
                            <input type="password" className='input1' onChange={Input} value={user.password} placeholder="Password" name="password" />
                            <input type="password" className='input1' onChange={Input} value={user.cpassword} placeholder="Confirm Password" name="cpassword" />
                            <br />
                            <button onClick={SendDataLogin}  className="btn">Reset Password</button>
                        </form>
                    </div>
                    <div className="overlay-container">
                        <div className="overlay">
                            <div className="overlay-panel overlay-right">
                                <h1>Hey there, startup!</h1>
                                <p>Enter your details and start your journey with Upstart</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Forget;