export interface NotificationType {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  type: "alert" | "message" | "update" | "reminder";
  icon: string;
  category?: "security" | "system" | "billing" | "general";
}

export const notifications: NotificationType[] = [
  {
    id: "1",
    title: "New login detected",
    description: "Successful login from Chrome on Windows",
    timestamp: "2024-03-20T14:30:00Z",
    read: false,
    type: "alert",
    icon: "🔒",
    category: "security"
  },
  {
    id: "2",
    title: "System Update Available",
    description: "Version 2.3.1 is ready to install",
    timestamp: "2024-03-20T12:45:00Z",
    read: true,
    type: "update",
    icon: "🔄",
    category: "system"
  },
  {
    id: "3",
    title: "New Message Received",
    description: "You have 1 unread message from Sarah",
    timestamp: "2024-03-20T10:15:00Z",
    read: false,
    type: "message",
    icon: "💬",
    category: "general"
  },
  {
    id: "4",
    title: "Payment Received",
    description: "Invoice #1234 has been paid ($1,234.00)",
    timestamp: "2024-03-19T16:20:00Z",
    read: true,
    type: "alert",
    icon: "💰",
    category: "billing"
  },
  {
    id: "5",
    title: "Low Disk Space",
    description: "System storage is at 85% capacity",
    timestamp: "2024-03-19T09:30:00Z",
    read: false,
    type: "alert",
    icon: "⚠️",
    category: "system"
  },
  {
    id: "6",
    title: "Team Meeting Reminder",
    description: "Scheduled meeting in 30 minutes",
    timestamp: "2024-03-18T14:00:00Z",
    read: true,
    type: "reminder",
    icon: "📅",
    category: "general"
  }
];