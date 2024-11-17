"use client";
import Spinner from "@/components/global/spinner";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useNotification } from "@/hooks/notifications";
import { User } from "lucide-react";

const NotificationPage = () => {
  const { notifications, isFetched, status } = useNotification();
  if (status !== 200) {
    return (
      <div className="flex justify-center items-center h-20 w-full">
        No Notifications
      </div>
    );
  }
  return (
    <Spinner
      className="h-screen w-screen flex items-center justify-center"
      loading={!isFetched}
    >
      <div className="flex flex-col">
        {
            notifications.notification.map((n)=>(
                <div key={n.id}
                className="border-2 flex  gap-x-3 items-center rounded-lg p-3"
                >
            <Avatar>
              <AvatarFallback>
                <User/>
              </AvatarFallback>
            </Avatar>
            <p>{n.content}</p>
          </div>
          ))
        }
      </div>
    </Spinner>
  );
};

export default NotificationPage;
