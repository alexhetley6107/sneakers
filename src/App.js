import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';

import Drawer from './components/Drawer/Drawer';
import Header from './components/Header';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Orders from './pages/Orders';
/* import sneakers from './img/Sneakers'; */
import {img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12} from './img/Sneakers';

export const AppContext = createContext({});

function App() {

  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);  
  const [cartOpened, setCartOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(true);  

  useEffect(() => {
    async function fetchData() {
    try {
      const [cartResponse, favoritesResponse, itemsResponse] = await Promise.all([
        axios.get('https://629b626bcf163ceb8d18cc73.mockapi.io/cart'),
        axios.get('https://629b626bcf163ceb8d18cc73.mockapi.io/favorites'),
        axios.get('https://629b626bcf163ceb8d18cc73.mockapi.io/items'),
      ]);
        setIsLoading(false);
        setCartItems(cartResponse.data);
        setFavorites(favoritesResponse.data)
        setItems(itemsResponse.data);

        } catch (error) {
          alert('Oшибка при запросе данных');
          console.error(error);
        }
    } 
    
    
    fetchData();  
  }, []) 

  useEffect(() => {
    cartOpened 
      ? document.body.classList.add('lock')
      : document.body.classList.remove('lock')
  }, [cartOpened])
  
  const onAddToCart = async (obj) => {
    const findItem = cartItems.find(item => Number(item.parentId) === Number(obj.id));
    try {
      if(findItem){
        setCartItems(prev => prev.filter(item => Number(item.parentId) !== Number(obj.id)));
        await axios.delete(`https://629b626bcf163ceb8d18cc73.mockapi.io/cart/${findItem.id}`);
      } else {
        setCartItems(prev => [...prev, obj]);
        const {data} = await axios.post('https://629b626bcf163ceb8d18cc73.mockapi.io/cart', obj);
        setCartItems((prev) =>
        prev.map((item) => {
          if (item.parentId === data.parentId) {
            return {
              ...item,
              id: data.id,
            };
          }
          return item;
        }),
      );
    }
    } catch (error) {
      alert('Ошибка при добавлении в корзину')
      console.error(error)
    }
    
  }

  const onRemoveItem = async (id) => {
    try {
      await axios.delete(`https://629b626bcf163ceb8d18cc73.mockapi.io/cart/${id}`);
      setCartItems(prev => prev.filter(item => Number(item.id) !== Number(id))); 
    } catch (error) {
      alert('Ошибка при удалении из корзины')
      console.error(error)
    }
  }
  
  const onAddToFavorites = async (obj) => { 
    try {
      if (favorites.find(favObj => Number(favObj.id) === Number(obj.id))){
        axios.delete(`https://629b626bcf163ceb8d18cc73.mockapi.io/favorites/${obj.id}`);
        setFavorites(prev => prev.filter(item => Number(item.id) !== Number(obj.id)));
      } else {
        const {data} = axios.post('https://629b626bcf163ceb8d18cc73.mockapi.io/favorites', obj);
        setFavorites(prev => [...prev, data]);
      }
    } catch (error) {
      alert('Не удалось добавть в закладки(');
      console.error(error)
    }
    
  }

  const isItemAdded = (id) => {
    return cartItems.some(obj => Number(obj.parentId) === Number(id))
  }
  

  return (
    <AppContext.Provider value={{items, cartItems, favorites, isItemAdded, onAddToCart,
      onAddToFavorites, setCartOpened, setCartItems}}>

      <div className="wrapper clear">

        <Drawer opened={cartOpened}
          closeCart={()=> setCartOpened(false)} 
          items={cartItems}
          onRemove={onRemoveItem}
        />
        
        <Header openCart={()=> setCartOpened(true)}/>      
        
        <Routes>
          <Route path='sneakers' element={ <Home 
            items={items} 
            cartItems={cartItems}
            addToCart={onAddToCart} 
            addToFav={onAddToFavorites} 
            loading={isLoading}/> }
          />          
          <Route path='/favorites' element={<Favorites/>}/>
          <Route path='/orders' element={<Orders/>}/>
        </Routes>

      </div>
    </AppContext.Provider>
    
  );
}

export default App;
