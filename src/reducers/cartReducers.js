import { CART_ADD_ITEM, CART_EMPTY, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS } from "../constants/cartConstants";
//Cart Reducer funct
export const cartReducer = (
    state = { cartItems: [] }, 
    action
    ) => {
    //**If user hits add to cart on same product it will update QTY to the 
    //most recent QTY **
    switch(action.type) {
        case CART_ADD_ITEM:
            //add item to cart in the REdux store. 
            //need to get item from the payload(item u will add to cart)
            const item =  action.payload;
            //make sure if we already have a product w/ this ID in the cart.
            //Find arr funct that searches for a product based on a criteria we define.
            //For each item compare that item.product (which is the id of
            //product here) and compare that w/ the ID of the item (product) we 
            //are going to add. So compare current item thats 
            //going to be added productID w/ the ID of items in the cart ITems
            const existItem = state.cartItems.find((x) => 
                x.product === item.product
            );
            //if we have already have a  product w/ this ID in the cart Items
            // then need to replace that item in the cart w/ the ITEM bc its 
            // newer and the info including qty and other info is newer 
            // than the one we have already in cartItems
            if(existItem) {
                return {
                    //...state means we wont change other properties and
                    //just update cartITems
                    ...state, 
                    //only update the item that already exists. 
                    cartItems: state.cartItems.map((x) =>
                        //if they are equal to each other u dont return the x which is
                        //previous value u return ITEM which is the new value that 
                        //comes into cartReducer. If theyre not equal to each other return the
                        //previous value means u dont change other items in the cart
                        //items
                        x.product === existItem.product ? item: x
                    ),
                };
            }
                //for existant case. if product new and doesnt exist in 
                //cartItem add a new item to the cart. use ... operator
                //to concat cartItems with the items that come into this
                //function. 
                else {
                    //...state means u wont change other properties in cart
                    //so only update cartItems. This will concat cartItems
                    //w/ the new item. This will update our cartItems for ex
                    //if we have 2 items in our cartItems and add a new one
                    //now we have 3 items. Adds new Item at the end of cartItems
                    return { ...state, cartItems: [...state.cartItems, item] };
                }
        case CART_REMOVE_ITEM:
            //remove the item which is equal to action.payload bc 
            //action.payload contains productId. only update cartItems. 
            //filter out the product inside action.payload
            return { 
                //filter out product where it's ID=action.payload.
                //bc payload was set to the productID
                //if return true then it should be added to cartItem.
                //Filters product where it's ID=action.payload(product u delete)
                ...state, 
                cartItems: state.cartItems
                    .filter((x) => x.product !== action.payload)
            };
        case CART_SAVE_SHIPPING_ADDRESS:
            //return previous state but update shipping address. this
            //contains data in saveShippingAddress action
            return{ ...state, shippingAddress: action.payload};

        case CART_SAVE_PAYMENT_METHOD:
            //return previos state and update payment method
            return {...state, paymentMethod: action.payload};
        case CART_EMPTY:
            //return previos state and make cartITems and empty arr
            return {...state, cartItems: []};
        default:
            return state;
    }
};