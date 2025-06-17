interface User {
    username: string;
    email: string;
}

interface AuthResponse {
    message: string;
    token?: string;
    user?: User;
    requiresOTP?: boolean;
}

interface LoginCredentials {
    email: string;
    password: string;
}

interface RegisterCredentials {
    username: string;
    email: string;
    password: string;
}

interface VerifyOTPCredentials {
    email: string;
    otp: string;
    username: string;
    password: string;
}

class AuthService {
    private baseUrl = 'http://localhost:3000/auth';

    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        if (!credentials.email?.trim() || !credentials.password?.trim()) {
            throw new Error('Email and password are required');
        }

        try {
            const response = await fetch(`${this.baseUrl}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    email: credentials.email.trim(),
                    password: credentials.password.trim()
                }),
            });

            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            if (data.token) {
                localStorage.setItem('token', data.token);
            }

            return data;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }

    async register(credentials: RegisterCredentials): Promise<AuthResponse> {
        if (!credentials.username?.trim() || !credentials.email?.trim() || !credentials.password) {
            throw new Error('All fields are required');
        }

        try {
            const response = await fetch(`${this.baseUrl}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    username: credentials.username.trim(),
                    email: credentials.email.trim(),
                    password: credentials.password
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Registration failed');
            }

            return data;
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    }

    async verifyOTP(credentials: VerifyOTPCredentials): Promise<AuthResponse> {
        try {
            const response = await fetch(`${this.baseUrl}/verify`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'OTP verification failed');
            }

            if (data.token) {
                localStorage.setItem('token', data.token);
            }

            return data;
        } catch (error) {
            console.error('OTP verification error:', error);
            throw error;
        }
    }

    logout(): void {
        localStorage.removeItem('token');
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }

    isAuthenticated(): boolean {
        return !!this.getToken();
    }
}

export const authService = new AuthService();
