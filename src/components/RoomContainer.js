import React from 'react';
import RoomFilter from './RoomFilter';
import RoomList from './RoomList';
import {withRoomConsumer} from '../context';
import Loading from './Loading';

// able to use context
const Roomcontainer= ({context}) => {
  const {loading, sortedRooms, rooms} = context;

  if (loading) {
    return <Loading />
  }
  return (
    <div>
      <RoomFilter rooms={rooms} />
      <RoomList rooms={sortedRooms} />
    </div>
  )
}

// wrapped the RoomContainer within the RoomConsumer
export default withRoomConsumer(Roomcontainer);


/*import React from 'react';
import RoomFilter from './RoomFilter';
import RoomList from './RoomList';
import {RoomConsumer} from '../context';
import Loading from './Loading';

const RoomContainer = () => {
  return (
    // using RoomConusmer to access the context in a functional component
    <RoomContainer>
      {
        // this access the value inside the context.js
        // this function is required to access the context from
        // a functional component
        (value) => {
          const {loading, sortedRooms, rooms} = value;

          if (loading) {
              return <Loading />
          }
          return (
            <div>
              Hello from rooms container
              <RoomFilter rooms={rooms} />
              <RoomList rooms={sortedRooms} />
            </div>
          )
        }
      }
    </RoomContainer>
  )
}

export default RoomContainer
*/