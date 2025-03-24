
export type UserRole = 'admin' | 'loanOfficer' | 'agent' | 'customer' | 'dealer';

export interface UserPermission {
  id: string;
  name: string;
  description: string;
}

export interface UserGroup {
  id: string;
  name: string;
  description: string;
  role: UserRole;
  permissions: string[];
  canTriggerNotifications: boolean;
  canApproveLoans: boolean;
  canModifyLoanTerms: boolean;
  canViewCustomerData: boolean;
  canContactCustomers: boolean;
}

export const USER_PERMISSIONS: Record<string, UserPermission> = {
  VIEW_DASHBOARD: {
    id: 'view_dashboard',
    name: 'View Dashboard',
    description: 'Can view the main dashboard'
  },
  MANAGE_LOANS: {
    id: 'manage_loans',
    name: 'Manage Loans',
    description: 'Can create, update, and delete loans'
  },
  APPROVE_LOANS: {
    id: 'approve_loans',
    name: 'Approve Loans',
    description: 'Can approve or reject loan applications'
  },
  VIEW_CUSTOMER_DATA: {
    id: 'view_customer_data',
    name: 'View Customer Data',
    description: 'Can view detailed customer information'
  },
  CONTACT_CUSTOMERS: {
    id: 'contact_customers',
    name: 'Contact Customers',
    description: 'Can send notifications and contact customers'
  },
  MODIFY_LOAN_TERMS: {
    id: 'modify_loan_terms',
    name: 'Modify Loan Terms',
    description: 'Can modify interest rates, payment schedules, etc.'
  },
  VIEW_REPORTS: {
    id: 'view_reports',
    name: 'View Reports',
    description: 'Can view financial reports and analytics'
  },
  MANAGE_USERS: {
    id: 'manage_users',
    name: 'Manage Users',
    description: 'Can create, update, and delete user accounts'
  }
};

export const USER_GROUPS: UserGroup[] = [
  {
    id: 'admin',
    name: 'Administrator',
    description: 'Full access to all system features',
    role: 'admin',
    permissions: Object.keys(USER_PERMISSIONS),
    canTriggerNotifications: true,
    canApproveLoans: true,
    canModifyLoanTerms: true,
    canViewCustomerData: true,
    canContactCustomers: true
  },
  {
    id: 'loan_officer',
    name: 'Loan Officer',
    description: 'Manages loan applications and approvals',
    role: 'loanOfficer',
    permissions: [
      'view_dashboard',
      'manage_loans',
      'approve_loans',
      'view_customer_data',
      'contact_customers',
      'modify_loan_terms',
      'view_reports'
    ],
    canTriggerNotifications: true,
    canApproveLoans: true,
    canModifyLoanTerms: true,
    canViewCustomerData: true,
    canContactCustomers: true
  },
  {
    id: 'agent',
    name: 'Loan Agent',
    description: 'Handles customer inquiries and loan processing',
    role: 'agent',
    permissions: [
      'view_dashboard',
      'manage_loans',
      'view_customer_data',
      'contact_customers',
      'view_reports'
    ],
    canTriggerNotifications: true,
    canApproveLoans: false,
    canModifyLoanTerms: false,
    canViewCustomerData: true,
    canContactCustomers: true
  },
  {
    id: 'customer',
    name: 'Customer',
    description: 'Car loan borrower',
    role: 'customer',
    permissions: [
      'view_dashboard'
    ],
    canTriggerNotifications: false,
    canApproveLoans: false,
    canModifyLoanTerms: false,
    canViewCustomerData: false,
    canContactCustomers: false
  },
  {
    id: 'dealer',
    name: 'Car Dealer',
    description: 'Partner car dealership',
    role: 'dealer',
    permissions: [
      'view_dashboard',
      'manage_loans',
      'view_customer_data'
    ],
    canTriggerNotifications: true,
    canApproveLoans: false,
    canModifyLoanTerms: false,
    canViewCustomerData: true,
    canContactCustomers: true
  }
];
