// app/api/get-token/route.ts
import { NextResponse } from "next/server";
import { jwt as TwilioJwt } from "twilio";

const AccessToken = TwilioJwt.AccessToken;
const VoiceGrant = AccessToken.VoiceGrant;

const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID!;
const twilioApiKey = process.env.TWILIO_API_KEY!;
const twilioApiSecret = process.env.TWILIO_API_SECRET!;
const voiceServiceSid = process.env.TWILIO_VOICE_SERVICE_SID!;

export async function GET() {
  const identity = "user_identity_" + Math.floor(Math.random() * 1000);

  console.log(twilioAccountSid, twilioApiKey, twilioApiSecret, voiceServiceSid);

  const token = new AccessToken(
    twilioAccountSid,
    twilioApiKey,
    twilioApiSecret,
    { identity: "ishaan" }
  );
  token.identity = identity;

  const voiceGrant = new VoiceGrant({
    outgoingApplicationSid: voiceServiceSid,
    incomingAllow: true,
  });
  token.addGrant(voiceGrant);

  return NextResponse.json({ token: token.toJwt() });
}
