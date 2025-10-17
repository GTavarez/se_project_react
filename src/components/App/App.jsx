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
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { getItems } from "../../utils/api.js";
import { signup, signin, getCurrentUser } from "../../utils/auth.js";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import CurrentUserContext from "../../context/CurrentUserContext.js";
import * as api from "../../utils/api.js";
import EditProfileModal from "../EditProfileModal/EditProfileModal.jsx";
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
  const [clothingItems, setClothingItems] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [shouldResetLoginForm, setShouldResetLoginForm] = useState(false);

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
  const handleOpenModal = () => {
    setActiveModal("edit-profile");
  };

  const handleRegisterModal = () => setIsRegisterModalOpen(true);
  const handleLoginModal = () => setIsLoginModalOpen(true);

  const handleRegistration = ({ email, password, name, avatar }) => {
    signup({ email, password, name, avatar })
      .then((data) => {
        return data;
      })
      .then(() => {
        setIsRegisterModalOpen(false);
        return signin({ email, password });
      })
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setIsLoggedIn(true);
        setCurrentUser(data.user);
      })
      .catch((error) => {
        console.error("Registration error", error);
      });
  };

  const handleLogin = ({ email, password }) => {
    signin({ email, password })
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setIsLoggedIn(true);
        return getCurrentUser(data.token);
      })
      .then((userData) => {
        setIsLoggedIn(true);
        setCurrentUser(userData.user);
        setIsLoginModalOpen(false);
      })
      .catch((error) => {
        console.error("Login error", error.message);
      });
  };
  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false);
  };
  const handleAddItemSubmit = (item) => {
    const token = localStorage.getItem("jwt");
    const { name, imageUrl, weather } = item;

    api
      .submitItems({ name, imageUrl, weather, token })
      .then((newItem) => {
        setClothingItems([newItem.data, ...clothingItems]);
        closeActiveModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteCard = (item) => {
    const token = localStorage.getItem("jwt"); // ← Get token

    api
      .deleteCard(item, token) // ← Pass token to API function
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
          .addCardLike(id, token) // ← Pass token
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard.data : item))
            );
          })
          .catch((err) => console.log(err))
      : api
          .removeCardLike(id, token) // ← Pass token
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard.data : item))
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
  const switchToSignup = () => {
    setIsRegisterModalOpen(true); // close login
    setTimeout(() => setActiveModal("signup"), 300);
  };
  const handleEditProfile = ({ name, avatar }) => {
    const token = localStorage.getItem("jwt");
    return api
      .updateProfile({ name, avatar, token })
      .then((data) => {
        setCurrentUser(data.user);
        closeActiveModal();
      })
      .catch((err) => console.log(err));
  };
  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
    setShouldResetLoginForm(true);
  };
  const switchToLogin = () => {
    setIsLoginModalOpen(true);
    setTimeout(() => setActiveModal("login"), 300);
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
        setClothingItems(data.data);
      })
      .catch(console.error);
  }, []);
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      getCurrentUser(token)
        .then((data) => {
          setIsLoggedIn(true);
          setCurrentUser(data.user);
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
      <CurrentUserContext.Provider value={currentUser}>
        <CurrentTemperatureContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="page">
            <div className="page__content">
              <Header
                handleAddClick={handleAddClick}
                weatherData={weatherData}
                onLoginModal={handleLoginModal}
                onSignupModal={handleRegisterModal}
              />
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
                      onClose={closeActiveModal}
                      card={selectedCard}
                    />
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                      <Profile
                        onCardClick={handleCardClick}
                        onCardLike={handleCardLike}
                        clothingItems={clothingItems}
                        onClick={handleAddClick}
                        activeModal={activeModal}
                        onUpdate={handleOpenModal}
                        onClose={closeActiveModal}
                        onSignOut={handleSignOut}
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
              onRegister={handleRegistration}
              onLogin={switchToLogin}
            />
            <LoginModal
              isOpen={isLoginModalOpen}
              onClose={handleCloseLoginModal}
              onLogin={handleLogin}
              onSignupModal={switchToSignup}
              shouldResetLoginForm={shouldResetLoginForm}
              onResetComplete={() => setShouldResetLoginForm(false)}
            />
            <EditProfileModal
              isOpen={activeModal === "edit-profile"}
              activeModal={activeModal}
              onUpdate={handleEditProfile}
              onClose={closeActiveModal}
            />

            <Footer />
          </div>
        </CurrentTemperatureContext.Provider>
      </CurrentUserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
