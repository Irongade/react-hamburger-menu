import React, {useEffect, useRef} from "react";
import { Link  } from "react-router-dom";
import gsap from "gsap";

import dallas from "../images/dallas.webp";
import austin from "../images/austin.webp";
import newyork from "../images/newyork.webp";
import sanfrancisco from "../images/sanfrancisco.webp";
import beijing from "../images/beijing.webp";

const cities = [
    {name: "Dallas", image: dallas },
    {name: "Austin", image: austin },
    {name: "New York", image: newyork },
    {name: "San Francisco", image: sanfrancisco },
    {name: "Beijing", image: beijing },

]

const Hamburger = ({state}) => {

    // variables for animated dom nodes

    let menu = useRef(null)
    let revealMenu = useRef(null)
    let revealMenuBackground = useRef(null)
    let cityBackground = useRef(null)
    let line1 = useRef(null)
    let line2 = useRef(null)
    let line3 = useRef(null)
    let info = useRef(null)
    


    useEffect(() => {
        if (state.clicked === true || (state.clicked === true && state.initial === null)) {
            // open menu
            gsap.to(menu, {
                duration: 0,
                css: {
                    display: "block"
                }
            })

        // make sure that the height property is returned to normal
        gsap.to([revealMenu, revealMenuBackground], {
            duration: 0,
            height: "100%",
            opacity: 1
        })

        staggerReveal(revealMenuBackground, revealMenu)
        fadeInUp(info)
        slideInLeft(info.children[1])
        staggerText(line1, line2 ,line3)

        } else if (state.clicked === false) {
          // close menu
          staggerHide(revealMenu, revealMenuBackground)

            // make the menu to disappear
            gsap.to(menu, {
                duration: 1,
                css: {
                    display: "none"
                }
            })


        } 
    }, [state])

    // stagger reveal hamburger menu

    const staggerReveal = (node1, node2) => {
        gsap.from([node1, node2], {
            duration: .8,
            height: 0,
            transformOrigin: "right top",
            skewY: 2,
            ease: "power3.inout",
            stagger: 0.1
        })
    }

    // stagger hide hamburger menu

    const staggerHide = (node1, node2) => {
        gsap.to([node1, node2], {
            duration: .8,
            height: 0,
            ease: "power3.inOut",
            stagger: {
                amount: .07
            }
        })
    }

    const  staggerText = (node1, node2, node3) => {
        gsap.from([node1, node2, node3], {
            duration: .8,
            y: 100,
            delay: .1,
            ease: "power3.inout",
            stagger: 0.3
        })
    }

    const fadeInUp = (node) => {
        gsap.from(node, {
        y: 60,
        duration: 1,
        delay: .1,
        opacity: 0,
        ease: "power3.inOut"
        })
    }

    const slideInLeft = (node) => {
        gsap.from(node, {
            duration: .8,
            x: 60,
            delay: .5,
            opacity: 0,
            ease: "power3.inout",
        })
    }

    const handleCityHover = city => {
        // add image
        gsap.to(cityBackground, {
            duration: 0,
            background: `url(${city}) center center`
        })

        // animate bg image reveal
        gsap.to(cityBackground, {
            duration: .4,
            opacity: 1,
            ease: "power3.inOut"
        })

        // move image 
        gsap.from(cityBackground, {
            duration: .4,
            skewY: 1,
            transformOrigin: "right top"
        })
    }

    const handleCityHoverOut = () => {
        // make the background invisible
        gsap.to(cityBackground, {
            duration: .4,
            opacity: 0,
            // ease: "power3.inOut"
        })

    }

    const handleHover = e => {
        gsap.to(e.target, {
            duration: .3,
            y: 3,
            skewX: 4,
            ease: "power3.inOut"
        })
    }
    
    const handleHoverOut = e => {
        gsap.to(e.target, {
            duration: .3,
            y: -3,
            skewX: 0,
            ease: "power3.inOut"
        })
    }

    
    return (
        <div ref={el => menu = el} className="hamburger-menu">
            <div ref={el => revealMenuBackground = el} className="menu-secondary-background-color"></div>
            <div ref={el => revealMenu = el} className="menu-layer">
                <div ref={el => cityBackground = el} className="menu-city-background"></div>

                <div className="container">
                    <div className="wrapper">
                        <div className="menu-links">
                            <nav>
                                <ul>
                                    <li><Link onMouseEnter={e => handleHover(e)} onMouseOut={e => handleHoverOut(e)} ref={el => line1 = el} to="/opportunities"> Opportunities </Link></li>
                                    <li><Link onMouseEnter={e => handleHover(e)} onMouseOut={e => handleHoverOut(e)} ref={el => line2 = el} to="/solutions"> Solutions </Link></li>
                                    <li><Link onMouseEnter={e => handleHover(e)} onMouseOut={e => handleHoverOut(e)} ref={el => line3 = el} to="/contact-us"> Contact us </Link></li>
                                </ul>
                            </nav>

                            <div ref={el => info = el} className="info">
                                <h3>Our Promise</h3>
                                <p>
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Similique quod animi, minima minus delectus facilis aperiam alias laborum ea ad corporis cumque molestiae ducimus numquam necessitatibus! Rerum consequatur quidem voluptate.
                                </p>
                            </div>

                            <div className="locations">
                                Locations: 
                                {
                                    cities.map(el => <span onMouseEnter={() => handleCityHover(el.image)} onMouseOut={handleCityHoverOut} key={el.name}> {el.name} </span>)
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hamburger;