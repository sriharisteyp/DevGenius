interface RegisterPayload {
    username: string;
    email: string;
    password: string;
}

interface VerifyPayload {
    email: string;
    username: string;
    password: string;
}

interface LoginPayload {
    email: string;
    password: string;
}

const API_BASE_URL = 'http://localhost:3000';

export const apiService = {
    register: async (payload: RegisterPayload) => {
        const response = await fetch(`http://localhost:3000/api/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error('Registration failed');
        }

        return response.json();
    },

    login: async (payload: LoginPayload) => {
        const response = await fetch(`http://localhost:3000/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        return response.json();
    },
};

export default apiService;
