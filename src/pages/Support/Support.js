import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import emailjs from 'emailjs-com';
import './Support.scss';

export default function Support() {
  const form = useRef();
  const YOUR_SERVICE_ID = 'service_hcoa7ij';
  const YOUR_TEMPLATE_ID = 'template_5sca7vc';
  const YOUR_USER_ID = 'user_ijlJo0XGucv2mYoKRhhr4';
  const regularExpression = {
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    subject: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
    message: /^[a-zA-ZÀ-ÿ\s]{1,400}$/,
  };

  const [email, setEmail] = useState({ value: '', valid: true });
  const [subject, setSubject] = useState({ value: '', valid: true });

  function validateEmail(e) {
    if (regularExpression.email.test(e.target.email)) {
      email.valid = false;
    }
    console.log(email.valid);
    return email.valid;
  }

  function validateSubject(e) {
    if (regularExpression.subject.test(e.target.subject)) {
      subject.valid = false;
    }

    return subject.valid;
  }

  // eslint-disable-next-line no-unused-vars
  function validateForm(e) {
    let validForm = false;
    if (validateEmail(e) && validateSubject(e)) {
      validForm = true;
    }
    console.log(validForm);
    return validForm;
  }

  function sendEmail(e) {
    e.preventDefault();

    emailjs.sendForm(YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, form.current, YOUR_USER_ID)
      .then((result) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
    e.target.reset();
  }

  return (
    <div className="App">
      <div className="App-header">
        <h1 className="Support-title">Support</h1>
        <form ref={form} onSubmit={sendEmail}>
          <div>
            <input className="Support-input-text" type="text" name="email" placeholder="e-mail" value={email.value} onChange={setEmail} required />
            {!email.valid && <p className="Support-message-error">Campo obligatorio</p>}
          </div>
          <div>
            <input className="Support-input-text" type="text" name="subject" placeholder="Subject" value={email.subject} onChange={setSubject} required />
            {!subject.valid && <p className="Support-message-error">Campo obligatorio</p>}
          </div>
          <div>
            <textarea className="Support-message" name="message" placeholder="Type your problem here" />
            <p className="Support-message-error">Campo obligatorio</p>
          </div>
          <div className="Support-buttons">
            <button type="button" className="Support-link">
              <Link to="/" className="Support-link-back">BACK TO MENU</Link>
            </button>
            <input type="submit" className="Support-link" value="SEND" />
          </div>
        </form>
      </div>
    </div>
  );
}
