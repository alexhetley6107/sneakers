import React, { useContext } from 'react'
import { AppContext } from '../App';
import {arrow} from '../img/Images';

const Info = ({img, title, desc, method}) => {

  return (
    <div className="cartEmpty d-flex align-center justify-center flex-column flex">
      <img className='mb-20' 
        width={120} 
        src={img} alt="Empty" />
      <h2>{title}</h2>
      <p className="opacity-6">
        {desc}
      </p>
      <button onClick={method} className="greenBtn">
        <img src={arrow} alt="Arrow" />
        Вернуться назад
      </button>
    </div>
  )
}

export default Info;