import React, { useContext } from 'react';
import { AppContext } from '../App';
import Card from '../components/Card/Card';

const Favorites = () => {

  const {favorites, onAddToFavorites} = useContext(AppContext);

  return (
    <div className="content p-40">
      <h1 className="mb-30" >Мои закладки</h1>
      <div className="favorites d-flex">
      {
        favorites.map((item , index)=>
          <Card key={index}
            {...item}  
            onFavorite={onAddToFavorites}
            favorited={true}/>)
      }
      </div>
    </div>
  )
}

export default Favorites;