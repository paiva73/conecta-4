import React, { useContext } from "react";
import Context from "../../../context/Context";

const optionsFunctions = () => {
  const {
    musicIsActive,
    setMusicIsActive,
    effectsIsActive,
    setEffectsIsActive,
    setVolumeMusic,
    setVolumeEffects,
  } = useContext(Context);

  const handleMusicClick = () => {
    setMusicIsActive(!musicIsActive);
  };

  const handleEffectsClick = () => {
    setEffectsIsActive(!effectsIsActive);
  };

  const handleMusicVolumeChange = (e, newValue) => {
    setVolumeMusic(newValue);
  };

  const handleEffectsVolumeChange = (e, newValue) => {
    setVolumeEffects(newValue);
  };

  return {
    handleMusicClick,
    handleEffectsClick,
    handleMusicVolumeChange,
    handleEffectsVolumeChange,
  };
};

export default optionsFunctions;
