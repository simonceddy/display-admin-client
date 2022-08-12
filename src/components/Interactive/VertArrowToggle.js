function VertArrowToggle({ toggled = false }) {
  return (
    <div className="text-lg pr-3">{toggled ? '△' : '▽'}</div>
  );
}

export default VertArrowToggle;
