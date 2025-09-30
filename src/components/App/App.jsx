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
import { signup, signin, checkToken } from "../../utils/auth.js";
import ProtectedRoute from "../ProtectedRoute.jsx/ProtectedRoute.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import { use } from "react";
import * as api from "../../utils/api.js";
function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: false,
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState([]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

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

  const handleRegistration = ({ email, password, name, avatar }) => {
    signup({ email, password, name, avatar })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Registration Failed");
      })
      .then(() => {
        setIsRegisterModalOpen(false);
        return signin({ email, password });
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Sign in Failed");
      })
      .then((data) => {
        setIsLoggedIn(true);
        setCurrentUser(data.user);
      })
      .catch((error) => {
        console.error("Regiistration error", error);
      });
  };

  const handleLogin = ({ email, password }) => {
    signin({ email, password })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Error: ${res.status}`);
        }
      })
      .then((data) => {
        setIsLoggedIn(true);
        setCurrentUser(data.user);
        setIsLoginModalOpen(false);
      })
      .catch((error) => {
        console.error("Login error", error);
      });
  };
  const handleAddItemSubmit = async (item) => {
    const token = localStorage.getItem("jwt");
    api
      .submitItems({ ...item, token })
      .then((newItem) => {
        setClothingItems([newItem, ...clothingItems]);
        closeActiveModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteCard = (item) => {
    const token = localStorage.getItem("jwt"); // ← Get token

    api
      .deleteItem(item._id, token) // ← Pass token to API function
      .then(() => {
        setClothingItems((items) => items.filter((i) => i._id !== item._id));
        closeActiveModal();
      })
      .catch((err) => console.log(err));
  };
  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt"); // ← Get token

    !isLiked
      ? api
          .addLike(id, token) // ← Pass token
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err))
      : api
          .removeLike(id, token) // ← Pass token
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err));
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
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      checkToken(token)
        .then((data) => {
          setIsLoggedIn(true);
          setCurrentUser(data);
        })
        .catch((error) => {
          console.error("Token validation failed:", error);
          localStorage.removeItem("jwt");
          setIsLoggedIn(false);
        });
    }
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
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      onCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      onAddItemSubmit={handleAddClick}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
          <AddItemModal
            activeModal={activeModal}
            onClose={closeActiveModal}
            onAddItemSubmit={handleAddItemSubmit}
            isOpen={activeModal === "add-garment"}
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
          <RegisterModal
            isOpen={isRegisterModalOpen}
            onClose={() => setIsRegisterModalOpen(false)}
            onSubmit={handleRegistration}
          />
          <LoginModal
            isOpen={isLoginModalOpen}
            onClose={() => setIsLoginModalOpen(false)}
            onSubmit={handleLogin}
          />

          <Footer />
        </div>
      </CurrentTemperatureContext.Provider>
    </BrowserRouter>
  );
}

export default App;
