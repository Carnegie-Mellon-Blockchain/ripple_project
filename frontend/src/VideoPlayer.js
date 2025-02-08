// src/VideoPlayer.js
import React from 'react';
import YouTube from 'react-youtube';

const VideoPlayer = () => {
    const videoId = 'OyCVgveTcX4';
    const startTime = 5689;

	const opts = {
	height: '390',
	width: '640',
	playerVars: {
	  autoplay: 0,
	  start: startTime,
	},
	};

	return <YouTube videoId={videoId} options={opts} id="video"/>;
};

export default VideoPlayer;
