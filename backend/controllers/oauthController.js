import dotenv from "dotenv";
dotenv.config();
import { OAuth2Client } from "google-auth-library";
const oAuth2Cilent = new OAuth2Client(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  "postmessage"
);
export const oauth = async (req, res) => {
  const { tokens } = await oAuth2Cilent.getToken(req.body.code);
  console.log(tokens);
  res.json(tokens);
};
export const oauthRefresh = async (req, res) => {
  const user = new UserRefreshClient(
    clientId,
    clientSecret,
    req.body.refreshToken
  );
  const { credentials } = await user.refreshAccessToken(); // optain new tokens
  res.json(credentials);
};
