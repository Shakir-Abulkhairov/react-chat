import React from 'react';
import JoinBlock from './components/joinBlock';
import socket from './socket';
import reducer from './reducer';
import axios from 'axios';
import Chat from './components/chat';

function App() {
  const [state,dispatch] = React.useReducer(reducer,{
    joined:false,
    userName:null,
    roomId:null,
    users:[],
    messages:[]
  });


  const setUsers = (users) => {
    dispatch({
      type:'SET_USERS',
      payload: users
    })
  }
  const addMessage = (message) => {
    dispatch({
      type:'NEW_MESSAGE',
      payload: message
    })
  }

  const onLogin = async(obj) => {
    dispatch({
      type : 'JOINED',
      payload: obj,
    })
    socket.on('ROOM:JOIN',obj)
    const {data} = await axios(`/rooms/${obj.roomId}`);
    dispatch({
      type : 'SET_DATA',
      payload:data,
    })
  }

  React.useEffect(()=>{
    socket.on('ROOM:SET_USERS',setUsers)
    socket.on('ROOM:NEW_MESSAGE',addMessage)
  },[]);
  
  return (
    <div className="App">
      {
        !state.joined ? <JoinBlock onLogin={onLogin}/> : <Chat {...state} onAddMessage={addMessage}/>
      }
    </div>
  );
}

export default App;
