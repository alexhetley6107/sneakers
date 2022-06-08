import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../App';
import Card from '../components/Card/Card';
import Info from '../components/Info';
import { emptyFav } from '../img/Images';

const Favorites = () => {

  const {favorites, onAddToFavorites} = useContext(AppContext);
  const navigate = useNavigate();

  const returnToHome = () => {
    navigate('/')
  }

  return (
    <div className="content p-40">
      <h1 className="mb-30" >Мои закладки</h1>
      <div className="favorites d-flex">
      { favorites.length >0 
        ?
        favorites.map((item , index)=>
          <Card key={index}
            {...item}  
            onFavorite={onAddToFavorites}
            favorited={true}/>)
        :
        <Info img={emptyFav} 
          title='Закладок нет :(' 
          desc='Вы ничего не добавляли в закладки'
          method={returnToHome}  
        />
      }
      </div>
    </div>
  )
}

export default Favorites;