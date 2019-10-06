import React, { Component } from 'react';
import DefaultBcg from '../images/room-1.jpeg';
import Hero from '../components/Hero';
import Banner from '../components/Banner';
import {Link} from 'react-router-dom';
import {RoomContext} from '../context';

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

    const {name, description, capacity, size, price, extras,
       breakfast, pets, images} = room;
    
       return <Hero hero="roomsHero" >
        <Banner title={`${name} room`}>
          <Link to="/rooms" className="btn-primary">
            Back to rooms
          </Link>
        </Banner>
      </Hero>
    return (
      <div>
        Hello from single room page {room.name}
      </div>
    )
  }
}
