import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ProductInfo = ({ productCode }) => {
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/shopping/api/products/${productCode}`);
                setProduct(response.data);
            } catch (error) {
                console.error('상품 정보를 불러오는 중 오류 발생:', error);
            }
        };

        if (productCode) {
            fetchProduct();
        }
    }, [productCode]);

    return product ? (
        <>
            <td className='order_product'>
                <Link to={`/product/${product.pnum}`} className='order_productbox'>
                    <img src={`http://localhost:8000/shopping/api/products/${product.pnum}/picture`} alt={product.pname} className='order_productimg'/>
                </Link>
                    <a className='order_productName'>{product.pname}</a>
            </td>
        </>
    ) : (
        <td colSpan={2} style={{ textAlign: 'center' }}>상품 정보를 불러오는 중...</td>
    );
};

export default ProductInfo;