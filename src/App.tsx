import RoomItem, { RoomInfo } from "@/components/RoomItem";
import { AnimatedList } from "@/components/ui/animated-list";
import WaitingRoom from "@/components/WaitingRoom";
import React, { useCallback, useEffect, useState } from "react";
import io from "socket.io-client";
import "./index.css";

const SOCKET_SERVER = "https://available-imojean-kahel-82da46e8.koyeb.app";

const App: React.FC = () => {
  const [waitingRoom, setWaitingRoom] = useState<RoomInfo | null>(null);
  const [callingRooms, setCallingRooms] = useState<RoomInfo[]>([]);
  const [socket] = useState(io(SOCKET_SERVER));

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
      socket.emit("admin");
    });

    socket.on("roomUpdate", (rooms: RoomInfo[]) => {
      const waiting = rooms.find((room) => room.room === "waiting");
      const calling = rooms.filter((room) => room.room !== "waiting");

      setWaitingRoom(waiting || null);
      setCallingRooms(calling);
    });

    return () => {
      socket.off("connect");
      socket.off("roomUpdate");
    };
  }, [socket]);

  const handleSendMessage = useCallback(
    (roomName: string, message: string) => {
      if (roomName && message) {
        socket.emit("adminMessage", { roomName, message });
      }
    },
    [socket]
  );

  return (
    <div className="w-screen min-h-screen bg-background">
      <div className="container mx-auto sm:px-6 lg:px-8 my-12">
        <h1 className="text-4xl font-bold mb-6 text-center">관리자 페이지</h1>

        <WaitingRoom waitingRoom={waitingRoom} />

        <div className="my-12">
          <h2 className="text-2xl font-semibold mb-4">
            통화중인 방 ({callingRooms.length})
          </h2>
          <AnimatedList>
            {callingRooms.map((item) => (
              <RoomItem
                key={item.room}
                roomInfo={item}
                onSendMessage={handleSendMessage}
              />
            ))}
          </AnimatedList>
        </div>
      </div>
    </div>
  );
};

export default App;
