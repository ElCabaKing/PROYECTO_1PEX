import { useState } from "react"
import { useNavigate } from "react-router-dom"
export default function useHome(){
    const navigate = useNavigate()
    const [codeNumber, setCodeNumber] = useState("")
    async function hkSearchCode(params) {

    }
    return {
        setCodeNumber,
        hkSearchCode,
        codeNumber
    }
}

