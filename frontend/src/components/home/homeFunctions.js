import { useContext } from "react";
import Context from "../../context/Context";

const homeFunctions = () => {
  const {
    namePlayerOne,
    namePlayerTwo,
    selectedColorOne,
    setSelectedColorOne,
    selectedColorTwo,
    setSelectedColorTwo,
    errorColor,
    setErrorColor,
    setFormError,
    setNameError,
    setCurrentPlayer,
  } = useContext(Context);

  // Función para manejar el color seleccionado uno y el error.
  const handleColorOne = (color) => {
    if (selectedColorTwo === color) {
      setSelectedColorOne(color);
      setErrorColor("¡Este color ya fue elegido por el jugador dos!");
      return;
    }
    setSelectedColorOne(color);
    setErrorColor("");
  };
  // Función para manejar el color seleccionado dos y el error.
  const handleColorTwo = (color) => {
    if (selectedColorOne === color) {
      setSelectedColorTwo(color);
      setErrorColor("¡Este color ya fue elegido por el jugador uno!");
      return;
    }
    setSelectedColorTwo(color);
    setErrorColor("");
  };
  // Ver que todos los campos estén completados y que los nombres sean distintos.
  const isFormValid =
    selectedColorOne && selectedColorTwo && namePlayerOne && namePlayerTwo;
  const isNameValid =
    !namePlayerOne || !namePlayerTwo || namePlayerOne !== namePlayerTwo;
  // Manejar los errores de nombres y campos.
  const handlePlayClick = (e) => {
    if (errorColor || !isNameValid) {
      e.preventDefault();
    }
    if (!isFormValid) {
      e.preventDefault();
      setFormError("¡Debes completar todos los campos!");
    } else {
      try {
        sessionStorage.setItem("namePlayerOne", namePlayerOne);
        sessionStorage.setItem("namePlayerTwo", namePlayerTwo);
        sessionStorage.setItem("selectedColorOne", selectedColorOne);
        sessionStorage.setItem("selectedColorTwo", selectedColorTwo);
      } catch (error) {
        console.log(error);
      }
      setFormError("");
      setCurrentPlayer(namePlayerOne);
    }
  };
  // useEffect para vaciar el error de campos dinamicamente
  useEffect(() => {
    if (isFormValid) {
      setFormError("");
    }
  }, [
    selectedColorOne,
    selectedColorTwo,
    namePlayerOne,
    namePlayerTwo,
    errorColor,
  ]);
  // useEffect mostrar el error de nombres dinamicamente
  useEffect(() => {
    if (namePlayerOne && namePlayerTwo && namePlayerOne === namePlayerTwo) {
      setNameError("¡Los nombres deben ser distintos!");
    } else {
      setNameError("");
    }
  }, [namePlayerOne, namePlayerTwo]);

  return {
    handleColorOne,
    handleColorTwo,
    handlePlayClick,
  };
};

export default homeFunctions;
