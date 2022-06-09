import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { AppContext } from '../App';
import { useCart } from '../hooks/useCart';
import {logo, cart, fav, user} from '../img/Images';

const Header = ({openCart}) => {
  
  const {totalPrice} = useCart();

  return (
    <header className='d-flex justify-between align-center p-40'>
      <Link to='sneakers'>
        <div className="d-flex align-center ">
          <img width={40} height={40} src={logo} alt='Logo'/>
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
          <img width={18} height={18} src={cart} alt='Cart'/>
        </li>

        <Link to='/favorites'>
          <li className="mr-10 cu-p">
          <img width={18} height={18} src={fav} alt='Favorite'/>
        </li>
        </Link>
        
        <Link to='/orders'>
          <li className=" cu-p">
            <img width={18} height={18} src={user} alt='User'/>
          </li>
        </Link>
        
      </ul>
    </header>
  )
}

export default Header;