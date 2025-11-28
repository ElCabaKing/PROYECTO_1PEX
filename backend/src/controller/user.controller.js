import bcrypt from 'bcrypt';
import modelUser from "../model/user.model.js"
export const ctSaveAns = async (req, res) => {
    const saltRounds = 10;
    try{
        const Sk_ans = await bcrypt.hash(req.body.ans,saltRounds);
        const user_password = await bcrypt.hash(req.body.user_password,saltRounds);
        console.log(req.body)
        await modelUser.mdSaveSkAns(req.body.user_name,Sk_ans,user_password);
        return res.json({response: true});
    }
    catch(error){
        return res.status(500).json({error: error.message})
    }
}

export const ctValidateAns = async (req,res) => {
    try{
        console.log(req.query.user_name)
        const ans = await modelUser.mdGetAns(req.query.user_name);
        const validated = await bcrypt.compare(req.query.user_ans,ans.security_code);
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