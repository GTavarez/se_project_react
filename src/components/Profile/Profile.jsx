import SideBar from "./SideBar/SideBar";
import ClothesSection from "./ClothesSection/ClothesSection";
import "./Profile.css";

function Profile({
  onCardClick,
  clothingItems,
  onCardLike,
  onClick,
  activeModal,
  currentUser,
  onUpdate,
  onClose,
  onSignOut
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar
          activeModal={activeModal}
          onUpdate={onUpdate}
          onClose={onClose}
          currentUser={currentUser}
          onSignOut={onSignOut}
        />
      </section>
      <section className="profile__clothes-items">
        <ClothesSection
          onCardClick={onCardClick}
          clothingItems={clothingItems}
          onClick={onClick}
          onCardLike={onCardLike}
        />
      </section>
    </div>
  );
}

export default Profile;
