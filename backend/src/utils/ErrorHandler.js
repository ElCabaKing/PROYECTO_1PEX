

export default function ErrorHndler(error,req,res,next){
    console.log(error)
    switch (error.type){
        case "LOGIN":
            console.log("entro al logiin")
            return res.status(error.status).json({login: false})
    }
    return res.status(error.status ).json({error: error.message})
}