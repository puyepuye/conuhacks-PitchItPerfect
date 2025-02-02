import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Convert file to a buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Ensure the uploads directory exists
    const uploadDir = path.join(process.cwd(), "public/uploads");
    await fs.mkdir(uploadDir, { recursive: true });

    // Save as `local-attempt.pdf` (overwrite previous file)
    const filePath = path.join(uploadDir, "local-attempt.pdf");
    await fs.writeFile(filePath, buffer);

    // Return the static file URL
    const fileUrl = `/uploads/local-attempt.pdf`;

    return NextResponse.json({ fileUrl });
  } catch (error) {
    console.error("Error saving slide PDF:", error);
    return NextResponse.json({ error: "Error saving slide PDF" }, { status: 500 });
  }
}
