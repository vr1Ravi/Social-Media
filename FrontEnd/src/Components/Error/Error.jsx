import { Link } from "react-router-dom";

const Errorpage = () => {
  return (
    <div
      style={{ left: "60%" }}
      className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 inline-flex items-center"
    >
      <h1>
        404 Page Not Found.{" "}
        <Link
          onClick={localStorage.setItem("path", "/")}
          className=" underline"
          to={"/"}
        >
          Click here to go back
        </Link>
      </h1>
    </div>
  );
};

export default Errorpage;
