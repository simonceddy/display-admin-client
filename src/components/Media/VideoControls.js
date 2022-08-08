import {
  BiPlayCircle as PlayIcon,
  BiPauseCircle as PauseIcon,
  BiStopCircle as StopIcon,
  BiReset as ReplayIcon,
} from 'react-icons/bi';

function IconWrapper({ Icon, onClick, size = 40 }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="my-1 mx-2 hover:text-cyan-800 active:text-yellow-200 p-1 bg-purple-200-op-30 active:bg-cyan-400-op-75 rounded-md"
    >
      <Icon size={size} />
    </button>
  );
}

function VideoControls({
  isPlaying = false,
  onPlay,
  onPause,
  onStop,
  iconSize,
  isFinished = false,
  volume = 0.75,
  setVolume,
}) {
  return (
    <div className="flex flex-row justify-around items-center p-1">
      {isPlaying ? (
        <IconWrapper Icon={PauseIcon} onClick={onPause} size={iconSize} />
      ) : (
        <IconWrapper Icon={PlayIcon} onClick={onPlay} size={iconSize} />
      )}
      {isFinished ? (
        <IconWrapper Icon={ReplayIcon} onClick={onPlay} size={iconSize} />
      ) : (
        <IconWrapper Icon={StopIcon} onClick={onStop} size={iconSize} />
      )}
      <label htmlFor="volume-slider" className="bg-purple-200-op-30 mx-2 my-1 p-1 flex flex-col justify-start items-start h-full">
        <span className="font-bold">
          Volume:
        </span>
        <input
          id="volume-slider"
          name="volume-slider"
          className=""
          type="range"
          value={volume}
          step={0.05}
          min={0}
          max={1}
          onChange={(e) => {
            if (setVolume) setVolume(e.target.value);
          }}
        />
      </label>
    </div>
  );
}

export default VideoControls;
