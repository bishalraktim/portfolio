import React, { useState } from "react";
import emailjs from "emailjs-com";

const Contact = ({ data }) => {
  const [url, setUrl] = useState(
    "mailto:test@example.com?subject=subject&body=body"
  );
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [para, setPara] = useState("SUBMIT");
  const [status, setStatus] = useState(false);

  const image = require("../Components/loader.gif");

  //console.log(data);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        process.env.REACT_APP_SERVICE,
        process.env.REACT_APP_TEMPLATE,
        e.target,
        process.env.REACT_APP_API
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    alert("Your message was sent, thank you!");
    setName("");
    setSubject("");
    setEmail("");
    setMessage("");
  };

  const handleClick = (status) => {
    setStatus(true);
    if (status) {
      setPara(<img src={image} alt="" />);

      setTimeout(() => {
        setPara("SUBMIT");
      }, 3000);
    }
  };

  return (
    <section id="contact">
      <div className="row section-head">
        <div className="two columns header-col">
          <h1>
            <span>Get In Touch.</span>
          </h1>
        </div>

        <div className="ten columns">
          <p className="lead">{data?.message}</p>
        </div>
      </div>

      <div className="row">
        <div className="eight columns">
          <form id="contactForm" name="contactForm" onSubmit={sendEmail}>
            <fieldset>
              <div>
                <label htmlFor="contactName">
                  Name <span className="required">*</span>
                </label>
                <input
                  value={name}
                  type="text"
                  size="35"
                  id="contactName"
                  name="contactName"
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor="contactEmail">
                  Email <span className="required">*</span>
                </label>
                <input
                  value={email}
                  type="text"
                  size="35"
                  id="contactEmail"
                  name="contactEmail"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor="contactSubject">
                  Subject <span className="required">*</span>
                </label>
                <input
                  value={subject}
                  type="text"
                  size="35"
                  id="contactSubject"
                  name="contactSubject"
                  onChange={(e) => setSubject(e.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor="contactMessage">
                  Message <span className="required">*</span>
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  cols="50"
                  rows="15"
                  id="contactMessage"
                  name="contactMessage"
                  required
                ></textarea>
              </div>

              <div>
                <button type="submit" className="submit" onClick={handleClick}>
                  {status ? para : "submit"}
                </button>
                <span id="image-loader">
                  <img alt="" src="../public/images/loader.gif" />
                </span>
              </div>
            </fieldset>
          </form>

          <div id="message-warning"> Error boy</div>
          <div id="message-success">
            <i className="fa fa-check"></i>Your message was sent, thank you!
            <br />
          </div>
        </div>

        <aside className="four columns footer-widgets">
          <div className="widget widget_contact">
            <h4>Address and Phone</h4>
            <p className="address">
              {data?.name}
              <br />
              {data?.address.street} <br />
              {data?.address.city}, {data?.address.state} {data?.address.zip}
              <br />
              <span>{data?.phone}</span>
            </p>
          </div>

          <div className="widget widget_tweets"></div>
        </aside>
      </div>
    </section>
  );
};

export default Contact;
