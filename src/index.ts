import express from "express";
import dotenv from "dotenv";
import autoEmailRouter from "./routes/auto-email.route";
import imovelEmailRouter from "./routes/imovel-email.route";
import pesadosEmailRouter from "./routes/pesados-email.route";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use("/api/auto/email", autoEmailRouter);
app.use("/api/imovel/email", imovelEmailRouter);
app.use("/api/pesados/email", pesadosEmailRouter);

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
