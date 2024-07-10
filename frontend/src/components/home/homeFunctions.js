import { useContext, useEffect } from "react";
import Context from "../../context/Context";
import useCreateSound from "../useCreateSound";

const homeFunctions = () => {
  const {
    // namePlayerOne,
    // namePlayerTwo,
    // selectedColorOne,
    // setSelectedColorOne,
    // selectedColorTwo,
    // setSelectedColorTwo,
    // errorColor,
    // setErrorColor,
    // setFormError,
    // setNameError,
    // setCurrentPlayer,
    homeState,
    setHomeState,
    gameScreenState,
    setGameScreenState,
  } = useContext(Context);

  const { handleEffectClick } = useCreateSound({src: './click.mp3'});

  // Función para manejar el color seleccionado uno y el error.
  const handleColorOne = (color) => {
    if (homeState.selectedColorTwo === color) {
      setHomeState((prevState) => ({
        ...prevState,
        selectedColorTwo: color,
        errorColor: '¡Este color ya fue elegido por el jugador dos!'
      }));  
      return;
    }
    setHomeState((prevState) => ({
      ...prevState,
      selectedColorOne: color,
      errorColor: ''
    }));  
  };
  // Función para manejar el color seleccionado dos y el error.
  const handleColorTwo = (color) => {
    if (homeState.selectedColorOne === color) {
      setHomeState((prevState) => ({
        ...prevState,
        selectedColorTwo: color,
        errorColor: '¡Este color ya fue elegido por el jugador uno!'
      }));  
      return;
    }
    setHomeState((prevState) => ({
      ...prevState,
      selectedColorTwo: color,
      errorColor: ''
    }));  
  };
  // Ver que todos los campos estén completados y que los nombres sean distintos.
  const isFormValid = 
    !!(homeState.selectedColorOne && homeState.selectedColorTwo && homeState.namePlayerOne && homeState.namePlayerTwo);

  const isNameValid =
    !homeState.namePlayerOne || !homeState.namePlayerTwo || homeState.namePlayerOne !== homeState.namePlayerTwo;
  // Manejar los errores de nombres y campos.
  const handlePlayClick = (e) => {
    handleEffectClick();
    if (homeState.errorColor || !isNameValid) {
      e.preventDefault();
      return null;
    }
    if (!isFormValid) {
      e.preventDefault();
      setHomeState((prevState) => ({
        ...prevState,
        errorColor: '¡Debes completar todos los campos!'
      }));  
      return null;
    } else {
      try {
        sessionStorage.setItem("namePlayerOne", homeState.namePlayerOne);
        sessionStorage.setItem("namePlayerTwo", homeState.namePlayerTwo);
        sessionStorage.setItem("selectedColorOne", homeState.selectedColorOne);
        sessionStorage.setItem("selectedColorTwo", homeState.selectedColorTwo);
      } catch (error) {
        console.log(error);
      }
      setHomeState((prevState) => ({
        ...prevState,
        formError: ''
      }));
      setGameScreenState((prevState) => ({
        ...prevState,
        currenPlayer: homeState.namePlayerOne
      }));
    }
  };
  // useEffect para vaciar el error de campos dinamicamente
  useEffect(() => {
    if (isFormValid) {
      setHomeState((prevState) => ({
        ...prevState,
        formError: ''
      }));
    }
  }, [
    homeState.selectedColorOne,
    homeState.selectedColorTwo,
    homeState.namePlayerOne,
    homeState.namePlayerTwo,
    homeState.errorColor,
  ]);
  // useEffect mostrar el error de nombres dinamicamente
  useEffect(() => {
    if (homeState.namePlayerOne && homeState.namePlayerTwo && homeState.namePlayerOne === homeState.namePlayerTwo) {
      setHomeState((prevState) => ({
        ...prevState,
        nameError: '¡Los nombres deben ser distintos!'
      }));
    } else {
      setHomeState((prevState) => ({
        ...prevState,
        nameError: ''
      }))
    }
  }, [homeState.namePlayerOne, homeState.namePlayerTwo]);

  return {
    handleColorOne,
    handleColorTwo,
    handlePlayClick,
    isFormValid,
    isNameValid
  };
};

export default homeFunctions;
