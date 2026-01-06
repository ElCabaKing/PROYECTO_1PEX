import { useState } from "react"
import ChatList from "../../../components/ChatList/ChatList"
import Chat from "../../../components/Chat/Chat"
import RepairJob from "../../RepairJob/pages/RepairJob"
import styles from './ChatPage.module.css'
function ChatPage() {
  const [repairId, setRepairId] = useState(0)
  const [showChat, setShowChat] = useState(false)
  const [bandera, setBandera] = useState(0)
  return (
    <div className={styles.container}>
      <div className={styles.chatListWrapper}>
        <ChatList change={setRepairId} show={setShowChat}></ChatList>

      </div>
      <div className={styles.contentWrapper}>
        {showChat &&
          <div className={styles.chatAndRepair}>
            <Chat repairId={repairId} isTeam={true} bandera={bandera}></Chat>
            <div className={styles.repairWrapper}>
            <RepairJob isChat={true} repairId={repairId} setBandera={setBandera}></RepairJob>
            </div>
          </div>
        }




      </div>
    </div>
  )
}

export default ChatPage