import React, { Component } from 'react';
import DefaultBcg from '../images/room-1.jpeg';
import Hero from '../components/Hero';
import Banner from '../components/Banner';
import {Link} from 'react-router-dom';
import {RoomContext} from '../context';
import StyledHero from '../components/StyledHero';

export default class SingleRoom extends Component {
  // the props are passed by react router
  constructor(props) {
    super(props);
    
    this.state = {
      dang: this.props.match.params.dang,
      DefaultBcg
    }
  }

  // gettin the context
  static contextType = RoomContext;

  //componentDidMount() {}

  render() {
    // destructuring the context
    const {getRoom} = this.context;
    const room = getRoom(this.state.dang);
    // checking if room is undefined before rendering anything
    if (!room) {
      return <div className="error">
        <h3>No such room could be found...</h3>
        <Link to="/rooms" className="btn-primary">
          Back to rooms
        </Link>
      </div>;
    }

    // destructuring of the room array
    const {name, description, capacity, size, price, extras,
       breakfast, pets, images} = room;
    
    // destructuring the array to get the first image of the array (mainImg)
    // and another array with the rest of the images of the array
    const [mainImg, ...defaultImg] = images;

    return (
      <>
        <StyledHero img={mainImg || this.state.DefaultBcg}>
          <Banner title={`${name} room`}>
            <Link to="/rooms" className="btn-primary">
              Back to rooms
            </Link>
          </Banner>
        </StyledHero>
        <section className="single-room">
          <div className="single-room-images">
            {defaultImg.map((item, index) => {
              return <img key={index} src={item} alt={name} />
            } 
            )}
          </div>
          <div className="single-room-info">
            <article className="desc">
              <h3>details</h3>
              <p>
                {description}
              </p>
            </article>
            <article className="info">
              <h3>info</h3>
              <h6>price: £{price}</h6>
              <h6>size: {size}SQFT</h6>
              {/* conditional rendering using a turnary operator */}
              <h6>
                max capacity: {
                  capacity > 1 ? `${capacity} people` : 
                    `${capacity} person`
                }
              </h6>
              <h6>
                {pets ? "pets allowed" : "now pets allowed"}
              </h6>
              <h6>{breakfast && "free breakfast included"}</h6>
            </article>
          </div>
        </section>
        <section className="room-extras">
          <h6>extras</h6>
          <ul className="extras">
            {extras.map((item, index) => {
              return <li key={index}>
                - {item}
              </li>
            })}
          </ul>
        </section>
      </>
    )
  }
}
