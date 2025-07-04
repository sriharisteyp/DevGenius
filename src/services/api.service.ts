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

const API_BASE_URL = 'https://devgenius-backend.onrender.com /';

export const apiService = {
    register: async (payload: RegisterPayload) => {
        const response = await fetch(`https://devgenius-backend.onrender.com //api/auth/register`, {
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
        const response = await fetch(`https://devgenius-backend.onrender.com //api/auth/login`, {
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
