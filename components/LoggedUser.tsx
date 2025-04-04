"use client";

import { useState, useEffect } from "react";
import BalanceBox from "./BalanceBox";
import HeaderBox from "./HeaderBox";
import RightSidebar from "./RightSidebar";
import { showToast } from "./Animatedtoast";
import { GET } from "@/app/api/auth/user/route";

interface LoggedInfo {
    firstName: string;
    lastName: string;
    email: string;
}

export default function LoggedUser() {
    const [loggedData, setLoggedData] = useState<LoggedInfo | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {

                const token = document.cookie.
                    split(";")
                    .find(row => row.startsWith("tokent="))
                    ?.split("=")[1];

                if (!token) {
                    showToast("User not verified", "info");
                }

                const response = await fetch("/api/auth/user", {
                    method: "GET",
                    headers: { "Authentication": `Bearer${token}` },
                });


                if (!response.ok) {
                    throw new Error("Failed to fetch user data");
                }

                const data = await response.json();
                setLoggedData(data);
            } catch (error: any) {
                setError(error.message);
                showToast("Failed to get user information", "error");
            } finally {
                setLoading(false);
            }
        };

        fetchUserInfo();
    }, []);

    useEffect(() => {
        if (loading) {
            showToast("Please wait, logging in user...", "info");
        }
    }, [loading]);

    return (
        <section className="home">
            <div className="home-content">
                <header className="home-header">
                    <HeaderBox
                        type="greeting"
                        title="Welcome"
                        user={loggedData?.firstName || "User"}
                        subText="View and manage the funds in your account and transactions"
                    />
                    <BalanceBox accounts={[]} totalBanks={1} totalCurrentBalance={1250.45} />
                </header>

                RECENT TRANSACTIONS
            </div>
            <RightSidebar
                user={loggedData}
                transactions={[]}
                banks={[{ totalCurrentBalance: 1700 }, { totalCurrentBalance: 2000 }]}
            />
        </section>
    );
}
