import { useState, useEffect } from "react";
import "./App.css";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import Footer from "../Footer/Footer.jsx";
import Profile from "../Profile/Profile.jsx";
import { getWeather, filterWeatherData } from "../../utils/weatherApi.js";
import { coordinates, APIkey } from "../../utils/constants.js";
import CurrentTemperatureContext from "../../context/CurrentTemperatureUnit.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal.jsx";
import { defaultClothingItems } from "../../utils/constants.js";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { getItems, submitItems, deleteCard } from "../../utils/api.js";
function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: false,
  });

  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState([]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const openConfirmationModal = () => {
    setShowConfirmation(true);
  };
  const closeConfirmationModal = () => {
    setShowConfirmation(false);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };
  const closeActiveModal = () => {
    setActiveModal("");
  };
  const handleAddItemSubmit = async (item) => {
    try {
      const newItem = await submitItems(item);
      setClothingItems((prevItems) => [newItem, ...prevItems]);
    } catch (err) {
      console.log(err);
    }
    /* await submitItems(item);
    await getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error); */
    closeActiveModal();
  };

  const handleDeleteCard = async () => {
    try {
      // deleting the card from the server
      await deleteCard(selectedCard);
      // deleting the card locally (visually)
      setClothingItems((prevItems) =>
        prevItems.filter((clothes) => selectedCard._id !== clothes._id)
      );
      closeActiveModal();
      closeConfirmationModal();
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };
  const handleCardClick = (item) => {
    setActiveModal("preview");
    setSelectedCard(item);
  };
  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  return (
    <BrowserRouter>
      <CurrentTemperatureContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <div className="page__content">
            <Header handleAddClick={handleAddClick} weatherData={weatherData} />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    setActiveModal={setActiveModal}
                    onCardClick={handleCardClick}
                    clothingItems={clothingItems}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <Profile
                    onCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onAddItemSubmit={handleAddClick}
                  />
                }
              />
            </Routes>
          </div>
          <AddItemModal
            activeModal={activeModal}
            onClose={closeActiveModal}
            onAddItemSubmit={handleAddItemSubmit}
          />
          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            onClose={closeActiveModal}
            onDeleteButtonClick={openConfirmationModal}
          />
          <ConfirmationModal
            showConfirmation={showConfirmation}
            onSecondButtonClick={closeConfirmationModal}
            card={selectedCard}
            onFirstButtonClick={handleDeleteCard}
            onClose={closeConfirmationModal}
          />

          <Footer />
        </div>
      </CurrentTemperatureContext.Provider>
    </BrowserRouter>
  );
}

export default App;
