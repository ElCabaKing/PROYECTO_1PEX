export default function ErrorHandler(error, req, res, next) {
    console.log(error)
    switch (error.type) {
        case "LOGIN":
            console.log(error.message, error.status)
            return res.status(error.status).json({ login: false, message: error.message });
        case "REGISTRO":
            return res.status(error.status).json({Nonexistent: true, message: error.message});
        case "CREATE":
            return res.status(error.status).json({isSaved: false, message: error.message});
        default:
            return res.status(error.status).json({ error: error.message });

    }
}