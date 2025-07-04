import { readFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, "../data/db.json");

// Function to get all users
export const getUsers = async () => {
  try {
    const data = await readFile(dbPath, "utf8");
    const db = JSON.parse(data);
    return db.users; // Assuming `users` is the key in your JSON
  } catch (error) {
    console.error("Error getting users:", error);
    throw new Error("Failed to get users");
  }
};

// Function to get a user by ID
export const getUserById = async (id) => {
  try {
    const data = await readFile(dbPath, "utf8");
    const db = JSON.parse(data);
    const user = db.users.find((u) => u.id === parseInt(id, 10));

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    console.error("Error getting user:", error);
    throw new Error("Failed to get user");
  }
};
