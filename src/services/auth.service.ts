const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

interface AuthResponse {
    message: string;
    token: string;
    user: {
        id: string;
        email: string;
        username: string;
    };
}

const authService = {
    baseUrl: `${API_BASE_URL}/auth`,

    getAuthHeaders() {
        const token = this.getToken();
        return {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {})
        };
    },

    async login(email: string, password: string): Promise<AuthResponse> {
        if (!email?.trim() || !password?.trim()) {
            throw new Error("Email and password are required");
        }

        try {
            const response = await fetch(`${this.baseUrl}/login`, {
                method: "POST",
                headers: this.getAuthHeaders(),
                credentials: 'include',
                body: JSON.stringify({ email: email.trim(), password: password.trim() }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Login failed");
            }

            if (data.token) {
                localStorage.setItem("token", data.token);
            }

            return data;
        } catch (error) {
            console.error("Login error:", error);
            throw error;
        }
    },

    async register(username: string, email: string, password: string): Promise<AuthResponse> {
        if (!username?.trim() || !email?.trim() || !password) {
            throw new Error("All fields are required");
        }

        try {
            const response = await fetch(`${this.baseUrl}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username.trim(),
                    email: email.trim(),
                    password: password
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Registration failed");
            }

            return data;
        } catch (error) {
            console.error("Registration error:", error);
            throw error;
        }
    },

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    getToken() {
        return localStorage.getItem('token');
    }, isAuthenticated() {
        return !!this.getToken();
    }
};

export default authService;
