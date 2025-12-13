export default function ErrorHandler(error, req, res, next) {
    console.log(error)
    switch (error.type) {
        case "LOGIN":
            console.log(error.message, error.status)
            return res.status(error.status).json({ login: false, message: error.message });
            break;
        case "RECOVERY":
            break;
        
        case "REPAIR":
            return res.status(error.status).json({response: error.message});
            break;
        case "REGISTRO":
            return res.status(error.status).json({Nonexistent: true, message: error.message})
            break;
        default:
            return res.status(error.status).json({ error: error.message });
            break;

    }
}