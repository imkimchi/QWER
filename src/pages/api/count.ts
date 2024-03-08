// pages/api/imageCount.ts
import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ totalImageCount: number; imageDetails: { filename: string }[] } | { error: string }>
) {
  const publicFolderPath = path.join(process.cwd(), 'public', 'slide');
  const imageRegex = /\.(png|jpg|jpeg|HEIC)$/i; // Updated regex to match various image file extensions

  try {
    const files = fs.readdirSync(publicFolderPath);
    const imageFiles = files
      .filter(file => imageRegex.test(file))
      .map(filename => ({ filename, lastModified: fs.statSync(path.join(publicFolderPath, filename)).mtimeMs }))
      .sort((a, b) => a.lastModified - b.lastModified);

    const sorted = imageFiles.map(image => image.filename)
    // console.log("a", a)

    res.status(200).json({ imageFiles: sorted });
  } catch (error) {
    console.log("ERR")
    res.status(500).json({ error: 'Error reading the public/slide folder' });
  }
}
