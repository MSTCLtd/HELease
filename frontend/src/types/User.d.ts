export type User = {
    id: number;
    phone: string;
    username: string;
    password: string;
    name: string;
    email: string;
    registrationNumber: string;
    role: string;
    isVerified: boolean;
    isEmailVerified: boolean;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    businessType: string | null;
    panNumber: string | null;
    gstNumber: string | null;
    roBo: string;
    permissions: string[];
};