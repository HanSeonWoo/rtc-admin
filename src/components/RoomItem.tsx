import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "../lib/utils";

export interface RoomInfo {
  room: string;
  numberOfClients: number;
  clients: string[];
}

interface Props {
  roomInfo: RoomInfo;
  onSendMessage: (roomName: string, message: string) => void;
}

export default function RoomItem({ roomInfo, onSendMessage }: Props) {
  const { clients, numberOfClients, room } = roomInfo;
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(room, message);
      setMessage("");
      setIsOpen(false);
    }
  };

  return (
    <>
      <Card
        onClick={() => setIsOpen(true)}
        className={cn(
          "relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4",
          "transition-all duration-200 ease-in-out hover:scale-[103%]"
        )}
      >
        <CardHeader className="border-b">
          <CardTitle className="text-xl">
            {room}
            <span className="text-sm text-gray-300 ml-4">
              ( 접속 인원: {numberOfClients} )
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {clients.map((name) => {
            return (
              <div key={name} className="flex justify-between gap-x-4 py-3">
                <dt className="text-gray-500">{name}</dt>
              </div>
            );
          })}
        </CardContent>
      </Card>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>메시지 전송</DialogTitle>
            <DialogDescription>
              {room} 방의 사용자에게 메시지를 전송합니다.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              id="message"
              placeholder="메시지를 입력하세요"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage();
                }
              }}
            />
          </div>
          <DialogFooter>
            <Button onClick={handleSendMessage}>전송</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
