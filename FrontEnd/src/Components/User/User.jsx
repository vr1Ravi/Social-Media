import "./User.scss";

const User = ({ name, image, bio }) => {
  return (
    <div className="userBox">
      <div className="leftSide">
        <div className="userImage">
          <img src={image} alt="userImage" />
        </div>

        <p>{bio}</p>
      </div>
      <div className="rightSide">
        <p>{name}</p>
      </div>
    </div>
  );
};

export default User;
