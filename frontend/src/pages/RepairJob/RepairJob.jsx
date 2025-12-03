import { useParams } from "react-router-dom";
import useJob from "../../hooks/useJob";
import { useEffect } from "react";
function RepairJob() {
const { id } = useParams();
const {hkgetJob} = useJob()


useEffect(() => {
  hkgetJob(id)

}, [])

  return (
    <div>{id}</div>
  )
}

export default RepairJob