import React, { Component } from 'react';
import {RoomContext} from '../context';
import Loading from './Loading';
import Room from './Room';
import Title from './Title';

export default class FeaturedRooms extends Component {
  // pass the whole context, not just the consumer
  // to have access to the context, I need to declare
  // it like that
  // (cannot be done in a functional component!!)
  static contextType = RoomContext;

  render() {
    let {loading, featuredRooms: rooms} = this.context;
    rooms = rooms.map(room => {
      return <Room key={room.id} room={room} /> 
    });

    return (
      <section className="featured-rooms">
        <Title title="featured rooms" />
        <div className="featured-room-center">
          {/* Load until the data is fetched */}
          {loading ? <Loading /> : rooms}
        </div>
      </section>
    );
  }
}
