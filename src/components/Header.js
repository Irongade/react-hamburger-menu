import React, {useEffect, useState} from "react";
import { Link, useHistory } from "react-router-dom";

import Hamburger from "./Hamburger"

const Header = () => {

    const history = useHistory();

    // listen for page changes
    
    useEffect(() => {
        history.listen(() => {
            setState({
                clicked: false,
                menuName: "Menu"
            })
        })
    })
    
    const [state, setState] = useState({
        initial: false,
        clicked: null,
        menuName: "Menu"
    })

    const [disabled, setDisabled] = useState(false)


    const handleMenu = () => {

        // disable menu for a period of time
        disabledMenu()

        // runs initially
        if (state.initial === false) {
            setState({
                initial: null,
                clicked: true,
                menuName: "Close"
            })
        } 
        
        if (state.clicked === true) {
            setState({
                clicked: !state.clicked,
                menuName: "Menu"
            })

        } else if (state.clicked === false) {
            setState({
                clicked: !state.clicked,
                menuName: "Close"
            })
        } 

    }

    // Disable Menu ?
    const disabledMenu = () => {
        setDisabled(!disabled)
        setTimeout(() => {
            setDisabled(false)
        }, 1200)
    }

    return (
        <header>
            <div className="container">
                <div className="wrapper" >

                    <div className="inner-header" >
                        <div className="logo">
                            <Link to="/"> HAMBRG </Link>
                        </div>

                        <div className="menu">
                            <button disabled={disabled} onClick={handleMenu}> Menu </button>
                        </div>
                    </div>
                </div>
            </div>
            <Hamburger state={state} />
        </header>
    )
}

export default Header;