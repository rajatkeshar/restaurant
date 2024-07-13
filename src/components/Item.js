import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Shimmer from './Shimmer';
import data from '../constant/data';

const Item = () => {

    const {id} = useParams();
    const [item, setItem] = useState(null);
    const [counter, setCounter] = useState(0);
    
    useEffect(()=> {
        const element = data.find((d) => d['id'] === parseInt(id));
        setItem(element)
    }, [id])

    const HandleAddToCart = (id, change) => {
        let updatedCount = counter + change;
        setCounter(updatedCount);
    }
    return (!item)? (
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
            <div className="section-center" id={item.title} key={item.title}>
                <article className="menu-item">
                    <img src={item.img} alt={item.title} className="photo" />
                    <div className="item-info">
                            <header>
                                <h4>{item.title}</h4>
                                <h4 className="price">${item.price}</h4>
                            </header>
                        <p className="item-text">{item.desc}</p>
                    </div>
                </article>
            </div>
            <div className="add-to-cart">
            { counter? (
                <div className="count-container">
                    <button className="count-button" onClick={() => HandleAddToCart(item.id, -1)}>-</button>
                    <span><h4>{counter}</h4></span>
                    <button className="count-button" onClick={() => HandleAddToCart(item.id, 1)}>+</button>
                </div>
                ): (
                    <button className="add-to-cart-primary" data-product-id="2" onClick={() => HandleAddToCart(item.id, 1)}>Add to Cart</button>
                )
            }
            </div>
        </React.Fragment>
    )
}

export default Item;