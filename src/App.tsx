import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import "./index.css";

interface RoomInfo {
  room: string;
  numberOfClients: number;
  clients: string[];
}

const SOCKET_SERVER = "https://available-imojean-kahel-82da46e8.koyeb.app";

const App: React.FC = () => {
  const [rooms, setRooms] = useState<RoomInfo[]>([]);
  const [waitingClients, setWaitingClients] = useState<string[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");
  const [socket] = useState(io(SOCKET_SERVER));

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connectted");
      socket.emit("admin");
    });

    socket.on("roomUpdate", (data: RoomInfo[]) => {
      console.log("🚀 ~ socket.on ~ data:", data);
      setRooms(data);

      // 대기실 업데이트
      const waitingRoom = data.find((room) => room.room === "waiting");
      if (waitingRoom) {
        setWaitingClients(waitingRoom.clients);
      } else {
        setWaitingClients([]);
      }
    });

    return () => {
      socket.off("connect");
      socket.off("roomUpdate");
    };
  }, []);

  const handleSendMessage = () => {
    if (selectedRoom && message) {
      console.log("🚀 ~ handleSendMessage ~ selectedRoom:", selectedRoom);
      socket.emit("adminMessage", { roomName: selectedRoom, message });
      setMessage("");
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6 text-center">
        관리자 페이지 타이틀
      </h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">대기실 (waiting)</h2>
        {waitingClients.length > 0 ? (
          <ul className="list-disc list-inside">
            {waitingClients.map((client) => (
              <li key={client}>{client}</li>
            ))}
          </ul>
        ) : (
          <p>현재 대기 중인 유저가 없습니다.</p>
        )}
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">통화중인 방</h2>
        {rooms
          .filter((room) => room.room !== "waiting")
          .map((room) => (
            <div key={room.room} className="mb-4">
              <button
                onClick={() => setSelectedRoom(room.room)}
                className="text-blue-500 underline"
              >
                방 이름: {room.room} (접속 인원: {room.numberOfClients})
              </button>

              {selectedRoom === room.room && (
                <div className="mt-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="메시지를 입력하세요"
                    className="border p-2 mr-2"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="bg-blue-500 text-white px-4 py-2"
                  >
                    보내기
                  </button>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default App;
