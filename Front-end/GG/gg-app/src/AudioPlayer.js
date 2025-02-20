import React, { forwardRef } from 'react';

const AudioPlayer = forwardRef((props, ref) => {
  return (
    <audio ref={ref} src="path_to_your_audio_file.mp3" loop />
  );
});

export default AudioPlayer;