import { Router } from "express";
import { sendSaudeEmail } from "./services/email.service";
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

router.post("/", async (req, res) => {
  const { cnpj, name, email, telefone, collaborators } = req.body;
  try {
    const result = await sendSaudeEmail(
      cnpj,
      name,
      email,
      telefone,
      collaborators
    );
    await appendLeadToSheet("10X Saúde", name, email, telefone);
    console.log("Mandrill result:", result.data);

    if (result.status !== 200) {
      res.status(result.status).json({ success: false, error: result.data });
    }
    res.status(200).json({ success: true, message: result.data });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
});

export default router;
