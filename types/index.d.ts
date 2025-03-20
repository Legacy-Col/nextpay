import { Stringifiable } from "query-string";


declare interface HeaderBoxProps {
    type ?: "title" | "greeting";
    title: string;
    subText: string;
    user ?: string;
}

declare interface BalanceBoxProps {
    accounts: Array;
    totalBanks: number;
    totalCurrentBalance: number;
}

declare interface DoughnutChartProps {
    accounts: Array;
}

declare interface SiderBarProps {
    user: User;
}

declare type User = {
    $id: string;
    email: string; 
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    postaCode: string;
    dateOfBirth: string;
}

declare interface MobileMenuProps  {
    user: User;
}

declare interface RightSideBarProps {
    banks: Array
    transactions: Array
    user: User
}

declare interface CreditCardProps {
    account: Array
    userName: string
    showBalance: boolean
}