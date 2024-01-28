import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import "./header.css";

function Header() {
    return <div>
    
    <nav className="navbar navbar-light navbar-expand-lg">
        <ul className="navbar-nav ms-auto ">
            <li className="nav-item">
                <a className='loginButton' href="/" ><img className = "upstartlogo"src="https://cdn-icons-png.flaticon.com/512/3153/3153346.png"/></a>
            </li>
            <li className="nav-item">
                <Button className='loginButton' href="/login">Login</Button>
            </li>
            <li className="nav-item">
                <Button className='applyButton' href="/apply">Register</Button>
            </li>
            <li className="nav-item">
                <Button className='applyButton' href="/about">Contact Us</Button>
            </li>
        </ul>
</nav>

    </div>
}

export default Header;