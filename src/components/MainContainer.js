import ProductsList from "./ProductsList";
import React from "react";

function MainContainer({ products }) {
    return (
        <div className="products-container" style={{display: 'flex', flexWrap: 'wrap'}}>
            <ProductsList products={products}/>
        </div>
    );
}

export default MainContainer;
