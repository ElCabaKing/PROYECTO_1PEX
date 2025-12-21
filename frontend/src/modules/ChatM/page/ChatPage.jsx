import { useState } from "react"
import ChatList from "../../../components/ChatList/ChatList"
import Chat from "../../../components/Chat/Chat"
import RepairJob from "../../RepairJob/pages/RepairJob"
function ChatPage() {
  const [repairId, setRepairId] = useState(0)
  const [showChat, setShowChat] = useState(false)
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div style={{ width: '200px' }}>
        <ChatList change={setRepairId} show={setShowChat}></ChatList>

      </div>
      <div style={{ display: 'flex', alignItems: 'center', marginLeft: '20px'}}>
        {showChat &&
          <div style={{display: 'flex', flexDirection: 'row', alignItems: "center"}}>
            <Chat repairId={repairId} isTeam={true}></Chat>
            <div style={{width: '600px', height: "600px", boxSizing: "border-box", overflowY: "auto"}}>
            <RepairJob isChat={true} repairId={repairId}></RepairJob>
            </div>
          </div>
        }




      </div>
    </div>
  )
}

export default ChatPage