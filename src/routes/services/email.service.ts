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

export const sendSaudeEmail = async (
  name: string,
  email: string,
  telefone: string,
  currentValue: string,
  currentOperator: string,
  hasCNPJ: string
) => {
  const subject = "NOVA SIMULAÇÃO SOLICITADA - Plano de Saúde Bradesco";
  const html = `
    <p>Olá! Seguem abaixo os dados de quem solicitou uma simulação do Plano de Saúde Bradesco:</p><br>
    <p>Nome da Empresa: ${name}</p><p>EMAL: ${email}</p><p>Telefone: ${
    telefone || "-"
  }</p><p>Valor Atual: ${
    currentValue || "-"
  }</p><p>Operador Atual: ${currentOperator}</p><p>Tem CNPJ ou CAEPF: ${hasCNPJ}</p>`;

  const result = await axios.post(
    "https://mandrillapp.com/api/1.0/messages/send.json",
    {
      key: MANDRILL_API_KEY,
      message: {
        html,
        subject,
        from_email: FROM_EMAIL,
        to: [{ email: "douglas@10xcorretora.com", type: "to" }],
      },
    }
  );
  console.log("Mandrill result:", result.data);

  return result;
};
