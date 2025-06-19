// Use window.location.origin in development if VITE_API_URL is not set
const API_BASE_URL = import.meta.env.VITE_API_URL || (
    import.meta.env.MODE === 'development' ? 'http://localhost:3000' : window.location.origin
);

export interface Plan {
    id: string;
    name: string;
    price: number | null;
    priceId: string;
    period: string;
    description: string;
    features: string[];
    limitations: string[];
}

export interface Subscription {
    id: string;
    userId: string;
    planId: string;
    status: string;
    createdAt: string;
    currentPeriodEnd: string;
    plan: Plan;
}

export interface PaymentResponse {
    upiLink: string;
    transactionId: string;
}

export interface Transaction {
    id: string;
    userId: string;
    planId: string;
    amount: number;
    status: 'pending' | 'completed' | 'failed';
    createdAt: string;
    completedAt?: string;
}

export class PricingService {
    private baseUrl = `${API_BASE_URL}/api/plans`;
    private paymentUrl = `${API_BASE_URL}/api/payments`; async getPlans(): Promise<Plan[]> {
        try {
            console.log('Fetching plans from:', this.baseUrl);
            const response = await fetch(this.baseUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                const errorText = await response.text();
                console.error('Server response:', errorText);
                throw new Error('Failed to fetch plans');
            }
            return response.json();
        } catch (error) {
            console.error('Error fetching plans:', error);
            throw error;
        }
    }

    async getPlan(id: string): Promise<Plan> {
        try {
            const response = await fetch(`${this.baseUrl}/${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch plan');
            }
            return response.json();
        } catch (error) {
            console.error('Error fetching plan:', error);
            throw error;
        }
    }

    async createPayment(planId: string, amount: number, planName: string): Promise<PaymentResponse> {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${this.paymentUrl}/upi/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ planId, amount, planName }),
            });

            if (!response.ok) {
                throw new Error('Failed to create payment');
            }
            return response.json();
        } catch (error) {
            console.error('Error creating payment:', error);
            throw error;
        }
    } async verifyPayment(transactionId: string, planId: string): Promise<{ success: boolean; subscription: Subscription }> {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Authentication required');
            }

            console.log('Verifying payment:', { transactionId, planId });
            const response = await fetch(`${this.paymentUrl}/verify`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ transactionId, planId }),
            });

            if (!response.ok) {
                throw new Error('Failed to verify payment');
            }
            return response.json();
        } catch (error) {
            console.error('Error verifying payment:', error);
            throw error;
        }
    }

    async getTransaction(transactionId: string): Promise<Transaction> {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${this.paymentUrl}/transaction/${transactionId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to get transaction status');
            }
            return response.json();
        } catch (error) {
            console.error('Error getting transaction:', error);
            throw error;
        }
    }

    async createSubscription(userId: string, planId: string): Promise<Subscription> {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${this.baseUrl}/subscribe`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ userId, planId }),
            });

            if (!response.ok) {
                throw new Error('Failed to create subscription');
            }
            return response.json();
        } catch (error) {
            console.error('Error creating subscription:', error);
            throw error;
        }
    }

    async getUserSubscription(userId: string): Promise<Subscription> {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${this.baseUrl}/subscription/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch user subscription');
            }
            return response.json();
        } catch (error) {
            console.error('Error fetching user subscription:', error);
            throw error;
        }
    }
}

// Initialize and export a singleton instance
const pricingService = new PricingService();

console.log('PricingService initialized with baseUrl:', pricingService['baseUrl']);

export { pricingService as default };
