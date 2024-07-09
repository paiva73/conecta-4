import { useRef, useEffect } from 'react'
import { Howl } from 'howler';

const useCreateSound = ({src}) => {
    const clickSound = useRef(null);

    useEffect(() => {
      clickSound.current = new Howl({
        autoplay: false,
        src: [src], 
        volume: 0.5, 
      });
    }, []); 
  
    const handleEffectClick = () => {
      clickSound.current.play(); 
    };

  return {
    handleEffectClick
  };
};

export default useCreateSound
