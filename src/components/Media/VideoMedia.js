import useVideoMedia from '../../hooks/useVideoMedia';
import VideoControls from './VideoControls';

function VideoMedia({ src }) {
  const {
    isPlaying, play, pause, ref, stop, isFinished, volume, setVolume
  } = useVideoMedia();
  return (
    <>
      <video
        onClick={isPlaying ? pause : play}
        ref={ref}
        disablePictureInPicture
        controls={false}
        playsInline
        autoPlay
        onPlay={play}
        onPause={pause}
        style={{
          height: '740px',
          width: 'auto'
        }}
        src={src}
      >
        <track kind="captions" />
      </video>
      <VideoControls
        isFinished={isFinished}
        iconSize={52}
        isPlaying={isPlaying}
        onPlay={play}
        onPause={pause}
        onStop={stop}
        volume={volume}
        setVolume={setVolume}
      />
    </>
  );
}

export default VideoMedia;
