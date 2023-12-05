import { useSelector } from "react-redux";
import parse from "html-react-parser";

import locationIcon from "../../Assets/location.svg";
import whatsappIcon from "../../Assets/whatsapp.svg";
import messageIcon from "../../Assets/message.svg";
import phoneIcon from "../../Assets/phone.svg";


const ContactUs = () => {
  const { contactDetails } = useSelector((state) => state.response);
  const address = parse(String(contactDetails?.address));

  return (
    <article id="contact" className="py-5 overflow-hidden">
      <section className="d-flex flex-md-row flex-column align-items-center justify-content-between px-md-5 contact-container">
        <section className="contact-details">
          <h1 className="mb-5">Contact Us</h1>
          <article className="d-flex flex-column gap-2">
		  <div className="d-flex align-items-start gap-3 p-1">
              <img src={phoneIcon} alt="whatsapp icon" />
              <div className="d-flex flex-column gap-1">
                <span className="fw-bold">Mobile</span>
                  <span>{contactDetails.mobile}</span>
              </div>
            </div>
            <div className="d-flex align-items-start gap-3 p-1">
              <img src={whatsappIcon} alt="whatsapp icon" />
              <div className="d-flex flex-column gap-1">
                <span className="fw-bold">Whatsapp</span>
                <a
                  className="contact-us-link"
                  target="_blank"
                  href={`https://wa.me/${contactDetails.whatsapp}`}
                >
                  <span>{contactDetails.whatsapp}</span>
                </a>
              </div>
            </div>
            <div className="d-flex align-items-start gap-3 p-1">
              <img src={messageIcon} alt="message/inbox icon" />
              <div>
                <span className="fw-bold">Write to us for queries</span>
                <a
                  href={`mailto:${contactDetails.email}`}
                  className="contact-us-link"
                >
                  <div>{contactDetails.email}</div>
                </a>
              </div>
            </div>
            <div className="d-flex align-items-start gap-1 p-1">
              <img src={locationIcon} alt="location icon" />
              <div className="ms-3 w-100">
                <span className="fw-bold">Location</span>
                <address>{address}</address>
              </div>
            </div>
          </article>
        </section>
        <section className="map-container">
          <iframe
            src={process.env.REACT_APP_MAP_URL}
            width="100%"
            height="100%"
            style={{ minHeight: "25rem" }}
          ></iframe>
        </section>
      </section>
    </article>
  );
};

export default ContactUs;
