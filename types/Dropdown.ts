// src/app/types/Employee.ts
export interface RoleName {
    _id?: string;
    roleName: string;
}
// Product Type
export interface ProductType {
    _id?: string;
    Name: string;
    SortOrder: number;
}

// Roster Type
export interface RosterType {
    _id?: string;
    Name: string;
    SortOrder: number;
}

// Season Type
export interface SeasonType {
    _id?: string;
    Name: string;
}




export interface SubscriptionType {
    _id?: string;
    Name: string;
    value: number;
}
export interface FrequencyType {
    _id?: string;
    Name: string;
    Value: number;
    DayBasis: number;
}