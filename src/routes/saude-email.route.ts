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

const SPREADSHEET_ID = "1U0rCiTiZ5RtpXBVcasYhL6IXjWk6ocxUjTOXQuENRks";

async function appendLeadToSheet(
  nome: string,
  email: string,
  telefone: string,
  valor_atual: string,
  operador_atual: string,
  has_cnpj: string
) {
  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: `A:G`,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [
        [
          new Date().toLocaleString("pt-BR"),
          nome,
          email,
          telefone,
          valor_atual,
          operador_atual,
          has_cnpj,
        ],
      ],
    },
  });
  console.log("Lead inserido no Google Sheets");
}

const router = Router();

router.post("/", async (req, res) => {
  const { name, email, telefone, valor_atual, operador_atual, has_cnpj } =
    req.body;
  try {
    const result = await sendSaudeEmail(
      name,
      email,
      telefone,
      valor_atual,
      operador_atual,
      has_cnpj
    );
    await appendLeadToSheet(
      name,
      email,
      telefone,
      valor_atual,
      operador_atual,
      has_cnpj
    );
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
