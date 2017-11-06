import React from 'react';


export class CartItemRow extends React.Component {


    increment(e){
        const itemName = e.target.getAttribute('data-item-name');
        this.props.onIncrement(itemName);
    }

    decrement(e){
        const itemName = e.target.getAttribute('data-item-name');
        this.props.onDecrement(itemName);
    }

    remove(e){
        const itemName = e.target.getAttribute('data-item-name');
        this.props.onRemoval(itemName);
    }


    componentWillMount(){
        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
        this.remove = this.remove.bind(this);
    }

    render() {
        return(
              <tr>
                  <td>{this.props.cartItem.itemName}</td>
                  <td>{this.props.cartItem.quantity}</td>
                  <td>{this.props.cartItem.price}</td>
                  <td> <button data-item-name={this.props.cartItem.itemName} onClick={this.increment}>+</button></td>
                  <td><button data-item-name={this.props.cartItem.itemName} onClick={this.props.cartItem.quantity > 1 ? this.decrement : ''}>
                      -</button> </td>
                  <td><button data-item-name={this.props.cartItem.itemName} onClick={this.remove}>X</button></td>
              </tr>
        )
    }
}