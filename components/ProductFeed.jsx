import React from 'react'

const ProductFeed = ({products}) => {
  return (
    <div>
        <h1>ProductFeed</h1>
        {products.map((product) => (
            <p>{product.title}</p>
        ))}
    </div>
   
  )
}

export default ProductFeed