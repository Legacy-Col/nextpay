

declare interface HeaderBoxProps {
    type ?: "title" | "greeting";
    title: string;
    subText: string;
    user ?: string;
}

declare interface BalanceBoxProps {
    accounts: Array
    totalBanks: number
    totalCurrentBalance: Number
}