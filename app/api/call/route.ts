import { NextResponse } from "next/server";
import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

export async function POST(request: Request) {
  const { to } = await request.json();

  if (!to || !twilioNumber || !accountSid || !authToken) {
    return NextResponse.json(
      { error: "Missing required parameters or Twilio credentials." },
      { status: 400 }
    );
  }

  try {
    const call = await client.calls.create({
      from: twilioNumber,
      to,
      url: "http://demo.twilio.com/docs/voice.xml",
    });
    return NextResponse.json({ sid: call.sid }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to make a call" },
      { status: 500 }
    );
  }
}
