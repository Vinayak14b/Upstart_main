    import './Login.css';
    import { useState } from "react"
    import Header from "../NavBar/Header"

    const Login = () => {

        const [user, setUser] = useState({
            password: "", email: "",
        });

        let name, value;
        const Input = (e) => {
            name = e.target.name;
            value = e.target.value;

            setUser({ ...user, [name]: value });
        }

        const SendDataLogin = async (e) => {
            e.preventDefault();

            const { email, password } = user;

            const res = await fetch("https://crawler-backend.vercel.app/api/auth/login", {
                method: "POST", headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email, password
                })
            });

            const data = await res.json();
           
            console.log(data)

            if (res.status === 400 || data.error === "invalide credentials" || res.status === 500) {
                window.alert("Invalid Credentials!");
                console.log("Invalid Credentials!");
                window.location.href = "/login"

            } else {
                window.alert("Login Successful");
                console.log("Login Successful");
                localStorage.setItem("email", email);
                localStorage.setItem('token',data.token)
                localStorage.setItem('userType',data.userType)
                if(data.userType === "admin") {
                    window.location.href = "/adminDashboard"
                }
                else {
                    window.location.href = "/progress"
                }
            }

        }

        return (
            <>
            <Header/>
                <div className='loginForm'>
                    <div className="container" id="container">
                        <div className="form-container sign-in-container">
                            <form action="#">
                                <h5 >Only For Admins and Approved StartUps!</h5>
                                <h1>Sign in</h1>
                                <input style={{color : "black"}} type="email" className='input1' onChange={Input} value={user.email} placeholder="Email" name="email" />
                                <input style={{color : "black"}} type="password" className='input1' onChange={Input} value={user.password} placeholder="Password" name="password" />
                                <a href='/forget' >Forgot Password?</a>
                                <br />
                    
                                <button onClick={SendDataLogin}  className="btn">Sign In</button>
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

    export default Login;