import { useSound } from "../SoundContext.jsx";

function SoundBtn() {
  const { soundEnabled, setSoundEnabled } = useSound();

  return (
    <button className="sound-btn" onClick={() => setSoundEnabled(!soundEnabled)}>
      <i className={`fa-solid ${soundEnabled ? "fa-volume-high" : "fa-volume-xmark"}`}></i>
    </button>
  );
}

export default SoundBtn;