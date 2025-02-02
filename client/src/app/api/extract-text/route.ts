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

    // Define paths
    const uploadsDir = path.join(process.cwd(), "public/uploads");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Define paths for PDF and extracted text
    const tempPdfPath = path.join(uploadsDir, `local-attempt.pdf`);
    const extractedTxtPath = tempPdfPath.replace(".pdf", ".txt");

    // Write the PDF file to the server
    await writeFile(tempPdfPath, buffer);

    // Extract text from PDF
    const pages: string[] = await new Promise((resolve, reject) => {
      extract(tempPdfPath, { splitPages: true }, (err, pages) => {
        if (err) return reject(err);
        resolve(pages);
      });
    });

    // Combine text into one string
    const extractedText = pages.join("\n\n");

    // Save extracted text to a .txt file
    await writeFile(extractedTxtPath, extractedText, "utf-8");

    // Return the path of the extracted text file
    return NextResponse.json({ 
      message: "Text extracted successfully", 
      textFilePath: `/uploads/${path.basename(extractedTxtPath)}`,
      textContent: extractedText, 
    });
  } catch (error) {
    console.error("Error extracting PDF text:", error);
    return NextResponse.json({ error: "Error extracting PDF text" }, { status: 500 });
  }
}
