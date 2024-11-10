// app/api/get-token/route.ts
import { NextResponse } from "next/server";
import { jwt as TwilioJwt } from "twilio";

const AccessToken = TwilioJwt.AccessToken;
const VoiceGrant = AccessToken.VoiceGrant;

// Environment variables for Twilio
const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID!;
const twilioApiKey = process.env.TWILIO_API_KEY!;
const twilioApiSecret = process.env.TWILIO_API_SECRET!;
const voiceServiceSid = process.env.TWILIO_VOICE_SERVICE_SID!;

export async function GET() {
  try {
    // Generate a unique identity for each user
    const identity = "user_identity_" + Math.floor(Math.random() * 1000);

    // Log the Twilio credentials (for debugging; remove in production)
    console.log(
      twilioAccountSid,
      twilioApiKey,
      twilioApiSecret,
      voiceServiceSid
    );

    const token = new AccessToken(
      twilioAccountSid,
      twilioApiKey,
      twilioApiSecret,
      {
        identity,
      }
    );

    const voiceGrant = new VoiceGrant({
      outgoingApplicationSid: voiceServiceSid,
      incomingAllow: true, // Enable incoming calls
    });
    token.addGrant(voiceGrant);

    return NextResponse.json({ token: token.toJwt(), identity });
  } catch (error) {
    console.error("Error generating Twilio token:", error);
    return NextResponse.json(
      { error: "Failed to generate token" },
      { status: 500 }
    );
  }
}
