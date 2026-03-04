import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bell, X, CheckCircle, AlertCircle, Info } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Notification {
  id: string;
  type: "success" | "warning" | "info" | "error";
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "success",
      title: "Order Completed",
      message: "Order #12345 has been successfully completed",
      timestamp: new Date(Date.now() - 5 * 60000),
      read: false,
    },
    {
      id: "2",
      type: "warning",
      title: "Low Stock Alert",
      message: "Product SKU-001 is running low on stock",
      timestamp: new Date(Date.now() - 15 * 60000),
      read: false,
    },
    {
      id: "3",
      type: "info",
      title: "System Update",
      message: "System maintenance scheduled for tonight",
      timestamp: new Date(Date.now() - 1 * 3600000),
      read: true,
    },
    {
      id: "4",
      type: "error",
      title: "Payment Failed",
      message: "Payment processing failed for order #12346",
      timestamp: new Date(Date.now() - 2 * 3600000),
      read: true,
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleDelete = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle size={16} className="text-green-500 flex-shrink-0" />;
      case "warning":
        return <AlertCircle size={16} className="text-amber-500 flex-shrink-0" />;
      case "error":
        return <AlertCircle size={16} className="text-red-500 flex-shrink-0" />;
      default:
        return <Info size={16} className="text-blue-500 flex-shrink-0" />;
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const NotificationItem = ({ notif }: { notif: Notification }) => (
    <div
      className={`p-3 rounded-lg border flex items-start gap-3 cursor-pointer transition-colors ${
        notif.read
          ? "dark:bg-card bg-card border-E9EDF4 hover:bg-secondary/30"
          : "bg-blue-50 border-blue-200 hover:bg-blue-100"
      }`}
      onClick={() => handleMarkAsRead(notif.id)}
    >
      {getIcon(notif.type)}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground">{notif.title}</p>
        <p className="text-xs text-muted-foreground truncate">{notif.message}</p>
        <p className="text-xs text-muted-foreground mt-1">
          {formatTime(notif.timestamp)}
        </p>
      </div>
      <Button
        variant="ghost"
        size="sm"
        className="h-6 w-6 p-0 flex-shrink-0"
        onClick={(e) => {
          e.stopPropagation();
          handleDelete(notif.id);
        }}
      >
        <X size={14} />
      </Button>
    </div>
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-9 w-9 p-0 relative">
          <Bell size={18} />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-destructive text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center leading-none">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-96 p-0">
        <div className="flex flex-col max-h-96">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h3 className="font-semibold text-foreground">Notifications</h3>
            {notifications.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearAll}
                className="text-xs h-auto p-1"
              >
                Clear All
              </Button>
            )}
          </div>

          {/* Tabs */}
          {notifications.length > 0 ? (
            <Tabs defaultValue="all" className="w-full flex flex-col">
              <TabsList className="grid w-full grid-cols-3 rounded-none border-b border-border">
                <TabsTrigger value="all" className="rounded-none">
                  All
                </TabsTrigger>
                <TabsTrigger value="unread" className="rounded-none">
                  Unread ({unreadCount})
                </TabsTrigger>
                <TabsTrigger value="read" className="rounded-none">
                  Read
                </TabsTrigger>
              </TabsList>

              <div className="overflow-y-auto flex-1">
                <TabsContent value="all" className="space-y-2 p-4 m-0">
                  {notifications.map((notif) => (
                    <NotificationItem key={notif.id} notif={notif} />
                  ))}
                </TabsContent>

                <TabsContent value="unread" className="space-y-2 p-4 m-0">
                  {notifications.filter((n) => !n.read).length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-sm text-muted-foreground">
                        No unread notifications
                      </p>
                    </div>
                  ) : (
                    notifications
                      .filter((n) => !n.read)
                      .map((notif) => (
                        <NotificationItem key={notif.id} notif={notif} />
                      ))
                  )}
                </TabsContent>

                <TabsContent value="read" className="space-y-2 p-4 m-0">
                  {notifications.filter((n) => n.read).length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-sm text-muted-foreground">
                        No read notifications
                      </p>
                    </div>
                  ) : (
                    notifications
                      .filter((n) => n.read)
                      .map((notif) => (
                        <NotificationItem key={notif.id} notif={notif} />
                      ))
                  )}
                </TabsContent>
              </div>
            </Tabs>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 px-4">
              <Bell size={32} className="text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">No notifications</p>
            </div>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
