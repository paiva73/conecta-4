import { useRef, useEffect, useContext } from "react";
import { Howl } from "howler";
import Context from "../context/Context";

const useCreateSound = ({ src }) => {
  const { footerState } = useContext(Context);
  const clickSound = useRef(null);

  useEffect(() => {
    clickSound.current = new Howl({
      autoplay: false,
      src: [src],
      volume: footerState.volumeEffects,
    });
  }, [footerState.volumeEffects]);

  const handleEffectClick = () => {
    clickSound.current.play();
  };

  return {
    handleEffectClick,
  };
};

export default useCreateSound;
