import bcrypt from "bcryptjs";
import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";

const readline = createInterface({ input: stdin, output: stdout });
const password = await readline.question("Mot de passe administrateur à hacher : ");
readline.close();

if (password.length < 12) {
  throw new Error("Choisissez un mot de passe d'au moins 12 caractères.");
}

console.log(await bcrypt.hash(password, 12));
