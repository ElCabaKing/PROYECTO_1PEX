

export const authToken = async (req,res) => {
    const token = req.cookies.auth_token;
    const refresh_token = req.cookies.refresh_token;
    
} 