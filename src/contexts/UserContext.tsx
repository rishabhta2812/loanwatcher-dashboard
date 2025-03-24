
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserGroup, USER_GROUPS } from '@/types/userGroups';

interface UserContextType {
  currentUser: {
    id: string;
    name: string;
    email: string;
    group: UserGroup;
  } | null;
  setCurrentUser: (user: UserContextType['currentUser']) => void;
  hasPermission: (permission: string) => boolean;
  canTriggerNotifications: boolean;
  canApproveLoans: boolean;
  canModifyLoanTerms: boolean;
  canViewCustomerData: boolean;
  canContactCustomers: boolean;
  switchUserGroup: (groupId: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<UserContextType['currentUser']>({
    id: '1',
    name: 'Alex Kim',
    email: 'alex.kim@example.com',
    group: USER_GROUPS[0], // Default to admin
  });

  const hasPermission = (permission: string): boolean => {
    if (!currentUser) return false;
    return currentUser.group.permissions.includes(permission);
  };

  const switchUserGroup = (groupId: string) => {
    if (!currentUser) return;
    
    const newGroup = USER_GROUPS.find(group => group.id === groupId);
    if (newGroup) {
      setCurrentUser({
        ...currentUser,
        group: newGroup
      });
    }
  };

  return (
    <UserContext.Provider 
      value={{
        currentUser,
        setCurrentUser,
        hasPermission,
        canTriggerNotifications: currentUser?.group.canTriggerNotifications || false,
        canApproveLoans: currentUser?.group.canApproveLoans || false,
        canModifyLoanTerms: currentUser?.group.canModifyLoanTerms || false,
        canViewCustomerData: currentUser?.group.canViewCustomerData || false,
        canContactCustomers: currentUser?.group.canContactCustomers || false,
        switchUserGroup
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
