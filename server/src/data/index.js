import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, 'db.json');

class DB {
    constructor() {
        this.data = null;
    }

    async load() {
        try {
            const rawData = await fs.readFile(dbPath, 'utf8');
            this.data = JSON.parse(rawData);
        } catch (error) {
            if (error.code === 'ENOENT') {
                // If file doesn't exist, create it with initial structure
                this.data = { users: [] };
                await this.save();
            } else {
                console.error('Database read error:', error);
                throw new Error('Database read failed');
            }
        }
    }

    async save() {
        try {
            await fs.writeFile(dbPath, JSON.stringify(this.data, null, 2), 'utf8');
        } catch (error) {
            console.error('Database write error:', error);
            throw new Error('Database write failed');
        }
    }

    // Helper to ensure unique email
    async ensureUniqueEmail(email) {
        const existingUser = await this.findUserByEmail(email);
        if (existingUser) {
            const error = new Error('Email already registered');
            error.status = 400;
            throw error;
        }
    }

    // User operations with better error handling
    async findUserByEmail(email) {
        if (!email) throw new Error('Email is required');
        await this.load();
        return this.data.users.find(user => user.email.toLowerCase() === email.toLowerCase());
    }

    async createUser(userData) {
        if (!userData.email || !userData.password || !userData.username) {
            throw new Error('Missing required user data');
        }

        await this.ensureUniqueEmail(userData.email);
        await this.load();

        const newUser = {
            id: Date.now().toString(),
            ...userData,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        this.data.users.push(newUser);
        await this.save();
        return newUser;
    }

    async updateUser(id, updates) {
        await this.load();
        const userIndex = this.data.users.findIndex(user => user.id === id);
        if (userIndex === -1) return null;

        this.data.users[userIndex] = {
            ...this.data.users[userIndex],
            ...updates,
            updatedAt: new Date().toISOString()
        };

        await this.save();
        return this.data.users[userIndex];
    }

    async deleteUser(id) {
        await this.load();
        const userIndex = this.data.users.findIndex(user => user.id === id);
        if (userIndex === -1) return false;

        this.data.users.splice(userIndex, 1);
        await this.save();
        return true;
    }

    async getAllUsers() {
        await this.load();
        return this.data.users;
    }

    // Helper method to clear all data (useful for testing)
    async clear() {
        this.data = { users: [] };
        await this.save();
    }
}

// Create and export a singleton instance
const db = new DB();
export default db;
