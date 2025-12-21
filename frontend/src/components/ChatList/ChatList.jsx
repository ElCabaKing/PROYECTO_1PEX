import axios from "axios"
import { API_URL } from "../../utils/api"
import { useEffect, useState } from "react";
import styles from './ChatList.module.css';


function ChatList({change,show}) {
  const [chatList, setChatList] = useState([])
  async function getChatList() {
    const list = await axios.get(`${API_URL}/chat/getChatList`);
    setChatList(list.data);
  }

  useEffect(() => {
    getChatList()
  
  }, [])
  
  return (
  
    <div className={styles.chatListContainer}>
      Chats
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