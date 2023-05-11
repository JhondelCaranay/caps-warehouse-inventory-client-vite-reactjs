import styles from "./homepage.module.scss";

import BannerImg from "../../../assets/img/banner.jpg";
import {
  DesignServices,
  Engineering,
  Foundation,
  HouseSiding,
  LocalShipping,
  Park,
} from "@mui/icons-material";
import { toast } from "react-toastify";
import { useState } from "react";

const Homepage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div id="home" className={styles.homepage}>
      {/* links */}
      <div className={styles.navlinks}>
        <a href="#home">Home</a>
        <a href="#about">About Us</a>
        <a href="#service">Services</a>
        <a href="#contact">Contact Us</a>
      </div>

      {/* hero banner */}
      <div className={styles.heroBanner}>
        <div className={styles.left}>
          <h1 className={styles.title}>SPEDI inc.</h1>
          <h3 className={styles.subtitle}>Construction Company</h3>
          <p className={styles.desc}>
            We strive to provide quality Construction Works to our clients and steadfastly advocate
            for the maintenance and promotion of health and safety of our employees and business
            partners and the communities wherein we operate, as well as the protection of their
            resources and the environment.
          </p>
          <a href="#about" className={styles.btn}>
            Learn More
          </a>
        </div>
        <div className={styles.right}>
          <img className={styles.img} src={BannerImg} alt="" />
        </div>
      </div>

      <hr />

      {/* profile */}
      <div id="about" className={styles.profile}>
        <h2 className={styles.title}>Company Profile</h2>
        <div className={styles.bottom}>
          <div className={styles.left}>
            <h3 className={styles.subtitle}>SPEDI CONSTRUCTION, INC.</h3>
            <p className={styles.desc}>
              General Building Contractor manned by Professional Architectural, Civil, Mechanical,
              and Electrical Engineers experienced in the fields of vertical and horizontal
              construction.
            </p>
          </div>
          <div className={styles.right}>
            <h3 className={styles.subtitle}>Our Mission</h3>
            <p className={styles.desc}>
              We strive to provide quality Construction Works to our clients and steadfastly
              advocate for the maintenance and promotion of health and safety of our employees and
              business partners and the communities wherein we operate, as well as the protection of
              their resources and the environment.
            </p>
          </div>
        </div>
      </div>

      <hr />

      {/* our services */}
      <div id="service" className={styles.services}>
        <h2 className={styles.title}>Our Services</h2>
        <div className={styles.bottom}>
          <div className={styles.service}>
            <Foundation className={styles.icon} />
            <h3 className={styles.subtitle}>General Building Contractor</h3>
            <p className={styles.desc}>
              We offer turnkey solutions for all types of construction projects, from design to
              construction and project management.
            </p>
          </div>
          <div className={styles.service}>
            <DesignServices className={styles.icon} />

            <h3 className={styles.subtitle}>Design-Build</h3>
            <p className={styles.desc}>
              Our design-build services streamline the construction process by combining the design
              and construction phases into a single point of contact, resulting in faster delivery
              times and cost savings.
            </p>
          </div>
          <div className={styles.service}>
            <HouseSiding className={styles.icon} />

            <h3 className={styles.subtitle}>Construction Management</h3>
            <p className={styles.desc}>
              Our construction management services provide clients with expert guidance and
              oversight throughout the entire construction process, from planning to completion.
            </p>
          </div>
          <div className={styles.service}>
            <Engineering className={styles.icon} />
            <h3 className={styles.subtitle}>Engineering Services</h3>
            <p className={styles.desc}>
              Our team of experienced engineers offers a variety of engineering services, including
              structural design, civil engineering, MEP engineering, and more.
            </p>
          </div>
          <div className={styles.service}>
            <Park className={styles.icon} />
            <h3 className={styles.subtitle}>Green Buildings</h3>
            <p className={styles.desc}>
              We are committed to sustainable building practices and offer green building solutions
              that reduce environmental impact and promote energy efficiency.
            </p>
          </div>
          <div className={styles.service}>
            <LocalShipping className={styles.icon} />
            <h3 className={styles.subtitle}>Logistics</h3>
            <p className={styles.desc}>
              We also provide logistics services to ensure that your materials and equipment are
              delivered on time and to the right location, saving you time and money.
            </p>
          </div>
        </div>
      </div>

      <hr />

      {/* contact us */}
      <div id="contact" className={styles.contact}>
        <h2 className={styles.title}>Contact Us</h2>
        <div className={styles.bottom}>
          <div className={styles.left}>
            <h3 className={styles.subtitle}>SPEDI CONSTRUCTION, INC.</h3>
            <p className={styles.desc}>
              <b>Adress :</b> 6076 Tatalon, Ugong, Valenzuela, Metro Manila, Valenzuela, 1440 Metro
              Manilay
            </p>
            <p className={styles.desc}>
              <b>Hours :</b> Monday - Saturday 8:00 AM - 5:00 PM
            </p>
            <p className={styles.desc}>
              <b>Phone :</b> (02) 3432 5420
            </p>

            <div className={styles.mapouter}>
              <div className={styles.gmap_canvas}>
                <iframe
                  className={styles.gmap_iframe}
                  frameBorder="0"
                  scrolling="no"
                  marginHeight={0}
                  marginWidth={0}
                  src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=SPEDI Construction, Inc 6076 Tatalon, Ugong, Valenzuela, Metro Manila, Valenzuela, 1440 Metro               Manilay&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                ></iframe>
                <a href="https://capcuttemplate.org/">Capcuttemplate.org</a>
              </div>
            </div>
          </div>
          <div className={styles.right}>
            <form className={styles.form}>
              <input
                className={styles.input}
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className={styles.input}
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className={styles.input}
                type="text"
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
              <textarea
                className={styles.input}
                placeholder="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button
                className={styles.btn}
                onClick={(e) => {
                  e.preventDefault();

                  if (!name || !email || !subject || !message) {
                    return toast.error("Please fill up all fields!");
                  }

                  toast.success("Message sent!");

                  // reset
                  setName("");
                  setEmail("");
                  setSubject("");
                  setMessage("");
                }}
              >
                Send
              </button>
            </form>
            <div className={styles.socials}>
              <a href="#" className={styles.social}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                </svg>
              </a>
              <a href="#" className={styles.social}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor">
                  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <hr />

      {/* footer */}
      <div className={styles.footer}>
        <p className={styles.copy}>&copy; 2021 SPEDI CONSTRUCTION, INC.</p>
        <div className={styles.links}>
          <a href="#" className={styles.link}>
            Home
          </a>
          <a href="#about" className={styles.link}>
            About Us
          </a>
          <a href="#service" className={styles.link}>
            Services
          </a>
          <a href="#contact" className={styles.link}>
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};
export default Homepage;
