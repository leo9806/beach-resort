import React from 'react';
// BEST way to use context in functional components (and class?)
// is by using Hooks such as the useContext
import {useContext} from 'react';
import {RoomContext} from '../context';
import Title from '../components/Title';

// get all unique values
const getUnique = (items, value) => {
  // Set returns unique values
  return [...new Set(items.map(item => item[value]))];
}

const RoomFilter = ({rooms}) => {
  
  const context = useContext(RoomContext);
  const {
    handleChange, type, capacity, price, minPrice, maxPrice,minSize,
    maxSize, breakfast, pets
  } = context;
  
  // get unique types
  let types = getUnique(rooms, 'type');

  // add "all" as the first item in the array
  types = ['all', ...types];

  // map to jsx
  types = types.map((item, index) => {
    return <option  key={index} value={item}>{item}</option> 
  });

  // get uniques capacities
  let people = getUnique(rooms, 'capacity');

  // map to jsx
  people = people.map((item, index) => {
    return <option key={index} value={item}>{item}</option>
  });

  return (
    <section className="filter-container">
      <Title title="search rooms" />
      <form className="filter-form">
        {/* select type */}
        <div className="form-group">
          <label htmlFor="type">room type</label>
           {/* the name of the select will be used in the handlechange function */}
          <select name="type"
            id="type" 
            value={type} 
            className="form-control"
            onChange={handleChange}
            >
             {types}
           </select>
        </div>
        {/* end of select type */}

        {/* guests */}
        <div className="form-group">
          <label htmlFor="capacity">guests</label>
           {/* the name of the select will be used in the handlechange function */}
          <select name="capacity"
            id="capacity" 
            value={capacity} 
            className="form-control"
            onChange={handleChange}
            >
             {people}
           </select>
        </div>
        {/* end of guest */}

        {/* room price */}
        <div className="form-group">
          <label htmlFor="price">
            room price £{price}
          </label>
          <input type="range" name="price" min={minPrice} max={maxPrice}
            id="price" value={price} onChange={handleChange}
            className="form-control" />
        </div>
        {/* end of room price */}

        {/* size */}
        <div className="form-group">
          <label htmlFor="size">room size</label>
          <div className="size-inputs">
            <input type="number" name="minSize" id="size" value={minSize}
              onChange={handleChange} className="size-input" />
            <input type="number" name="maxSize" id="size" value={maxSize}
              onChange={handleChange} className="size-input" />
          </div>
        </div>
        {/* end of size */}

        {/* extras */}
        <div className="form-group">
          <div className="single-extra">
            <div className="single-extra">
              <input type="checkbox" name="breakfast" id="breakfast" 
                checked={breakfast} onChange={handleChange} />
              <label htmlFor="breakfast">breakfast</label>
            </div>
            <div className="single-extra">
              <input type="checkbox" name="pets" id="pets" 
                checked={pets} onChange={handleChange} />
              <label htmlFor="pets">pets</label>
            </div>
          </div>
        </div>
        {/* end of extras */}
      </form>
    </section>
  )
}

export default RoomFilter
