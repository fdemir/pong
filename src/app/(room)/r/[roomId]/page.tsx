"use client";

import "@livekit/components-styles";
import {
  LiveKitRoom,
  RoomAudioRenderer,
  ControlBar,
} from "@livekit/components-react";
import { LOCAL_STORAGE_TOKEN_KEY } from "@/app/constant";
import { useRouter } from "next/navigation";
import VideoConference from "../../components/VideoConference";

export default function RoomPage() {
  const router = useRouter();
  const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);

  return (
    <LiveKitRoom
      token={token}
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      data-lk-theme="default"
      style={{ height: "100dvh" }}
      onDisconnected={() => {
        router.push("/");
      }}
    >
      <VideoConference />
      <RoomAudioRenderer />
      <ControlBar />
    </LiveKitRoom>
  );
}
