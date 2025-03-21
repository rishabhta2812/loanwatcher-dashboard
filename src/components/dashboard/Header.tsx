
import { useState, useEffect } from "react";
import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return (
    <header className={`sticky top-0 z-30 transition-all duration-300 ${
      scrolled 
        ? "py-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg shadow-sm" 
        : "py-5 bg-transparent"
    }`}>
      <div className="container flex items-center justify-between">
        {isMobile && <div className="w-8" />}
        
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
            Active
          </span>
        </div>
        
        <div className="flex items-center gap-3">
          {!isMobile && (
            <div className="relative mr-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
              <Input 
                placeholder="Search loans..." 
                className="pl-9 w-60 h-9 bg-slate-100 border-0 dark:bg-slate-800"
              />
            </div>
          )}
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell size={18} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="p-2">
                <h3 className="mb-1 text-sm font-medium">Notifications</h3>
                <p className="text-xs text-muted-foreground">You have 3 unread messages</p>
              </div>
              <DropdownMenuItem className="flex flex-col items-start py-2 cursor-pointer">
                <div className="text-sm font-medium">Payment Due Soon</div>
                <div className="text-xs text-muted-foreground">Home loan payment due in 3 days</div>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start py-2 cursor-pointer">
                <div className="text-sm font-medium">Rate Change Alert</div>
                <div className="text-xs text-muted-foreground">Interest rate change on car loan</div>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start py-2 cursor-pointer">
                <div className="text-sm font-medium">Account Update</div>
                <div className="text-xs text-muted-foreground">Your profile was updated successfully</div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
