import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import UserModel from "../user/schema.js"
import { JwtAuthenticate } from "./jwt.js";
const googleStrategy = new GoogleStrategy({
    clientID: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: `${process.env.API_URL}/author/googleRedirect`
},
async (accessToken, profile, passportNext) => {
    try {
        
    } catch (error) {
        
    }
}
)
passport.serializeUser((data, passportNext) => {
    passportNext(null, data)
  })
export default googleStrategy