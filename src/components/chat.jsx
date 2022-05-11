import React,{useRef} from 'react';
import socket from '../socket';

function Chat({users,messages,userName,roomId,onAddMessage}) {

const [messageValue, setMessageValue] = React.useState('');
const messagesRef = useRef(null);

const sendMessage =()=>{
    socket.emit('ROOM:NEW_MESSAGE',{
        userName,
        roomId,
        text: messageValue,
    })
    onAddMessage({
        userName,
        text: messageValue,
    })
    setMessageValue('');
    };

    React.useEffect(()=>{
        messagesRef.current.scrollTo(0, 99999);
    },[messages]);

    const classNames = 'message';
  return (
    <div className="chat">
      <div className="chat-users">
        Комната: <b>{roomId}</b>
        <hr />
        <b>Онлайн ({users.length})</b>
        <ul>
          {
              users.map((name,id) =>  <li key={id}>{name}</li>)
          }
        </ul>
      </div>
      <div className="chat-messages">
      <div  ref={messagesRef} className="messages">
          {
              messages.map((message,id) => <div key={id}className={userName === message.userName? 'message  message-me': ' message'}>
                    <p>{message.text}</p> 
                    <div>
                      <span>{message.userName}</span>
                    </div>
                  </div>
              )
          }
          </div>
        <form>
          <textarea
            value={messageValue}
            onChange={(e) => setMessageValue(e.target.value)}
            className="form-control"
            rows="3"></textarea>
          <button  onClick={sendMessage} type="button" className="btn btn-primary">
            Отправить
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;