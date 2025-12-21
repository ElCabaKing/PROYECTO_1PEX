import { useState } from "react"
import ChatList from "../../../components/ChatList/ChatList"
import Chat from "../../../components/Chat/Chat"

function ChatPage() {
  const [repairId, setRepairId] = useState(0)
  const [showChat, setShowChat] = useState(false)
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div style={{ width: '200px'}}>
        <ChatList change={setRepairId} show={setShowChat}></ChatList>

      </div>
      <div style={{display: 'flex', alignItems: 'center', marginLeft: '20px'}}>
        {showChat &&
          <Chat repairId={repairId} isTeam={true}></Chat>
        }
      </div>
    </div>
  )
}

export default ChatPage