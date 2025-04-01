import  Jwt  from "jsonwebtoken";
import * as bcrypt from "bcrypt";


const SECRET_KEY = "JWT_SECRET_KEY"

export const hashPassword = async (password: string) => {
    return await bcrypt.hash(password, 20);
};

export const comparePassword = async (password: string, hash: string) => {
    return await bcrypt.compare(password, hash);
};

export const generateAccessToken = (user: { email: string }) => {
    return Jwt.sign(user, SECRET_KEY, { expiresIn: "15min" });
}

export const generatRefreshToken = (user: { email: string }) => {
    // return Jwt.sign(user, SECRET_KEY, {expiresIn: "30d"})
    return Jwt.sign(user, SECRET_KEY, { expiresIn: "30d" });
}

export const verifyToken = (token: string) => {
    try {
        // return Jwt.verify(token, SECRET_KEY)
        return Jwt.verify(token, SECRET_KEY);
    } catch (error) {
        return null
    }
}