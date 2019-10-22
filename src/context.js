import React, { Component } from 'react';
//import Items from './data';
import Client from './Contentful';

Client.getEntries({
  content_type: "resortRoomExample"
}).then(response => console.log(response.items));

// creation of the room's context
const RoomContext = React.createContext();

class RoomProvider extends Component {
  state = {
    rooms: [],
    sortedRooms: [],
    featuredRooms:[],
    loading: true,
    type: 'all',
    capacity: 1,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    minSize: 0,
    maxSize:0,
    breakfast: false,
    pets: false
  };
  

  // getData 
  getData = async () => {
    try {
      let response = await Client.getEntries({
        content_type: "resortRoomExample",
        order: "fields.capacity"
      });

      // using the external data from contentful
      let rooms = this.formatData(response.items);
      let featuredRooms = rooms.filter(room => room.featured === true);

      let maxPrice = Math.max(...rooms.map(item => item.price));
      let maxSize = Math.max(...rooms.map(item => item.size));
      this.setState({
        rooms, 
        featuredRooms, 
        sortedRooms: rooms, 
        loading: false,
        price: maxPrice,
        maxPrice,
        maxSize
      });
      console.log(rooms);
    } catch (error) {
      console.log(error);
    }
  } 

  componentDidMount() {
    this.getData();
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

  handleChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    // this.filterRooms will run as a callback function
    // only runs when the state is changing
    this.setState({
      // setting the value of all the <option></option> options
      [name]: value
    }, this.filterRooms)
  }

  filterRooms = () => {
    let{
      rooms, type, capacity, price, minSize, maxSize, breakfast, pets 
    } = this.state;

    // all the rooms
    let tempRooms = [...rooms];

    // transform values
    capacity = parseInt(capacity);
    price = parseInt(price);

    // filter by type
    if (type !== "all") {
      tempRooms = tempRooms.filter(room => room.type === type);
    }

    // filter by capacity
    if (capacity !== 1) {
      tempRooms = tempRooms.filter(room => room.capacity >= capacity);
    }

    // filter by price
    tempRooms = tempRooms.filter(room => room.price <= price);

    // filter by size
    tempRooms = tempRooms.filter(room => room.size > minSize &&
      room.size < maxSize);

    // filter by breakfast
    if (breakfast) {
      tempRooms = tempRooms.filter(room => room.breakfast === true);
    }

    // filter by pets
    if (pets) {
      tempRooms = tempRooms.filter(room => room.breakfast === true);
    }

    // change state
    this.setState({
      sortedRooms: tempRooms
    });
  }

  render() {
    return (
      <RoomContext.Provider value={{
        ...this.state, 
        getRoom:this.getRoom,
        handleChange: this.handleChange
      }}>
        {this.props.children}
      </RoomContext.Provider>
    );
  }
}

// consumer creation
const RoomConsumer = RoomContext.Consumer;

// higher order component, it returns another component
// a way to access the context from functional components
export function withRoomConsumer(Component) {
  return function ConsumerWrapper(props) {
    return <RoomConsumer>
      {value => <Component {...props} context={value} />}
    </RoomConsumer>
  }
}

export {RoomProvider, RoomConsumer, RoomContext};