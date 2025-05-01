import { useContext } from "react";
import { UserContext } from "../userContext";
import { Link } from "react-router-dom";
import './Header.css';

function Header(props) {
    return (
        <header>
            <nav>
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <UserContext.Consumer>
                        {context => (
                            context.user ?
                                <>
                                    <li><Link to='/publish'>Publish</Link></li>
                                    <li><Link to='/profile'>Profile</Link></li>
                                    <li><Link to='/logout'>Logout</Link></li>
                                </>
                            :
                                <>
                                    <li><Link to='/login'>Login</Link></li>
                                    <li><Link to='/register'>Register</Link></li>
                                </>

                        )}
                    </UserContext.Consumer>
                </ul>
            </nav>
        </header >
    );
}

export default Header;