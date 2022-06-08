import React, { useState } from 'react'
import axios from 'axios';

import Info from '../Info';
import { useCart } from '../../hooks/useCart';

import s from'./Drawer.module.scss'

const delay = (ms) => new Promise((res) => setTimeout(res, ms ));

const Drawer = (props) => {
  const {items, closeCart, onRemove, opened}= props;
  const {cartItems, setCartItems, totalPrice} = useCart();
  const [isOrdered, setIsOrdered] = useState(false);
  const [isLoad, setIsLoad] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const onClickOrder = async () => { 
    try {
      setIsLoad(true);
      const {data} = await axios
        .post('https://629b626bcf163ceb8d18cc73.mockapi.io/orders',{
          items : cartItems
        });
      setOrderId(data.id)
      setIsOrdered(true);
      setCartItems([]);
      //костыль for mockapi
      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete('/cart/' + item.id);
        await delay(1000);
      }

    } catch (error) {
      alert('Ошибка при создании заказа :(')
    }
    setIsLoad(false);
   }

  return (
    <div  className={`${s.overlay} ${opened ? `${s.overlayVisible}`:''}` } >
      <div className={s.drawer} >
        <h2 className='mb-40 d-flex justify-between'>Корзина
          <img className=' cu-p' onClick={closeCart}
              src="/img/btn-remove.svg" alt="Remove" />
        </h2>

        {
          items.length 
          ?
          <>
            <div className={s.items}>          
            {
              items.map(obj => 
                <div key={obj.id}
                  className="cartItem d-flex align-center mb-20">
                  <div className="cartItemImg"
                    style={{backgroundImage: `url(${obj.img})`}}>
                  </div>
                  <div className='mr-20'>
                    <p className='mb-5'>{obj.name}</p>
                    <b>{obj.price} руб.</b>
                  </div>            
                  <img className='removeBtn'
                    src="/img/btn-remove.svg" alt="Remove"
                    onClick={()=>onRemove(obj.id)} />
                </div>
              )
            }         
            
            </div>
            <div className='cartTotalBlock'>
            <ul >
              <li>
                <span>Итого:</span>
                <div></div>
                <b>{totalPrice} руб. </b>
              </li>
              <li>
                <span>Налог 5%: </span>
                <div></div>
                <b>{(totalPrice * 0.05).toFixed(2)} руб. </b>
              </li>
            </ul>
            <button onClick={onClickOrder} disabled={isLoad}
              className='greenBtn'>Оформить заказ
              <img src="/img/arrow.svg" alt="Arrow" />
            </button>
            </div>
          </>
          : 
          <Info 
            title={isOrdered ? 'Заказ оформлен!':'Корзина пустая'} 
            desc={ isOrdered
              ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
              : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'
            }
            img= { isOrdered ? "/img/order_maked.jpg":"/img/cart_empty.jpg"}
          />
          
        }
        
        
      
      </div>  

    </div>      
  )
}

export default Drawer;