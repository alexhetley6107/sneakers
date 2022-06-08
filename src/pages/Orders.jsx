import React, { useState , useEffect, useContext} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Card from '../components/Card/Card';
import { AppContext } from '../App';
import Info from '../components/Info';
import { emptyOrders } from '../img/Images';

const Orders = () => {

  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);  

  const {onAddToCart, onAddToFavorites} = useContext(AppContext)

  const navigate = useNavigate();

  const returnToHome = () => {
    navigate('/')
  }

  useEffect(() => {    
    (async () => {
      try {
        const {data} = await axios
          .get('https://629b626bcf163ceb8d18cc73.mockapi.io/orders');
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []))
        setIsLoading(false)
      } catch (error) {
        alert('Oшибка при запросе заказов');
        console.error(error);
      }
    })();
    

  }, [])

  return (
    <div className="content p-40">
      <h1 className="mb-30" >Мои заказы</h1>
      <div className="favorites d-flex">
      {
        isLoading ? [...Array(4)] : 
          orders.length > 0 ?      
        
          orders.map((item , index)=>
            <Card key={index}
              {...item}  
              loading={isLoading}
              />)
              :
              <Info img={emptyOrders}
                method={returnToHome}
                title='У вас нет заказов'
                desc='Вы нищеброд?  Оформите хотя бы один заказ.'
              />
      }
      </div>
    </div>
  )
}

export default Orders;