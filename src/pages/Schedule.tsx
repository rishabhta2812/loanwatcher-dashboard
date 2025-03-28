
import { useState } from "react";
import { 
  Calendar, 
  Clock, 
  Users, 
  CreditCard, 
  BellRing, 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight,
  Plus
} from "lucide-react";
import { format, addDays, startOfWeek, startOfDay, addWeeks, subWeeks } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Navigation from "@/components/dashboard/Navigation";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

// Mock schedule data
const scheduleEvents = [
  {
    id: "evt-001",
    title: "Customer Check-in Call",
    description: "30-minute check-in with Car Loan Festival group",
    date: format(addDays(new Date(), 1), "yyyy-MM-dd"),
    time: "10:00 AM",
    type: "call",
    customerGroup: "Car Loan Festival",
    customerCount: 45
  },
  {
    id: "evt-002",
    title: "Payment Alert Notifications",
    description: "Send payment reminders to high-risk customers",
    date: format(addDays(new Date(), 2), "yyyy-MM-dd"),
    time: "09:00 AM",
    type: "alert",
    customerGroup: "61–90 DPD",
    customerCount: 18
  },
  {
    id: "evt-003",
    title: "Process Monthly Payments",
    description: "Process scheduled auto-payments for Car Loan Co-lending",
    date: format(addDays(new Date(), 3), "yyyy-MM-dd"),
    time: "11:30 AM",
    type: "payment",
    customerGroup: "Car Loan Co-lending",
    customerCount: 32
  },
  {
    id: "evt-004",
    title: "Weekly Portfolio Review",
    description: "Review loan performance metrics for the past week",
    date: format(addDays(new Date(), 3), "yyyy-MM-dd"),
    time: "02:00 PM",
    type: "review",
    customerGroup: "All Groups",
    customerCount: 125
  },
  {
    id: "evt-005",
    title: "Early Warning System Audit",
    description: "Verify EWS triggers and alert configurations",
    date: format(addDays(new Date(), 4), "yyyy-MM-dd"),
    time: "03:30 PM",
    type: "audit",
    customerGroup: "Car Loan - High Ticket",
    customerCount: 27
  },
  {
    id: "evt-006",
    title: "Late Payment Follow-up Calls",
    description: "Contact borrowers with recent late payments",
    date: format(addDays(new Date(), 5), "yyyy-MM-dd"),
    time: "10:00 AM",
    type: "call",
    customerGroup: "31–60 DPD",
    customerCount: 12
  },
  {
    id: "evt-007",
    title: "Data Sync: Credit Bureau",
    description: "Sync latest credit bureau data for all customers",
    date: format(addDays(new Date(), 6), "yyyy-MM-dd"),
    time: "08:00 AM",
    type: "data",
    customerGroup: "All Groups",
    customerCount: 125
  }
];

const Schedule = () => {
  const isMobile = useIsMobile();
  const [date, setDate] = useState<Date>(new Date());
  const [weekStart, setWeekStart] = useState<Date>(startOfWeek(new Date(), { weekStartsOn: 1 }));
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [selectedTab, setSelectedTab] = useState("week");
  
  const getTypeColor = (type: string) => {
    switch (type) {
      case "call": return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "alert": return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400";
      case "payment": return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "review": return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
      case "audit": return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400";
      case "data": return "bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-400";
      default: return "bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-400";
    }
  };
  
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "call": return <Users className="h-4 w-4" />;
      case "alert": return <BellRing className="h-4 w-4" />;
      case "payment": return <CreditCard className="h-4 w-4" />;
      case "review": return <Calendar className="h-4 w-4" />;
      case "audit": return <Clock className="h-4 w-4" />;
      case "data": return <CalendarIcon className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };
  
  const nextWeek = () => {
    setWeekStart(addWeeks(weekStart, 1));
  };
  
  const prevWeek = () => {
    setWeekStart(subWeeks(weekStart, 1));
  };

  const handleAddEvent = () => {
    toast.success("New event scheduled successfully!");
    setShowAddEvent(false);
  };
  
  const getWeekViewDays = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      days.push(addDays(weekStart, i));
    }
    return days;
  };
  
  const getEventsForDate = (day: Date) => {
    const formattedDate = format(day, "yyyy-MM-dd");
    return scheduleEvents.filter(event => event.date === formattedDate);
  };
  
  const getDaysWithEvents = () => {
    const uniqueDays = new Set(scheduleEvents.map(event => event.date));
    return Array.from(uniqueDays).map(dateStr => new Date(dateStr));
  };
  
  const weekViewDays = getWeekViewDays();
  
  return (
    <div className="min-h-screen flex w-full">
      <Navigation />
      
      <main className={`flex-1 transition-all duration-300 ease-out-expo ${isMobile ? "ml-0" : "ml-64"}`}>
        <div className="container px-4 py-6 md:px-6 md:py-8">
          <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 className="text-2xl font-semibold">Schedule</h2>
              
              <Dialog open={showAddEvent} onOpenChange={setShowAddEvent}>
                <DialogTrigger asChild>
                  <Button className="h-9">
                    <Plus size={16} className="mr-2" />
                    New Event
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Schedule New Event</DialogTitle>
                    <DialogDescription>
                      Create a new scheduled event for your loan monitoring activities.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="event-title">Event Title</Label>
                        <Input id="event-title" placeholder="Enter event title" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="event-description">Description</Label>
                        <Input id="event-description" placeholder="Enter event description" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="event-date">Date</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className="w-full justify-start text-left font-normal"
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {format(date, "PPP")}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <CalendarComponent
                                mode="single"
                                selected={date}
                                onSelect={(date) => date && setDate(date)}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="event-time">Time</Label>
                          <Select defaultValue="10:00">
                            <SelectTrigger>
                              <SelectValue placeholder="Select time" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="09:00">09:00 AM</SelectItem>
                              <SelectItem value="10:00">10:00 AM</SelectItem>
                              <SelectItem value="11:00">11:00 AM</SelectItem>
                              <SelectItem value="12:00">12:00 PM</SelectItem>
                              <SelectItem value="13:00">01:00 PM</SelectItem>
                              <SelectItem value="14:00">02:00 PM</SelectItem>
                              <SelectItem value="15:00">03:00 PM</SelectItem>
                              <SelectItem value="16:00">04:00 PM</SelectItem>
                              <SelectItem value="17:00">05:00 PM</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="event-type">Event Type</Label>
                          <Select defaultValue="call">
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="call">Customer Call</SelectItem>
                              <SelectItem value="alert">Alert Notification</SelectItem>
                              <SelectItem value="payment">Payment Processing</SelectItem>
                              <SelectItem value="review">Portfolio Review</SelectItem>
                              <SelectItem value="audit">System Audit</SelectItem>
                              <SelectItem value="data">Data Sync</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="customer-group">Customer Group</Label>
                          <Select defaultValue="all">
                            <SelectTrigger>
                              <SelectValue placeholder="Select group" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Groups</SelectItem>
                              <SelectItem value="0-30">0–30 DPD</SelectItem>
                              <SelectItem value="31-60">31–60 DPD</SelectItem>
                              <SelectItem value="61-90">61–90 DPD</SelectItem>
                              <SelectItem value="90-plus">Net NPA</SelectItem>
                              <SelectItem value="car-festival">Car Loan Festival</SelectItem>
                              <SelectItem value="car-colending">Car Loan Co-lending</SelectItem>
                              <SelectItem value="car-highticket">Car Loan - High Ticket</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setShowAddEvent(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddEvent}>Schedule Event</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            
            <Card>
              <CardHeader className="pb-3">
                <Tabs defaultValue="week" value={selectedTab} onValueChange={setSelectedTab} className="w-full">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-4 items-center">
                      {selectedTab === "month" ? (
                        <h3 className="font-medium text-lg">{format(date, "MMMM yyyy")}</h3>
                      ) : (
                        <h3 className="font-medium text-lg">
                          {format(weekStart, "d MMM")} - {format(addDays(weekStart, 6), "d MMM yyyy")}
                        </h3>
                      )}
                      <div className="flex gap-1">
                        <Button variant="outline" size="icon" className="h-8 w-8" onClick={prevWeek}>
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="h-8 w-8" onClick={nextWeek}>
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="h-8 ml-2"
                          onClick={() => {
                            setDate(new Date());
                            setWeekStart(startOfWeek(new Date(), { weekStartsOn: 1 }));
                          }}
                        >
                          Today
                        </Button>
                      </div>
                    </div>
                    <TabsList className="grid w-[200px] grid-cols-2">
                      <TabsTrigger value="week">Week</TabsTrigger>
                      <TabsTrigger value="month">Month</TabsTrigger>
                    </TabsList>
                  </div>
                </Tabs>
              </CardHeader>
              <CardContent>
                <TabsContent value="week" className="mt-0">
                  <div className="grid grid-cols-7 gap-4">
                    {weekViewDays.map((day, index) => (
                      <div 
                        key={index} 
                        className={cn(
                          "border rounded-md p-2 min-h-[150px]",
                          format(day, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd") && "bg-primary/5 border-primary/20"
                        )}
                      >
                        <div className="flex flex-col items-center py-1 mb-2 border-b">
                          <span className="text-xs text-muted-foreground">{format(day, "EEE")}</span>
                          <span className={cn(
                            "text-sm font-semibold",
                            format(day, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd") && "text-primary"
                          )}>
                            {format(day, "d")}
                          </span>
                        </div>
                        <div className="space-y-2">
                          {getEventsForDate(day).map(event => (
                            <div 
                              key={event.id} 
                              className="p-2 rounded-md text-xs border cursor-pointer hover:bg-muted transition-colors"
                              onClick={() => toast.info(`Clicked: ${event.title}`)}
                            >
                              <div className="flex items-center gap-1 mb-1">
                                <Badge variant="outline" className={cn("text-[10px] h-4 px-1", getTypeColor(event.type))}>
                                  {getTypeIcon(event.type)}
                                </Badge>
                                <span className="font-medium truncate">{event.time}</span>
                              </div>
                              <div className="font-medium line-clamp-2">{event.title}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="month" className="mt-0">
                  <div>
                    <CalendarComponent
                      mode="single"
                      selected={date}
                      onSelect={(newDate) => newDate && setDate(newDate)}
                      className="rounded-md border"
                      components={{
                        Day: ({ day, ...props }) => {
                          const hasEvents = getDaysWithEvents().some(
                            eventDate => format(eventDate, "yyyy-MM-dd") === format(day, "yyyy-MM-dd")
                          );
                          return (
                            <div {...props}>
                              <div className="relative">
                                <div>{format(day, "d")}</div>
                                {hasEvents && (
                                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-primary"></div>
                                )}
                              </div>
                            </div>
                          );
                        },
                      }}
                    />
                    <div className="mt-6">
                      <h3 className="font-medium mb-3">Events for {format(date, "MMMM d, yyyy")}</h3>
                      {getEventsForDate(startOfDay(date)).length > 0 ? (
                        <div className="space-y-3">
                          {getEventsForDate(startOfDay(date)).map(event => (
                            <Card key={event.id} className="overflow-hidden">
                              <div className="flex">
                                <div className={cn("w-2", getTypeColor(event.type))}></div>
                                <CardContent className="p-4">
                                  <div className="flex items-start justify-between">
                                    <div>
                                      <h4 className="font-medium">{event.title}</h4>
                                      <p className="text-sm text-muted-foreground">{event.description}</p>
                                      <div className="flex items-center gap-3 mt-2">
                                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                          <Clock className="h-3 w-3" />
                                          <span>{event.time}</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                          <Users className="h-3 w-3" />
                                          <span>{event.customerGroup} ({event.customerCount})</span>
                                        </div>
                                      </div>
                                    </div>
                                    <Badge className={cn(getTypeColor(event.type))}>
                                      {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                                    </Badge>
                                  </div>
                                </CardContent>
                              </div>
                            </Card>
                          ))}
                        </div>
                      ) : (
                        <div className="py-8 text-center text-muted-foreground">
                          <CalendarIcon className="mx-auto h-12 w-12 opacity-20 mb-2" />
                          <p>No events scheduled for this date</p>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="mt-2"
                            onClick={() => setShowAddEvent(true)}
                          >
                            <Plus className="mr-1 h-3 w-3" /> Add Event
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>Next 7 days of your schedule</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {scheduleEvents
                    .filter(event => {
                      const eventDate = new Date(event.date);
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      const sevenDaysLater = new Date(today);
                      sevenDaysLater.setDate(today.getDate() + 7);
                      return eventDate >= today && eventDate <= sevenDaysLater;
                    })
                    .sort((a, b) => {
                      const dateA = new Date(`${a.date} ${a.time}`);
                      const dateB = new Date(`${b.date} ${b.time}`);
                      return dateA.getTime() - dateB.getTime();
                    })
                    .map((event, index, arr) => (
                      <div key={event.id}>
                        <div className="flex items-start gap-4">
                          <div className={cn(
                            "w-12 h-12 rounded-full flex items-center justify-center shrink-0",
                            getTypeColor(event.type)
                          )}>
                            {getTypeIcon(event.type)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium">{event.title}</h4>
                              <Badge variant="outline">
                                {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                            <div className="flex items-center gap-4 mt-2">
                              <div className="flex items-center gap-1 text-sm">
                                <CalendarIcon className="h-3.5 w-3.5 text-muted-foreground" />
                                <span>{format(new Date(event.date), "EEEE, MMMM d")}</span>
                              </div>
                              <div className="flex items-center gap-1 text-sm">
                                <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                                <span>{event.time}</span>
                              </div>
                              <div className="flex items-center gap-1 text-sm">
                                <Users className="h-3.5 w-3.5 text-muted-foreground" />
                                <span>{event.customerGroup}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        {index < arr.length - 1 && <Separator className="my-4" />}
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Schedule;
