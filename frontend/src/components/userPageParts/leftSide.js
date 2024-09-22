import "../userPageParts/allSides.css";

function UserPageLeftSide() {
  return (
    <div className="left-side-flex">
      <div className="spinner">
        <loadingSpinner />
      </div>

      {true &&
        true &
        (
          <h1
            style={{
              position: "relative",
              top: "-50px",
              padding: "1.5em",
              fontSize: "50px",
            }}
          >
            לא קיימים מבחנים במחלקה זו
          </h1>
        )}
    </div>
  );
}

export default UserPageLeftSide;
