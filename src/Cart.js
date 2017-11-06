import React from 'react';
import {CartItemRow} from './CartItemRow'

class CartItem {
    constructor(itemName, quantity, price) {
        this.itemName = itemName;
        this.quantity = quantity;
        this.price = price;
    }
}

export class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cartItems: []
        }

        this.addCartItem = this.addCartItem.bind(this);
        this.removeCartItem = this.removeCartItem.bind(this);
        this.incrementCartItem = this.incrementCartItem.bind(this);
        this.decrementCartItem = this.decrementCartItem.bind(this);
        this.getTotal = this.getTotal.bind(this);
    }

    addCartItem() {
        let itemName = document.getElementById("name").value;
        let price = document.getElementById("price").value;

        let itemExists = false;
        this.state.cartItems.forEach(cartItem => {
            if (cartItem.itemName === itemName) {
                ++cartItem.quantity;
                itemExists = true;
            }
        });
        if (!itemExists) {
            this.state.cartItems.push(new CartItem(itemName, 1, price))
        }
        let updatedCartItems = this.state.cartItems;
        this.setState({
            cartItems: updatedCartItems
        })
    }

    removeCartItem(itemName) {
        const updatedCartItems = this.state.cartItems.filter(cartItem => {
            return cartItem.itemName !== itemName;
        });
        this.setState({
            cartItems: updatedCartItems
        })
    }

    incrementCartItem(itemName) {
        const updatedCartItems = this.state.cartItems.map(cartItem => {
            if (cartItem.itemName === itemName) {
                ++cartItem.quantity;
            }
            return cartItem;
        });
        this.setState({
            cartItems: updatedCartItems
        })
    }

    decrementCartItem(itemName) {
        const updatedCartItems = this.state.cartItems.map(cartItem => {
            if (cartItem.itemName === itemName) {
                --cartItem.quantity;
            }
            return cartItem;
        });
        this.setState({
            cartItems: updatedCartItems
        })
    }


    getTotal(){
        let sum =0;
        this.state.cartItems.forEach(cartItem =>
         sum = sum + (cartItem.price * cartItem.quantity)
        );
        return sum;
    }

    render() {

        return (
            <div>
                <h1>My Cart</h1>
                <input id='name' type='text'/>
                <input id='price' type='number'/>
                <button onClick={this.addCartItem}> Add Item</button>

                <table style={{}}>
                    {this.state.cartItems.map((cartItem, index) => {
                        return <CartItemRow key={index} cartItem={cartItem} onIncrement={this.incrementCartItem}
                                            onDecrement={this.decrementCartItem} onRemoval={this.removeCartItem}
                                            />
                    })
                    }
                </table>
                Total : {this.getTotal()}
            </div>
        )
    }
}