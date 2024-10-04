// src/app/types/Employee.ts
export interface Employee {
    _id?: string; // Ensure _id is included in the Employee interface
    FirstName: string;
    LastName: string;
    RoleId: string;
    Email: string;            // Moved email to top level
    PhoneNumber: string;      // Moved phone to top level
    Password: string;
    City: string;
    State: string;
    StreetAddress: string;    // Changed from address to StreetAddress for consistency
    Gender: string;
    Dob: Date;
}