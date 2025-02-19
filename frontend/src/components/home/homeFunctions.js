import { useContext, useEffect } from "react";
import Context from "../../context/Context";
import useCreateSound from "../useCreateSound";
import { useNavigate } from "react-router-dom";

const homeFunctions = () => {
  const { homeState, setHomeState, setGameScreenState } = useContext(Context);

  const navigate = useNavigate();

  const { handleEffectClick } = useCreateSound({ src: "./click.mp3" });

  // Función para manejar el color seleccionado uno y el error.
  const handleColorOne = (color) => {
    if (homeState.selectedColorTwo === color) {
      setHomeState((prevState) => ({
        ...prevState,
        selectedColorOne: color,
        errorColor: "¡Este color ya fue elegido por el jugador dos!",
      }));
      return;
    }
    setHomeState((prevState) => ({
      ...prevState,
      selectedColorOne: color,
      errorColor: "",
    }));
  };
  // Función para manejar el color seleccionado dos y el error.
  const handleColorTwo = (color) => {
    if (homeState.selectedColorOne === color) {
      setHomeState((prevState) => ({
        ...prevState,
        selectedColorTwo: color,
        errorColor: "¡Este color ya fue elegido por el jugador uno!",
      }));
      return;
    }
    setHomeState((prevState) => ({
      ...prevState,
      selectedColorTwo: color,
      errorColor: "",
    }));
  };
  // Ver que todos los campos estén completados.
  const isFormValid = !!(
    homeState.selectedColorOne &&
    homeState.selectedColorTwo &&
    homeState.namePlayerOne &&
    homeState.namePlayerTwo
  );

  console.log(isFormValid);

  const isNameValid =
    !homeState.namePlayerOne ||
    !homeState.namePlayerTwo ||
    homeState.namePlayerOne !== homeState.namePlayerTwo;
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
        formError: "¡Debes completar todos los campos!",
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
        formError: "",
      }));
      setGameScreenState((prevState) => ({
        ...prevState,
        currenPlayer: homeState.namePlayerOne,
      }));
      navigate("/gamescreen");
    }
  };
  // useEffect para vaciar el error de campos dinamicamente
  useEffect(() => {
    if (isFormValid) {
      setHomeState((prevState) => ({
        ...prevState,
        formError: "",
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
    if (
      homeState.namePlayerOne &&
      homeState.namePlayerTwo &&
      homeState.namePlayerOne === homeState.namePlayerTwo
    ) {
      setHomeState((prevState) => ({
        ...prevState,
        nameError: "¡Los nombres deben ser distintos!",
      }));
    } else {
      setHomeState((prevState) => ({
        ...prevState,
        nameError: "",
      }));
    }
  }, [homeState.namePlayerOne, homeState.namePlayerTwo]);

  return {
    handleColorOne,
    handleColorTwo,
    handlePlayClick,
    isFormValid,
    isNameValid,
  };
};

export default homeFunctions;
