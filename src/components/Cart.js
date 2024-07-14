import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, clearCart, removeItem } from "../utils/cartSlice";

const Cart = () => {
    const cartItems = useSelector((store)=> store.cart.items);
    const dispatch = useDispatch();

    const groupByItems = cartItems.reduce((acc, item) => {
        const existingItem = acc.find(i => i.id === item.id);
        if (existingItem) {
            existingItem.count++;
        } else {
            acc.push({ ...item, count: 1 });
        }
        return acc;
    }, []);

    const HandleAddToCart = (item) => {
        dispatch(addItem(item))
    }

    const HandleRemoveFromCart = (id) => {
        dispatch(removeItem(id));
    }

    const HandleClearCart = () => {
        dispatch(clearCart());
    }

    return (
        <React.Fragment>
            <section className="menu section">
				<div className="title">
					<h2>Cart Items</h2>
					<div className="underline"></div>
				</div>
            </section>
            {groupByItems.length? (
                <button className="clear-cart" onClick={HandleClearCart}>Clear Cart</button>
            ): (
                <div><h3>Please Add Some Item In Your Cart!</h3></div>
            )}
            {groupByItems.map((item) => {
                return (
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
                        <div className="add-to-cart" id={item.id}>
                            <div className="count-container">
                                <button className="count-button" onClick={() => HandleRemoveFromCart(item.id)}>-</button>
                                <span><h4>{item.count}</h4></span>
                                <button className="count-button" onClick={() => HandleAddToCart(item)}>+</button>
                            </div>
                        </div>
                    </React.Fragment>
                )
            })}
        </React.Fragment>
    )
}

export default Cart;