import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bell, X, CheckCircle, AlertCircle, Info, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
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
        return <CheckCircle size={18} className="text-green-500" />;
      case "warning":
        return <AlertCircle size={18} className="text-amber-500" />;
      case "error":
        return <AlertCircle size={18} className="text-red-500" />;
      default:
        return <Info size={18} className="text-blue-500" />;
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

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="h-9 w-9 p-0 relative">
          <Bell size={18} />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-5 h-5 bg-destructive text-white text-xs rounded-full flex items-center justify-center font-bold">
              {unreadCount}
            </span>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md max-h-96">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle>Notifications</DialogTitle>
          {notifications.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearAll}
              className="text-xs"
            >
              Clear All
            </Button>
          )}
        </DialogHeader>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">Unread</TabsTrigger>
            <TabsTrigger value="read">Read</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-2 max-h-72 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="text-center py-8">
                <Bell size={32} className="mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">No notifications</p>
              </div>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`p-3 rounded-lg border flex items-start gap-3 cursor-pointer transition-colors ${
                    notif.read
                      ? "bg-white border-E9EDF4"
                      : "bg-blue-50 border-blue-200"
                  }`}
                  onClick={() => handleMarkAsRead(notif.id)}
                >
                  {getIcon(notif.type)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">
                      {notif.title}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {notif.message}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatTime(notif.timestamp)}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(notif.id);
                    }}
                  >
                    <X size={14} />
                  </Button>
                </div>
              ))
            )}
          </TabsContent>

          <TabsContent value="unread" className="space-y-2 max-h-72 overflow-y-auto">
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
                  <div
                    key={notif.id}
                    className="p-3 rounded-lg border bg-blue-50 border-blue-200 flex items-start gap-3 cursor-pointer"
                    onClick={() => handleMarkAsRead(notif.id)}
                  >
                    {getIcon(notif.type)}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">
                        {notif.title}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {notif.message}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatTime(notif.timestamp)}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(notif.id);
                      }}
                    >
                      <X size={14} />
                    </Button>
                  </div>
                ))
            )}
          </TabsContent>

          <TabsContent value="read" className="space-y-2 max-h-72 overflow-y-auto">
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
                  <div
                    key={notif.id}
                    className="p-3 rounded-lg border bg-white border-E9EDF4 flex items-start gap-3"
                  >
                    {getIcon(notif.type)}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">
                        {notif.title}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {notif.message}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatTime(notif.timestamp)}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={() => handleDelete(notif.id)}
                    >
                      <X size={14} />
                    </Button>
                  </div>
                ))
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
