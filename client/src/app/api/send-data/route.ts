import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Received Speech Data:", body);

    return NextResponse.json({ message: "Data received successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error processing speech data:", error);
    return NextResponse.json({ error: "Failed to process speech data" }, { status: 500 });
  }
}
