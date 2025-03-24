
export interface UserGroup {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  canTriggerNotifications: boolean;
  canApproveLoans: boolean;
  canModifyLoanTerms: boolean;
  canViewCustomerData: boolean;
  canContactCustomers: boolean;
  role?: string; // Add role property to support current code usage
}

export const USER_GROUPS: UserGroup[] = [
  {
    id: "admin",
    name: "Administrator",
    description: "Full system access with all permissions",
    permissions: [
      "view_dashboard",
      "manage_users",
      "create_triggers",
      "view_customers",
      "approve_loans",
      "modify_loan_terms",
      "manage_settings",
      "delete_data",
      "export_data",
      "view_reports"
    ],
    canTriggerNotifications: true,
    canApproveLoans: true,
    canModifyLoanTerms: true,
    canViewCustomerData: true,
    canContactCustomers: true,
    role: "admin"
  },
  {
    id: "loan_officer",
    name: "Loan Officer",
    description: "Manages loan applications and modifications",
    permissions: [
      "view_dashboard",
      "view_customers",
      "approve_loans",
      "modify_loan_terms",
      "create_triggers",
      "view_reports"
    ],
    canTriggerNotifications: true,
    canApproveLoans: true,
    canModifyLoanTerms: true,
    canViewCustomerData: true,
    canContactCustomers: true,
    role: "loanOfficer"
  },
  {
    id: "agent",
    name: "Collection Agent",
    description: "Handles customer outreach and collections",
    permissions: [
      "view_dashboard",
      "view_customers",
      "view_reports"
    ],
    canTriggerNotifications: false,
    canApproveLoans: false,
    canModifyLoanTerms: false,
    canViewCustomerData: true,
    canContactCustomers: true,
    role: "agent"
  },
  {
    id: "customer",
    name: "Customer",
    description: "Car loan borrower with limited access",
    permissions: [
      "view_dashboard"
    ],
    canTriggerNotifications: false,
    canApproveLoans: false,
    canModifyLoanTerms: false,
    canViewCustomerData: false,
    canContactCustomers: false,
    role: "customer"
  },
  {
    id: "dealer",
    name: "Car Dealer",
    description: "Partner dealerships with customer visibility",
    permissions: [
      "view_dashboard",
      "view_customers"
    ],
    canTriggerNotifications: false,
    canApproveLoans: false,
    canModifyLoanTerms: false,
    canViewCustomerData: true,
    canContactCustomers: false,
    role: "dealer"
  }
];
