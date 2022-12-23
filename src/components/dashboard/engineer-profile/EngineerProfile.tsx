import "./engineerProfile.scss";
import { User } from "../../../types";
import noImage from "./../../../assets/img/noimage.png";
import useWindowSize from "../../../hooks/useWindowSize";
type EngineerProfileProps = {
  user: User | undefined;
};
const EngineerProfile = ({ user }: EngineerProfileProps) => {
  const { windowSize } = useWindowSize();
  let content: JSX.Element | null = null;

  if (!user) {
    content = (
      <div className="empty">
        <p>Assign an engineer to see their profile</p>
      </div>
    );
  }

  if (user) {
    content = (
      <>
        <div className="viewButton">View</div>
        <div className="editButton">Edit</div>
        <div className="item">
          {windowSize > 768 && (
            <img
              src={user.Profile.avatarUrl ? user.Profile.avatarUrl : noImage}
              alt=""
              className="itemImg"
            />
          )}

          <div className="details">
            <h1 className="itemTitle">{user.Profile.first_name + " " + user.Profile.last_name}</h1>
            <div className="detailItem">
              <span className="itemKey">Email:</span>
              <span className="itemValue">{user.email}</span>
            </div>
            <div className="detailItem">
              <span className="itemKey">Position:</span>
              <span className="itemValue">
                {user.Profile.position ? user.Profile.position : "N/A"}
              </span>
            </div>
            <div className="detailItem">
              <span className="itemKey">Phone:</span>
              <span className="itemValue">
                {user.Profile.contact ? "+" + user.Profile.contact : "N/A"}
              </span>
            </div>
            <div className="detailItem">
              <span className="itemKey">Address:</span>
              <span className="itemValue">
                {user.Profile.address ? "+" + user.Profile.address : "N/A"}
              </span>
            </div>
            <div className="detailItem">
              <span className="itemKey">Country:</span>
              <span className="itemValue">USA</span>
            </div>
            <hr />

            <div className="detailItem">
              <span className="itemKey">Join:</span>
              <span className="itemValue">12/12/2020</span>
            </div>

            <div className="detailItem">
              <span className="itemKey">Status:</span>
              <span className={`itemValue ${user.status}`}>{user.status}</span>
            </div>

            <div className="detailItem">
              <span className="itemKey">Total Projects:</span>
              <span className="itemValue">10</span>
            </div>

            <div className="detailItem">
              <span className="itemKey">Completed Projects:</span>
              <span className="itemValue">10</span>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="engineerProfile">
      <h1 className="title">Engineer Profile</h1>
      {content}
    </div>
  );
};
export default EngineerProfile;
