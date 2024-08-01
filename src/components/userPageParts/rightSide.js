import "../userPageParts/allSides.css";

function UserPageRightSide() {
  return (
    <div className="right-side-flex">
      <div className="name-progress-details">
        <div className="personal-info">
          <div className="personal-info-items">
            <div className="inner-right-flex">
              {true &
              (
                <>
                  <div className="name-detail">
                    <h2>userName</h2>
                  </div>
                  <div className="hafifa-nickname">חפיפון מתחיל</div>
                </>
              )}
            </div>

            <div className="inner-left-flex">
              {true &
              (
                <img
                  className="user-image"
                  src="{imgUrl}"
                  ref="myImage"
                  alt="not defind"
                />
              )}
            </div>
          </div>
        </div>

        <div className="progress-info">
          <div className="users-progress-item">
            {true ? (
              <>
                <div className="title"> כמה עברתי מהחפיפה ?</div>
                <div className="progress-circle-how-much">
                  {/* <circle-progress
                        :percent="calcTotalProgress(val)"
                        :show-percent="true"
                        fill-color="var(--main-background-color)"
                        :viewport="true"
                        :transition="600"
                        /> */}
                </div>
              </>
            ) : (
              <h1>fdsdfdf</h1>
              // <loadingSpinner />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserPageRightSide;
