export default function ErrorHndler(error, req, res, next) {
    console.log(error)
    switch (error.type) {
        case "LOGIN":
            return res.status(error.status).json({ login: false });

        case "RECOVERY":

        default:
            return res.status(error.status).json({ error: error.message })

    }
}