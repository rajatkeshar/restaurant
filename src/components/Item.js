import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import Shimmer from './Shimmer';
import data from '../constant/data';
import {addItem, removeItem} from '../utils/cartSlice';

const Item = () => {

    const {id} = useParams();
    const [item, setItem] = useState(null); 
    
    const dispatch = useDispatch();
    const cartItems = useSelector((store) => store.cart.items);

    const groupByItems = cartItems.reduce((acc, item) => {
        const existingItem = acc.find(i => i.id === item.id);
        if (existingItem) {
            existingItem.count++;
        } else {
            acc.push({ ...item, count: 1 });
        }
        return acc;
    }, []);
    
    const e = groupByItems.find((groupByItem) => groupByItem['id'] === parseInt(id));

    useEffect(()=> {
        let element = data.find((d) => d['id'] === parseInt(id));
        setItem(element)
    }, [id])


    const HandleAddToCart = (id) => {
        dispatch(addItem(item));
    }

    const HandleRemoveFromCart = (item) => {
        dispatch(removeItem(item));
    }

    return (!item)? (
        <React.Fragment>
            <section className="menu section">
				<div className="title">
					<h2>Our Items</h2>
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
            { e?.count? (
                <div className="count-container">
                    <button className="count-button" onClick={() => HandleRemoveFromCart(item.id)}>-</button>
                    <span><h4>{e.count}</h4></span>
                    <button className="count-button" onClick={() => HandleAddToCart(item)}>+</button>
                </div>
                ): (
                    <button className="add-to-cart-primary" data-product-id="2" onClick={() => HandleAddToCart(item)}>Add to Cart</button>
                )
            }
            </div>
        </React.Fragment>
    )
}

export default Item;