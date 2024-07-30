import React, {useState} from "react";

const Navbar = ()=> {

        const [navLinkOpen, navLinkToggle]= useState(false);

        const handleNavLinksToggle = () => {
            navLinkToggle(!navLinkOpen)
        };
        
        const renderClasses = () => {
            let classes = "navlinks";

            if (navLinkOpen) {
                classes += " active"
            }

            return classes
                    }
    return <nav>
        <div className="logo">
        <i class="fa-solid fa-people-carry-box"></i>
            <h4>website</h4>
        </div>
        <ul className={renderClasses()}>
            <li className="link"><a href="/">Home</a></li>
            <li className="link"><a href="/prompt">Prompts</a></li>
            <li className="link"><a href="/temp">Temp</a></li>
            <li className="link"><a href="/test">Test</a></li>
            <li className="link"><a href="/login">Login</a></li>
        </ul>
        <div onClick={handleNavLinksToggle} className="hamburger-toggle">
            <i className="fas fa-bars fa-lg"></i>
        </div>
    </nav>;
}

export default Navbar