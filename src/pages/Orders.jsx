import React, { useState , useEffect, useContext} from 'react';
import axios from 'axios';

import Card from '../components/Card/Card';
import { AppContext } from '../App';

const Orders = () => {

  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);  

  const {onAddToCart, onAddToFavorites} = useContext(AppContext)

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
        (isLoading ? [...Array(4)] : orders).map((item , index)=>
          <Card key={index}
            {...item}  
            loading={isLoading}
            />)
      }
      </div>
    </div>
  )
}

export default Orders;