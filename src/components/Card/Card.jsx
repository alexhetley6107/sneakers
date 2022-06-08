import {useContext, useState } from "react";
import s from "./Card.module.scss";
import ContentLoader from "react-content-loader";
import { AppContext } from '../../App';


const Card = (props) => {
  const {id,  name, price, img, onPlus, onFavorite, 
    favorited = false, loading = false} = props;

  const [isFavorite, setIsFavorite] = useState(favorited);
  const {isItemAdded} = useContext(AppContext);
  const obj = {id, parentId: id, name, price, img}

  const handlePlus = () => {
    onPlus(obj);
  }

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    onFavorite(obj);
  }

  return (
    <div className={s.card}>
      { loading ?
        <ContentLoader
          speed={2}
          width={176}
          height={250}
          viewBox="0 0 176 265"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb">
          <rect x="0" y="0" rx="25" ry="25" width="176" height="155" />
          <rect x="0" y="167" rx="5" ry="5" width="155" height="15" />
          <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
          <rect x="0" y="234" rx="5" ry="5" width="80" height="25" />
          <rect x="142" y="230" rx="10" ry="10" width="32" height="32" />
        </ContentLoader>        
      :
      <>
        { onFavorite &&
          <div className={s.favorite}
            onClick={handleFavorite}>
            <img src={isFavorite ? "/img/heart_liked.svg":"/img/heart_unlike.svg"} alt="Unliked" />
          </div>}          
        <img width='100%' height={130} src={img} alt="sneakers" />
        <h5>{name}</h5>
        <div className='d-flex justify-between align-center'>
          <div className='d-flex flex-column'>
            <span>Цена: </span>
            <b>{price} руб.</b>
          </div>
         { onPlus &&
          <img onClick={handlePlus} className={s.plus}
            src={isItemAdded(id) ? "/img/btn-checked.svg" : "/img/btn-plus.svg" } alt="plus" 
          />}
        </div>
      </>
      }
    </div>
  )
}

export default Card;

/*  */