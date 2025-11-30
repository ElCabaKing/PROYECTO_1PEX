import bcrypt from 'bcrypt';
import modelUser from "../model/user.model.js"
const saltRounds = 10;
export const ctSaveAns = async (req, res) => {
    try{
        const {ans,user_password,user_name} = req.body
        const Sk_ans = await bcrypt.hash(ans,saltRounds);
        const user_passwordhs = await bcrypt.hash(user_password,saltRounds);
        console.log(req.body)
        await modelUser.mdSaveSkAns(user_name,Sk_ans,user_passwordhs);
        return res.json({response: true});
    }
    catch(error){
        return res.status(500).json({error: error.message})
    }
}

export const ctValidateAns = async (req,res) => {
    try{
        const {user_name,user_ans} = req.body;
        console.log(req.query.user_name)
        const ans = await modelUser.mdGetAns(user_name);
        const validated = await bcrypt.compare(user_ans,ans.security_code);
        console.log(validated)
        if(validated){
            return res.json({validate: true});
        }
        else{
            return res.json({validate: false});
        };
    }
    catch(error){
        return res.json({validate: false})
    };
};

export const ctSaveUser = async (req,res) => {
    try{
        const {user_name, user_role, apellido, nombre} =req.body;
        const firstPass = await bcrypt.hash(user_name,saltRounds);
        await modelUser.mdSaveUser(user_name,apellido,nombre,user_role,firstPass);
        return res.json({response: "Usuario guardado correctamente"});
    }
    catch(error){
        return res.status(500).json({response: error.message})
    };
};

export const ctGetList = async (req,res) => {
    try{
        const {user_name,index_number} = req.query;
        console.log(user_name,index_number)
        const maxIndex = await modelUser.mdGetIndex();
        const index_int = Number(index_number)
        const user_list = await modelUser.mdGetList(user_name,index_int);
        return res.json({listData: user_list , maxIndex: maxIndex})
    }
    catch(error){
        return res.status(500).json({error: error.message})
    };
};

export const ctChangeRol = async (req,res) => {
    try{
        const {ID, rol_id}  = req.body;
        await modelUser.mdChangeRol(ID,rol_id);
        return res.json({message: "Rol cambiado exitosamente"});
    }
    catch(error){
        return res.status(500).json({error: error.message})
    };
};

export const ctChangeStatus = async (req,res) => {
    try {
        const {ID,estado} = req.body;
        await modelUser.mdChangeStatus(ID,estado);
        return res.json({message: "Estado actualizado"})
    } 
    catch (error) {
        return res.status(500).json({error: error.message})   
    }
};

export default {
    ctSaveAns,
    ctValidateAns,
    ctSaveUser,
    ctGetList,
    ctChangeRol,
    ctChangeStatus
}