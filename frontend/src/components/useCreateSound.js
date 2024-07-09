import { useRef, useEffect, useContext } from "react";
import { Howl } from "howler";
import Context from "../context/Context";

const useCreateSound = ({ src }) => {
  const { volumeEffects } = useContext(Context);
  const clickSound = useRef(null);

  useEffect(() => {
    clickSound.current = new Howl({
      autoplay: false,
      src: [src],
      volume: volumeEffects,
    });
  }, [volumeEffects]);

  const handleEffectClick = () => {
    clickSound.current.play();
  };

  return {
    handleEffectClick,
  };
};

export default useCreateSound;
