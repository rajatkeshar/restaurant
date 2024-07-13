import React, { useState } from 'react'

const Categories = (props) => {
	const { categories, filterItems, searchItems } = props
    const [searchText, setSearchText] = useState();

	return (
        <React.Fragment>
            <div className="btn-container">        
                {categories.map(category=> {
                    return <button key={category} id={category} className="filter-btn" onClick={() => filterItems(category)}>{category}</button>
                })}
            </div>
            <div className="search-container">
                <input type="text" className="search-box" onChange={(e) => setSearchText(e.target.value)}></input>
                <button className="search-button" onClick={() => searchItems(searchText)}>Search</button>
            </div>
        </React.Fragment>
	)
}

export default Categories
