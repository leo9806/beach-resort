import React from 'react';
import {Link} from 'react-router-dom';
// acts as an alt image for the '<img>'
import DefaultImg from '../images/room-1.jpeg';
import PropTypes from 'prop-types';

const Room = ({room}) => {
  // destructuring the room
  const{name, dang, images, price} = room;


  return (
    <article className="room">
      <div className="img-container">
        <img src={images[0] || DefaultImg} alt="single room" />
        <div className="price-top">
          <h6>£{price}</h6>
          <p>per night</p>
        </div>
        <Link to={`/rooms/${dang}`} className="btn-primary room-link">
          Features
        </Link>
      </div>
      <p className="room-info">{name}</p>
    </article>
  )
}

Room.propTypes = {
  // checking if this object has particular properties
  room: PropTypes.shape({
    name: PropTypes.string.isRequired,
    dang: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    price: PropTypes.number.isRequired

  })
};

export default Room;