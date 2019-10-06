import React, { Component } from 'react';
import Items from './data';

// creation of the room's context
const RoomContext = React.createContext();

class RoomProvider extends Component {
  state = {
    rooms: [],
    sortedRooms: [],
    featuredRooms:[],
    loading: true
  };
  

  // getData 
  componentDidMount() {
    let rooms = this.formatData(Items);
    let featuredRooms = rooms.filter(room => room.featured === true);
    this.setState({
      rooms, 
      featuredRooms, 
      sortedRooms: rooms, 
      loading: false
    });
    console.log(rooms);
  }

  // formats the data into an easier format, where there is no need
  // to go through every field and sub-field
  formatData(items) {
    let tempItems = items.map(item => {
      let id = item.sys.id;
      let images = item.fields.images.map(image => image.fields.file.url);

      // '...' is the javaScript object spread operator
      let room = {...item.fields, images, id};
      return room;
    });
    return tempItems;
  }

  getRoom = dang => {
    let tempRooms = [...this.state.rooms];
    const room = tempRooms.find(room => room.dang === dang);
    return room;
  }

  render() {
    return (
      <RoomContext.Provider value={{...this.state, getRoom:this.getRoom}}>
        {this.props.children}
      </RoomContext.Provider>
    );
  }
}

// consumer creation
const RoomConsumer = RoomContext.Consumer;

export {RoomProvider, RoomConsumer, RoomContext};