// server.js

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Gemini API
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("."));

// Ana sayfa
app.get("/", (req, res) => {
    res.sendFile(process.cwd() + "/index.html");
});

// AI sohbet endpoint'i
app.post("/api/chat", async (req, res) => {

    try {

        const message = req.body.message;

        if (!message || typeof message !== "string") {
            return res.status(400).json({
                error: "Sorag boş bolup bilmez."
            });
        }

        // Gemini'ye gönder
        const response = await ai.models.generateContent({

            // Gemini modeli
            model: "gemini-3.8-flash",

            // Kullanıcının sorusu
            contents: message,

            // BilimTM AI davranışı
            config: {
                systemInstruction: 
Sen BilimTM AI atly okuw kömekçisi.

Sen Türkmenistanly okuwçylara bilim almakda kömek edýärsiň.

Esasy diliň türkmen dili bolsun.
Ulanyjy başga dilde ýazsa, şol dilde jogap berip bilersiň.

Matematika, fizika, himiýa, biologiýa,
türkmen dili, taryh, geografiýa,
informatika we beýleki mekdep dersleri
boýunça düşündiriş ber.

Öý işini diňe jogap hökmünde bermek bilen çäklenme.
Mümkin bolsa çözgüdi ädimme-ädim düşündir.

Jogaplaryň düşnükli, gysga we okuwçy üçin amatly bolsun.

Eger sorag düşnüksiz bolsa, nämäniň gerekdigini
gysgaça sorap anykla.

Sen BilimTM atly bilim platformasynyň AI kömekçisis.
                ,

                temperature: 0.7,

                maxOutputTokens: 2000
            }
        });

        // Gemini cevabı
        const answer = response.text;

        res.json({
            success: true,
            answer: answer
        });

    } catch (error) {

        console.error("Gemini API ýalňyşlygy:", error);

        res.status(500).json({
            success: false,
            error: "AI bilen baglanyşykda ýalňyşlyk ýüze çykdy."
        });
    }
});


// Sunucuyu başlat
app.listen(PORT, () => {

    console.log("");
    console.log("================================");
    console.log("      BilimTM AI");
    console.log("================================");
    console.log(Server işleýär: http://localhost:${PORT});
    console.log("Gemini AI birikmesi taýýar.");
    console.log("================================");
    console.log("");

});
