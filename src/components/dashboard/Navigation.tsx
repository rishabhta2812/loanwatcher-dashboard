
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  FileText, 
  CalendarClock, 
  Settings, 
  CreditCard,
  Menu,
  X,
  ChevronRight,
  UserCog
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/UserContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { USER_GROUPS } from "@/types/userGroups";

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  to: string;
  isActive: boolean;
  onClick?: () => void;
  requiredPermission?: string;
}

const NavItem = ({ icon: Icon, label, to, isActive, onClick, requiredPermission }: NavItemProps) => {
  const { hasPermission } = useUser();
  
  if (requiredPermission && !hasPermission(requiredPermission)) {
    return null;
  }
  
  return (
    <Link
      to={to}
      className={cn(
        "nav-item group transition-all duration-300 ease-out-expo",
        isActive && "active"
      )}
      onClick={onClick}
    >
      <Icon size={18} className={cn(
        "transition-all duration-300",
        isActive ? "text-primary" : "text-slate-500 group-hover:text-slate-700 dark:text-slate-400 dark:group-hover:text-slate-300"
      )} />
      <span>{label}</span>
      {isActive && (
        <ChevronRight size={16} className="ml-auto text-primary" />
      )}
    </Link>
  );
};

const Navigation = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(!isMobile);
  const { currentUser, switchUserGroup } = useUser();

  useEffect(() => {
    if (isMobile) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, [isMobile]);

  const toggleNav = () => setIsOpen(!isOpen);
  
  const nav = [
    { icon: LayoutDashboard, label: "Dashboard", to: "/", requiredPermission: "view_dashboard" },
    { icon: FileText, label: "Loan Details", to: "/loan-details", requiredPermission: "view_dashboard" },
    { icon: CreditCard, label: "Payments", to: "/payments", requiredPermission: "view_dashboard" },
    { icon: CalendarClock, label: "Schedule", to: "/schedule", requiredPermission: "view_dashboard" },
    { icon: Settings, label: "Settings", to: "/settings", requiredPermission: "view_dashboard" },
    { icon: UserCog, label: "User Management", to: "/users", requiredPermission: "manage_users" },
  ];

  return (
    <>
      {isMobile && (
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleNav}
          className="fixed top-4 left-4 z-50"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      )}
      
      <aside className={cn(
        "fixed top-0 left-0 z-40 h-full transition-all duration-300 ease-out-expo",
        isOpen ? "translate-x-0" : "-translate-x-full",
        isMobile ? "w-64" : "w-64",
        "bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-r border-slate-200 dark:border-slate-800",
      )}>
        <div className="flex flex-col h-full">
          <div className="p-6">
            <h2 className="text-xl font-semibold">CarLoanWatcher</h2>
            <p className="text-sm text-muted-foreground">Car loan monitoring system</p>
          </div>
          
          <nav className="flex-1 px-3 py-4 space-y-1.5">
            {nav.map((item) => (
              <NavItem
                key={item.to}
                icon={item.icon}
                label={item.label}
                to={item.to}
                isActive={location.pathname === item.to}
                onClick={isMobile ? toggleNav : undefined}
                requiredPermission={item.requiredPermission}
              />
            ))}
          </nav>
          
          <div className="p-4 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between gap-3 p-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-medium text-primary">
                    {currentUser?.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium">{currentUser?.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{currentUser?.group.name}</p>
                </div>
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <UserCog size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Switch User Role</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {USER_GROUPS.map((group) => (
                    <DropdownMenuItem 
                      key={group.id}
                      onClick={() => switchUserGroup(group.id)}
                      className={cn(
                        "cursor-pointer",
                        currentUser?.group.id === group.id && "bg-primary/10"
                      )}
                    >
                      {group.name}
                      {currentUser?.group.id === group.id && (
                        <ChevronRight className="ml-auto h-4 w-4" />
                      )}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </aside>
      
      <div className={cn(
        "transition-all duration-300 ease-out-expo", 
        isOpen ? (isMobile ? "ml-0" : "ml-64") : "ml-0"
      )}>
      </div>
    </>
  );
};

export default Navigation;
