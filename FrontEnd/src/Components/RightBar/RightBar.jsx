import "./RightBar.scss";
const RightBar = () => {
  return (
    <>
      <div className="homeRight">
        <h1>Whom to Follow</h1>
        <div className="randomUsers">
          <div>
            <div>
              <img
                className="userImage"
                src="https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png"
                alt="user"
              />
              <h3>John Doe</h3>
            </div>
            <button>Follow</button>
          </div>

          <div>
            <div>
              <img
                className="userImage"
                src="https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png"
                alt="user"
              />
              <h3>John Doe</h3>
            </div>
            <button>Follow</button>
          </div>

          <div>
            <div>
              <img
                className="userImage"
                src="https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png"
                alt="user"
              />
              <h3>John Doe</h3>
            </div>
            <button>Follow</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RightBar;
