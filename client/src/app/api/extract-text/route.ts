import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { promisify } from "util";
import extract from "pdf-text-extract";

// Convert fs functions to promises
const writeFile = promisify(fs.writeFile);
const unlink = promisify(fs.unlink);

export async function POST(req: NextRequest) {
  try {
    // Extract file from form data
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Convert file to a buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Define a temporary file path
    const tempFilePath = path.join("/tmp", `uploaded-${Date.now()}.pdf`);

    // Write the file to the server
    await writeFile(tempFilePath, buffer);

    // Extract text page by page
    const pages: string[] = await new Promise((resolve, reject) => {
      extract(tempFilePath, { splitPages: true }, (err, pages) => {
        if (err) return reject(err);
        resolve(pages);
      });
    });

    // Clean up: Delete the temporary file
    await unlink(tempFilePath);

    // Structure response with each page's text stored separately
    return NextResponse.json({ pages });
  } catch (error) {
    console.error("Error extracting PDF text:", error);
    return NextResponse.json({ error: "Error extracting PDF text" }, { status: 500 });
  }
}
