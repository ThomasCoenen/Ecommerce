// import bcrypt from 'bcryptjs';
import p1 from '../images/p1.jpg';
import p2 from '../images/p2.jpg';



//load data from a JS object instead of hard coding it
//product data

const data = {
    //add sample user to data.js
    products: [
        {
            _id: '1',
            name: 'BRONZE LEVEL PARTNER FRAMED PRINT',
            category: 'Shirts',
            image: p1,
            price: 1,
            description: 'high quality product',
            countInStock: 2

        },
        {
            _id: '2',
            name: 'GOLD LEVEL PARTNER FRAMED PRINT',
            category: 'Shirts',
            image: p2,
            price: 2,
            description: 'high quality product',
            countInStock: 2
        },
        {
            _id: '3',
            name: 'SILVER LEVEL PARTNER FRAMED PRINT',
            category: 'Shirts',
            image: p1,
            price: 3,
            description: 'high quality product',
            countInStock: 2
        },
        {
            _id: '4',
            name: 'PLATINUM LEVEL PARTNER FRAMED PRINT',
            category: 'Shirts',
            image: p2,
            price: 4,
            description: 'high quality product',
            countInStock: 2
        },
        {
            _id: '5',
            name: 'PLATINUM LEVEL PARTNER FRAMED PRINT',
            category: 'Shirts',
            image: p2,
            price: 5,
            description: 'high quality product',
            countInStock: 2
        },
        {
            _id: '6',
            name: 'PLATINUM LEVEL PARTNER FRAMED PRINT',
            category: 'Shirts',
            image: p2,
            price: 6,
            description: 'high quality product',
            countInStock: 2
        },
        {
            _id: '7',
            name: 'PLATINUM LEVEL PARTNER FRAMED PRINT',
            category: 'Shirts',
            image: p2,
            price: 7,
            description: 'high quality product',
            countInStock: 2
        },
    ]
}

export default data;