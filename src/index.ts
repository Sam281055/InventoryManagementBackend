import express from "express"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
// RouteImports
import dashboardRoutes from "./routes/dashboardRoutes"
import productRoutes from "./routes/productRoutes"
import userRoutes from "./routes/userRoutes"
import expenseRoutes from "./routes/expenseRoutes"

// Configurations
dotenv.config();
const app = express();
app.use(express.json());
// app.use(helmet());
// app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());
app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"], // Permitir recursos de la misma fuente
        scriptSrc: ["'self'", "https://vercel.live"], // Permitir scripts de vercel.live
        connectSrc: ["'self'", "https://vercel.live"], // Permitir conexiones a vercel.live
        imgSrc: ["'self'", "data:"], // Permitir imágenes de la misma fuente y de datos
        styleSrc: ["'self'", "https://fonts.googleapis.com"], // Permitir estilos de la misma fuente y de Google Fonts
      },
    },
  }));
// Routes
app.use("/dashboard", dashboardRoutes);
app.use("/products", productRoutes);
app.use("/users", userRoutes);
app.use("/expenses", expenseRoutes);
// SERVER
const port = Number(process.env.PORT) || 3001;
app.listen(port, "0.0.0.0",()=>{
    console.log(`Server running on port ${port}`);
})
