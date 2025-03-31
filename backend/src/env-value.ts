import { fileURLToPath } from "url";
import { dirname } from "path";
import * as dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);
global.__dirname = __dirname;

export const NODE_ENV = process.env.NODE_ENV || "development";

export const MONGO_URL = process.env.MONGO_URL || "";

export const PORT = process.env.PORT || 8000;

export const SECRET_KEY = process.env.SECRET_KEY || "";

export const BCRYPT_SALT = process.env.BCRYPT_SALT || "";

export const GOOGLE_AI_STUDIO_API_KEY =
  process.env.GOOGLE_AI_STUDIO_API_KEY || "";

export const AI_API_URL = process.env.AI_API_URL || "";