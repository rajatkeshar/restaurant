import React from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";

const Menu = (props) => {

    const {items} = props;
    
    if(!items.length) {
        
    }

	return (!items.length)? (
         <React.Fragment>
            <section className="menu section">
				<div className="title">
					<h2>our menu</h2>
					<div className="underline"></div>
				</div>
            </section>
            <Shimmer />
        </React.Fragment>
    ): (
        <React.Fragment>
            <section className="menu section">
				<div className="title">
					<h2>our menu</h2>
					<div className="underline"></div>
				</div>
            </section>

            {items.map((item) => {
                return (
                    <div className="section-center" id={item.title} key={item.title}>
                        <article className="menu-item">
                            <img src={item.img} alt={item.title} className="photo" />
                            <div className="item-info">
                                <Link to={`item/${item.id}`} key={item.id}>
                                    <header>
                                        <h4>{item.title}</h4>
                                        <h4 className="price">${item.price}</h4>
                                    </header>
                                </Link>
                                <p className="item-text">{item.desc}</p>
                            </div>
                        </article>
                    </div>
                )
            })}
        </React.Fragment>
    )
}

export default Menu
