import React, { useContext } from 'react'
import { AppContext } from '../App';

export const useCart = (second) => { 
  
  const {cartItems, setCartItems} = useContext(AppContext); 
  const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0)
 
  return {cartItems, setCartItems, totalPrice} ;
}
