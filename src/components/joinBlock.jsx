import React from "react";
import '../index.css';
import socket from '../socket';
import axios from "axios";
const JoinBlock =({onLogin})=>{

    const [roomId, setroomId] = React.useState('');
    const [userName, setuserName] = React.useState('');
    const [joined, setJoined] = React.useState(true);

    const obj = {
        userName,
        roomId
    }
    const postData = async() =>{
        if(!roomId || !userName){
           return alert('Данные не верны')
        }
        setJoined(false)
        await axios.post('/rooms',obj);
        onLogin(obj);
        socket.emit('ROOM:JOIN',obj);
    }

    return (
        <div className="join-block">
          <input
            value={roomId}
            onChange={(e)=>setroomId(e.target.value)}
            type="text"
            placeholder="Room ID"
          />
          <input
            value={userName}
            onChange={(e)=>setuserName(e.target.value)}
            type="text"
            placeholder="Ваше имя"
          />
         {
             joined ? <button onClick={postData}className="btn btn-success">Войти</button>:<button disabled={joined} onClick={postData}className="btn btn-success">Вход...</button>
         }
        </div>
      );
}
export default JoinBlock;