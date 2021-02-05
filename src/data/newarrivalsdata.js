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
            name: 'newarrivals1',
            category: 'Shirts',
            image: p1,
            price: 750,
            description: 'high quality product',
            countInStock: 2
        },
        {
            _id: '2',
            name: 'newarrivals2',
            category: 'Shirts',
            image: p2,
            price: 1000,
            description: 'high quality product',
            countInStock: 2
        },
        {
            _id: '3',
            name: 'newarrivals3',
            category: 'Shirts',
            image: p1,
            price: 800,
            description: 'high quality product',
            countInStock: 2
        },
        {
            _id: '4',
            name: 'newarrivals4',
            category: 'Shirts',
            image: p2,
            price: 500,
            description: 'high quality product',
            countInStock: 2
        },
        {
            _id: '5',
            name: 'newarrivals5',
            category: 'Shirts',
            image: p2,
            price: 500,
            description: 'high quality product',
            countInStock: 2
        },
        {
            _id: '6',
            name: 'newarrivals6',
            category: 'Shirts',
            image: p2,
            price: 500,
            description: 'high quality product',
            countInStock: 2
        },
        {
            _id: '7',
            name: 'newarrivals7',
            category: 'Shirts',
            image: p2,
            price: 500,
            description: 'high quality product',
            countInStock: 2
        },
    ]
}

export default data;