import { Router } from "express";
import { sendAutoEmail } from "./services/email.service";
import { google } from "googleapis";
import "dotenv/config";

function getPrivateKey() {
  const raw = process.env.GOOGLE_PRIVATE_KEY || "";
  return raw.replace(/(^"|"$)/g, "").replace(/\\n/g, "\n");
}

const auth = new google.auth.JWT(
  process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  undefined,
  getPrivateKey(),
  ["https://www.googleapis.com/auth/spreadsheets"]
);

const sheets = google.sheets({ version: "v4", auth });

const SPREADSHEET_ID = process.env.SHEET_ID!;

async function appendLeadToSheet(
  tipoConsorcio: string,
  nome: string,
  email: string,
  telefone: string
) {
  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: `A:E`,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [
        [
          new Date().toLocaleString("pt-BR"),
          tipoConsorcio,
          nome,
          email,
          telefone,
        ],
      ],
    },
  });
  console.log("Lead inserido no Google Sheets");
}

const router = Router();

router.post("/", async (req: any, res: any) => {
  const { nome, email, telefone } = req.body;
  try {
    const result = await sendAutoEmail(nome, email, telefone);
    await appendLeadToSheet("Consórcio Auto", nome, email, telefone);

    if (result.status === 200) {
      return res.status(200).json({ success: true });
    }
    return res
      .status(result.status)
      .json({ success: false, error: result.data });
  } catch (error: any) {
    console.error("Erro geral:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
