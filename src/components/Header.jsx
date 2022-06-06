import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { AppContext } from '../App';

const Header = ({openCart}) => {

  const {cartItems} = useContext(AppContext);

  const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0)

  return (
    <header className='d-flex justify-between align-center p-40'>
      <Link to='/'>
        <div className="d-flex align-center">
          <img width={40} height={40} src='/img/logo.svg' alt='Logo'/>
          <div >
            <h3 className='text-uppercase'>React Sneakers</h3>
            <p className='opacity-5'>магазин лучших кросовок</p>
          </div>
        </div>
      </Link>     
      
      <ul className="d-flex">
        <li className="cu-p mr-10" 
          onClick={openCart}>
          <span className="mr-10">{totalPrice} руб.</span>  
          <img width={18} height={18} src='/img/cart.svg' alt='Cart'/>
        </li>

        <Link to='/favorites'>
          <li className="mr-10 cu-p">
          <img width={18} height={18} src='/img/favorites.svg' alt='Favorite'/>
        </li>
        </Link>
        
        <li className=" cu-p">
          <img width={18} height={18} src='/img/user.svg' alt='User'/>
        </li>
      </ul>
    </header>
  )
}

export default Header;