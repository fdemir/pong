"use client";

import {
	GridLayout,
	ParticipantTile,
	useTracks,
} from "@livekit/components-react";
import { Track } from "livekit-client";

function VideoConference() {
	const tracks = useTracks(
		[
			{
				source: Track.Source.Camera,
				withPlaceholder: true,
			},
			{
				source: Track.Source.Microphone,
				withPlaceholder: false,
			},
			{
				source: Track.Source.ScreenShare,
				withPlaceholder: false,
			},
			{
				source: Track.Source.ScreenShareAudio,
				withPlaceholder: false,
			},
		],
		{ onlySubscribed: false },
	);

	return (
		<GridLayout
			tracks={tracks}
			style={{ height: "calc(100vh - var(--lk-control-bar-height))" }}
		>
			<ParticipantTile />
		</GridLayout>
	);
}

export default VideoConference;
