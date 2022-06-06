import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';

import Drawer from './components/Drawer';
import Header from './components/Header';
import Home from './pages/Home';
import Favorites from './pages/Favorites';

export const AppContext = createContext({});

function App() {

  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);  
  const [cartOpened, setCartOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(true);  

  useEffect(() => {
    async function fetchData() {
      const cartResponse = await axios
        .get('https://629b626bcf163ceb8d18cc73.mockapi.io/cart');
      const favoritesResponse = await axios
        .get('https://629b626bcf163ceb8d18cc73.mockapi.io/favorites');
      const itemsResponse = await axios
        .get('https://629b626bcf163ceb8d18cc73.mockapi.io/items');

        setIsLoading(false);
        setCartItems(cartResponse.data);
        setFavorites(favoritesResponse.data)
        setItems(itemsResponse.data);
    }

    fetchData();  
  }, [])

  useEffect(() => {
    cartOpened 
      ? document.body.classList.add('lock')
      : document.body.classList.remove('lock')
  }, [cartOpened])
  
  
  const onAddToCart = (item) => {
    if(cartItems.find(obj => Number(obj.id) === Number(item.id))){
      axios.delete(`https://629b626bcf163ceb8d18cc73.mockapi.io/cart/${item.id}`);
      setCartItems(prev => prev.filter(obj => Number(obj.id) !== Number(item.id)));
    } else {
      axios.post('https://629b626bcf163ceb8d18cc73.mockapi.io/cart', item);
      setCartItems(prev => [...prev, item]);
    }
    
  }

  const onRemoveItem = (id) => {
    axios.delete(`https://629b626bcf163ceb8d18cc73.mockapi.io/cart/${id}`);
    setCartItems(prev => prev.filter(item => item.id !== id)); 
  }
  
  const onAddToFavorites = async (obj) => { 
    try {
      if(favorites.find(favObj => Number(favObj.id) === Number(obj.id))){
        axios.delete(`https://629b626bcf163ceb8d18cc73.mockapi.io/favorites/${obj.id}`);
        setFavorites(prev => prev.filter(item => item.id !== obj.id));
      } else {
        const {data} = axios.post('https://629b626bcf163ceb8d18cc73.mockapi.io/favorites', obj);
        setFavorites(prev => [...prev, data]);
      }
    } catch (error) {
      alert('Не удалось добавть в закладки(')
    }
    
  }

  const isItemAdded = (id) => {
    return cartItems.some(obj => Number(obj.id) === Number(id))
  }
  

  return (
    <AppContext.Provider value={{items, cartItems, favorites, isItemAdded, 
      onAddToFavorites, setCartOpened, setCartItems}}>
      <div className="wrapper clear">
        {
          cartOpened && <Drawer 
            closeCart={()=> setCartOpened(false)} 
            items={cartItems}
            onRemove={onRemoveItem}/>
        }
        <Header openCart={()=> setCartOpened(true)}/>      
        
        <Routes>
          <Route path='/' element={ <Home 
            items={items} 
            cartItems={cartItems}
            addToCart={onAddToCart} 
            addToFav={onAddToFavorites} 
            loading={isLoading}/> }
          />          
          <Route path='/favorites' element={<Favorites/>}
          />
        </Routes>

      </div>
    </AppContext.Provider>
    
  );
}

export default App;
