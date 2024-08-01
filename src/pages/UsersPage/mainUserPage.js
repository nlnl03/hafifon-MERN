import UserPageLeftSide from "../../components/userPageParts/leftSide";
import UserPageRightSide from "../../components/userPageParts/rightSide";
import "../UsersPage/mainUserPage.css";
function UserPage() {
  return (
    <div className="main-page">
      <div className="main-title">
        <div className="main-title-flex">
          <h1>האיזור האישי</h1>
          <div className="under-line"></div>
        </div>
      </div>
      <div className="main">
        <UserPageRightSide />
        <UserPageLeftSide />
      </div>
    </div>
  );
}

export default UserPage;
