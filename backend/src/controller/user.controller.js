import bcrypt from 'bcrypt';
import modelUser from "../model/user.model.js"
export const ctSaveAns = async (req, res) => {
    const saltRounds = 10;
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
            return res.json({validate: true})
        }
        else{
            return res.json({validate: false})
        }
    }
    catch(error){
        return res.json({validate: false})
    }
}

export default {
    ctSaveAns,
    ctValidateAns
}