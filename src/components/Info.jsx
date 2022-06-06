import React, { useContext } from 'react'
import { AppContext } from '../App';

const Info = ({img, title, desc}) => {

const {setCartOpened} = useContext(AppContext);

  return (
    <div className="cartEmpty d-flex align-center justify-center flex-column flex">
      <img className='mb-20' 
        width={120} 
        src={img} alt="Empty" />
      <h2>{title}</h2>
      <p className="opacity-6">
        {desc}
      </p>
      <button onClick={()=>setCartOpened(false)} className="greenBtn">
        <img src="/img/arrow.svg" alt="" />
        Вернуться назад
      </button>
    </div>
  )
}

export default Info;