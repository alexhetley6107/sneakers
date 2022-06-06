import React,{ useState} from 'react'
import Card from '../components/Card/Card';

const Home = (props) => {

const {items, addToCart, addToFav, loading} = props;

const [searchValue, setSearchValue] = useState('');
const onChangeSearch = (e) => {
  setSearchValue(e.target.value);
}


const renderItems = () => {
  const filteredItems = items.filter(item => item.name.toLowerCase().includes(searchValue))
  return ( loading ? [...Array(8)] : filteredItems )
    .map((item , index)=>
      <Card key={index}
        {...item} 
        onPlus={()=>addToCart(item)}
        onFavorite={()=>addToFav(item)}
        loading={loading}
      />)
}
  
  return (
    <div className="content p-40">
      <div className='d-flex align-center justify-between mb-40'>
      <h1>
        {searchValue ?`Поиск по запросу: "${searchValue}"`: "Все кроссовки"}            
      </h1>

      <div className="search-block d-flex">
        <img src="/img/search.svg" alt="Search" />
        <input type="text" placeholder='Поиск...'
          onChange={onChangeSearch} value={searchValue}/>
          { searchValue && <img 
            className='removeBtn cu-p'
            src="/img/btn-remove.svg" alt="Clear" 
            onClick={()=>setSearchValue('')}
          />}
      </div>
      </div>
      
      <div className="sneakers d-flex ">
        { renderItems()}

      </div>
    </div>
  )
}

export default Home;