import axios from 'axios';

export const addItemToCart = async (name, quantity) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/product/detailsProduct/${name}`);
        const data = response.data;
        if (data && data.data) {
            const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            const existingItem = cartItems.find(item => item.product === data.data._id);
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cartItems.push({
                    product: data.data._id,
                    name: data.data.name,
                    price: data.data.price,
                    pictures: data.data.pictures[0],
                    category: data.data.category.name,
                    quantity
                });
            }
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
        } else {
            console.error('Invalid product data:', data);
        }
    } catch (error) {
        console.error('Error adding item to cart:', error);
    }
};



export const removeItemFromCart = (id) => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];


    const updatedCartItems = cartItems.filter(item => item.product !== id);

    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
};
