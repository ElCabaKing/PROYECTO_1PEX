import { useParams } from "react-router-dom";

function RepairJob() {
const { id } = useParams();


  return (
    <div>{id}</div>
  )
}

export default RepairJob