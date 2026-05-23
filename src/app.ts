import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import compression from "compression";
import hpp from "hpp";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./app/config/swagger";

const app: Application = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  }),
);

app.use(express.json());

app.use(cookieParser());

app.use(helmet());

app.use(compression());

app.use(hpp());

app.get("/", (req: Request, res: Response) => {
  res.send({
    success: true,
    message: "Server Running Successfully",
  });
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(notFound);

app.use(globalErrorHandler);

export default app;
