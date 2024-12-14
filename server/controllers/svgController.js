import Replicate from 'replicate';
import path from 'path';
import { fileURLToPath } from 'url';
import { downloadSVG } from '../utils/downloadSvg.js';
import dotenv from 'dotenv';
 import 'dotenv/config';
import { config } from 'dotenv';
config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(process.env.REPLICATE_API_KEY, 'process.env.REPLICATE_API_KEY')
const replicate = new Replicate({
 auth: process.env.REPLICATE_API_KEY
});

 
  export async function generateSVG(req, res) {
 
  //   return res.json({ 
  //     success: true, 
  //     svg: "/generated/svg_2024-12-13_073927744Z_efddd0a8.svg" 
  //   });
  // }
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ 
        success: false, 
        error: 'Prompt is required' 
      });
    }

    const output = await replicate.run('recraft-ai/recraft-v3-svg', { 
      input: { prompt },
    });

    // Save the SVG file
    const outputPath = path.join(__dirname, '../../public/generated');
    const svgCode = await downloadSVG(output.toString(), outputPath);
    
    const match = svgCode.match(/generated.*$/);
    if (match) {
      return res.status(200).json({ 
        success: true, 
        svg: match[0] 
      });
    }

    return res.status(200).json({
      success: true,
      svg: "generated/svg_2024-12-09_061259876Z_655f405d.svg"
    });

  } catch (error) {
    console.error('Replicate generation error:', error);
    return res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
}