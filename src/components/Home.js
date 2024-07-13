import React, { useState, useEffect } from "react";
import Menu from "./Menu";
import items from '../constant/data'
import Categories from "./Categories";
import useOnlineStatus from "../utils/useOnlineStatus";

const categories = ["all", ...new Set(items.map((item) => item.category))];

const Home = () => {

    const [menuItems, setMenuItems] = useState([]);

    useEffect(()=> {
        setMenuItems(items);
    }, []);

    const filterItems = (category) => {
        if(category === "all") {
          setMenuItems(items);
        } else {
          setMenuItems(items.filter((item) => {
              return item.category === category;
          }))
        }
    }
    
    const searchItems = (text) => {
        setMenuItems(items.filter((item) => {
            let pattern = new RegExp(text, 'i');
            return pattern.test(item.title);
        }))
    }
    console.log("useOnlineStatus: ", useOnlineStatus());
    if(!useOnlineStatus()) {
        return (
            <div>
                <h3>"Looks like you'ar offline!! Please check your internet connection;"</h3>
            </div>
        )
    }

    return (
        <React.Fragment>
            <div className="moving-text"><p>50% Off On HDFC Card</p></div>
            {   
                <div>
                    <Categories categories={categories} filterItems={filterItems} searchItems={searchItems}></Categories>
                    <Menu items={menuItems}/>
                </div>
            }
        </React.Fragment>
    )
}

export default Home;