import { useContext } from "react";
import Context from "../../../context/Context";

const optionsFunctions = () => {
  // const {
  //   musicIsActive,
  //   setMusicIsActive,
  //   effectsIsActive,
  //   setEffectsIsActive,
  //   setVolumeMusic,
  //   setVolumeEffects,
  // } = useContext(Context);

  const { footerState, setFooterState } = useContext(Context);

  const handleMusicClick = () => {
    setFooterState((prevState) => ({
      ...prevState,
      musicIsActive: !footerState.musicIsActive
    }));
  };

  const handleEffectsClick = () => {
    setFooterState((prevState) => ({
      ...prevState,
      effectsIsActive: !footerState.effectsIsActive
    }));
  };

  const handleMusicVolumeChange = (e, newValue) => {
    setFooterState((prevState) => ({
      ...prevState,
      volumeMusic: newValue
    }));
  };

  const handleEffectsVolumeChange = (e, newValue) => {
    setFooterState((prevState) => ({
      ...prevState,
      volumeEffects: newValue
    }));
  };

  return {
    handleMusicClick,
    handleEffectsClick,
    handleMusicVolumeChange,
    handleEffectsVolumeChange,
  };
};

export default optionsFunctions;
