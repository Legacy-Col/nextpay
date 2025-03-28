'use client'

import { useRouter } from "next/navigation";
import { useState, useEffect, createContext, useContext } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

interface AuthContextType {
    user: any;
    SignUp: (email: string, password: string) => Promise<void>;
    SignIn: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        const token = Cookies.get("token");
        if (token) {
            const decodedUser = jwtDecode(token);
            setUser(decodedUser);
        }
    }, []);

    // SignUp function
    const SignUp = async (userData: any) => {
        try {
            const response = await fetch("/api/auth/signup/route", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message);

            Cookies.set("token", data.token, { expires: 7 });
            setUser(jwtDecode(data.token));
            router.push("/");
            return data;
        } catch (error: any) {
            console.error("Sign Up failed:", {error});
            throw error;
        }
    };

    // SignIn function
    const SignIn = async (email: string, password: string) => {
        try {
            const response = await fetch("/api/auth/signin/route", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message);

            Cookies.set("token", data.token);
            setUser(jwtDecode(data.token));
            router.push("/");
            return data;
        } catch (error: any) {
            console.error("Login Failed:", error.message);
            throw error;
        }
    };

    // Logout function
    const logout = () => {
        Cookies.remove("token");
        setUser(null);
        router.push("/sign-in");
    };

    return (
        <AuthContext.Provider value={{ user, SignIn, SignUp, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom Hook
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
