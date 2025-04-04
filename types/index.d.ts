import { Stringifiable } from "query-string";
import { string } from "zod";


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
    name: string;
    city: string;
    state: string;
    postaCode: string;
    dateOfBirth: string;
    avatar?: string;
}

declare interface MobileMenuProps  {
    user: User;
}

declare interface RightSideBarProps {
    banks: Array
    transactions: Array
    user: UserSummary
}

declare interface CreditCardProps {
    account: Array
    userName: string
    showBalance: boolean
}

declare type SignUpParams = {
    $id?: string;
    firstName?: string;
    lastName?: string;
    address?: string;
    city?: string;
    state?: string;
    postaCode?: string;
    dateOfBirth?: string;
    email: string; 
    password: string;
}

declare interface SignInProps {
    email: string
    password: string
}

declare type AuthContextType = {
    user: User
    signup: (email: string, password: string) => Promise<void>;
}

