import React from "react";
import { RoomInfo } from "./RoomItem";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface Props {
  waitingRoom: RoomInfo | null;
}

export default function WaitingRoom({ waitingRoom }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">대기실</CardTitle>
        <CardDescription>
          접속 인원: {waitingRoom?.clients.length || 0}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {waitingRoom?.clients.map((user) => (
          <p key={user} className="py-1">
            {user}
          </p>
        ))}
      </CardContent>
    </Card>
  );
}
