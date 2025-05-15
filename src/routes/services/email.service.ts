import axios from "axios";
import "dotenv/config";

const MANDRILL_API_KEY = process.env.MANDRILL_API_KEY!;
const FROM_EMAIL = process.env.FROM_EMAIL!;
const TO_EMAIL = process.env.TO_EMAIL!;

export const sendAutoEmail = async (
  nome: string,
  email: string,
  telefone: string
) => {
  console.log(MANDRILL_API_KEY);
  const subject = "NOVA SIMULAÇÃO SOLICITADA - Consórcio Automóvel Porto";
  const html = `
    <p>Olá! Seguem abaixo os dados de quem solicitou uma simulação do Consórcio Automóvel Porto:</p><br>
    <p>Nome: ${nome}</p><p>Email: ${email}</p><p>Telefone: ${telefone}</p>`;

  // 1) Dispara o email
  const result = await axios.post(
    "https://mandrillapp.com/api/1.0/messages/send.json",
    {
      key: MANDRILL_API_KEY,
      message: {
        html,
        subject,
        from_email: FROM_EMAIL!,
        to: [{ email: TO_EMAIL, type: "to" }],
      },
    }
  );
  console.log("Mandrill result:", result.data);

  return result;
};

export const sendImovelEmail = async (
  nome: string,
  email: string,
  telefone: string
) => {
  const subject = "NOVA SIMULAÇÃO SOLICITADA - Consórcio Imóvel Porto";
  const html = `
    <p>Olá! Seguem abaixo os dados de quem solicitou uma simulação do Consórcio Imóvel Porto:</p><br>
    <p>Nome: ${nome}</p><p>Email: ${email}</p><p>Telefone: ${telefone}</p>`;

  const result = await axios.post(
    "https://mandrillapp.com/api/1.0/messages/send.json",
    {
      key: MANDRILL_API_KEY,
      message: {
        html,
        subject,
        from_email: FROM_EMAIL,
        to: [{ email: TO_EMAIL, type: "to" }],
      },
    }
  );
  console.log("Mandrill result:", result.data);

  return result;
};

export const sendPesadosEmail = async (
  nome: string,
  email: string,
  telefone: string
) => {
  const subject =
    "NOVA SIMULAÇÃO SOLICITADA - Consórcio Automóvel Pesado Porto";
  const html = `
    <p>Olá! Seguem abaixo os dados de quem solicitou uma simulação do Consórcio Automóvel Pesado Porto:</p><br>
    <p>Nome: ${nome}</p><p>Email: ${email}</p><p>Telefone: ${telefone}</p>`;

  const result = await axios.post(
    "https://mandrillapp.com/api/1.0/messages/send.json",
    {
      key: MANDRILL_API_KEY,
      message: {
        html,
        subject,
        from_email: FROM_EMAIL,
        to: [{ email: TO_EMAIL, type: "to" }],
      },
    }
  );
  console.log("Mandrill result:", result.data);

  return result;
};
