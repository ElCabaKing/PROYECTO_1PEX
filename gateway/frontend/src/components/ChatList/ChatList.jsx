import axios from "axios"
import { API_URL } from "../../utils/api"
import { useEffect, useState } from "react";
import styles from './ChatList.module.css';


function ChatList({change,show,bandera}) {
  const [chatList, setChatList] = useState([])
  async function getChatList() {
    const list = await axios.get(`${API_URL}/chat/getChatList`,
      {
        withCredentials: true
      }
    );
    setChatList(list.data);
  }

  useEffect(() => {
    getChatList()
  
  }, [bandera])
  
  return (
  
    <div className={styles.chatListContainer}>
      <h2>Mis Tareas</h2>
        {chatList.map((chat) => (
            <div onClick={() => {change(chat.id);show(true)}} key={chat.id} className={styles.chatItem}>
                <p className={styles.chatId}>ID: {chat.id}</p>
                <p className={styles.chatClient}>Cliente: {chat.cedula_cliente}</p>
            </div>
        ))}
    </div>
  )
}

export default ChatList