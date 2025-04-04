"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, createContext, useContext } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { AuthFormType } from "@/lib/utils";
import { showToast } from "@/components/Animatedtoast";

interface DecodedUser {
    email: string;
    exp?: number;
}

interface AuthContextType {
    user: any;
    error: string | null;
    SignUp: (props: AuthFormType) => Promise<boolean>;
    SignIn: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<DecodedUser | null>(null);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const token = Cookies.get("token");
        if (token) {
            try {
                if (token.split(".").length !== 3) {
                    setError("Invalid token format");
                    return;
                }

                const decodedUser: DecodedUser = jwtDecode(token);

                // Ensure token has an expiration field before checking
                if (decodedUser.exp && decodedUser.exp * 1000 < Date.now()) {
                    showToast("Token Expired, Logging out...", "info");
                    logout();
                    return;
                }

                setUser(decodedUser);
            } catch (error) {
                console.error("Error decoding token:", error);
                logout();
            }
        }
    }, []);

    // SignUp function
    const SignUp = async (userData: AuthFormType): Promise<boolean> => {
        setError(null);
        try {
            const response = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
            });

            const data = await response.json();
            console.log("Whats the error about:", data)
            if (!response.ok) {
                showToast(data.message || "Sign-up failed", "error");
                return false;
            }

            if (!data.token) {
                setError("No token received");
                return false;
            }

            Cookies.set("token", data.token, { expires: 7 });
            setUser(jwtDecode(data.token));
            showToast("Sign Up Completed", "success")
            router.push("/sign-in");
            return true;
        } catch (error: any) {
            console.error("Sign Up failed:", error);
            showToast("An error occurred during sign-up", "error")
            return false;
        }
    };

    // SignIn function
    const SignIn = async (email: string, password: string): Promise<boolean> => {
        setError(null);
        try {
            const response = await fetch("/api/auth/signin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (!response.ok) {
                showToast(data.message || "Login failed", "error");
                return false;
            }

            if (!data.accessToken) {
                showToast("No token received", "error")
                return false;
            }

            Cookies.set("token", data.accessToken, { expires: 7 });
            setUser(jwtDecode(data.accessToken));
            showToast("Login Successfull.", "success")
            router.push("/");
            return true;
        } catch (error: any) {
            console.error("Login Failed:", error);
            showToast("An error occurred during sign-in", "error");
            return false;
        }
    };

    // Logout function
    const logout = () => {
        Cookies.remove("token");
        setUser(null);
        router.push("/sign-in");
    };

    return (
        <AuthContext.Provider value={{ user, error, SignIn, SignUp, logout }}>
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
