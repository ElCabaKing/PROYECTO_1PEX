import { appGetUsers,appChangeRole,appAlterStatus,appSaveUser} from "../api/user.api";
import { useState } from "react";
export default function UseUser(){
    const [roles_list, setRoles_list] = useState([]);
    const [userList, setUserList] = useState([]);
    const [indexNum, setIndexNum] = useState(1);
    const [indexMaxList, setindexMaxList] = useState([])
    const [message, setMessage] = useState("")
    const [showAlert, setShowAlert] = useState(false);  
    const [showNewUserFrom, setShowNewUserFrom] = useState(false)
    async function hkgetUser() {
        const user_nombre = JSON.parse(atob(localStorage.getItem("user_name")));
        const user_list = await appGetUsers({user_name: user_nombre, index_number_s: indexNum});

        setindexMaxList(indexList(user_list.maxIndex))
        setUserList(user_list.listData[0]);
        setRoles_list(user_list.listData[1]);
        console.log(user_list)
    }
    async function hkalerStatus({ID,estado}) {
        console.log(estado)
        if(estado==0){
            setMessage(await appAlterStatus({ID:ID, estado: true}))
        }
        else{
            setMessage(await appAlterStatus({ID:ID, estado: false}))
        }
        miticMsg();
        
    }

    async function hkchangeRole({ID,rol_id}) {
        const res = await appChangeRole({ID: ID, rol_id:rol_id})
        setMessage(res.message);
        miticMsg();
    }

    function miticMsg(){
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
            setMessage("");
        }, 3000);
        hkgetUser();
    }

    async function hksaveUser({nombre,apellido,user_name,user_role}) {
        const res = await appSaveUser({nombre: nombre, 
            apellido: apellido, 
            user_name: user_name,
            user_role: user_role});
        console.log(res);
        setMessage(res);
        setShowNewUserFrom(false);
        miticMsg();
    }

    function indexList(b){
        const range = (b) =>
        Array.from({ length: Math.abs(b - 1) + 1 }, (_, i) => Math.min(1, b) + i);
        return range(b)
    }
    return {
        hkgetUser,
        userList,
        roles_list,
        hkchangeRole,
        message,
        showAlert,
        hkalerStatus,
        setShowNewUserFrom,
        showNewUserFrom,
        hksaveUser,
        indexMaxList,
        indexNum,
        setIndexNum
    }
} 