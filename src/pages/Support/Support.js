import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import emailjs from 'emailjs-com';
import { Formik } from 'formik';
import './Support.scss';

export default function Support() {
  const form = useRef();
  const YOUR_SERVICE_ID = 'service_hcoa7ij';
  const YOUR_TEMPLATE_ID = 'template_5sca7vc';
  const YOUR_USER_ID = 'user_ijlJo0XGucv2mYoKRhhr4';
  // eslint-disable-next-line no-unused-vars
  const regularExpression = {
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    subject: /^[a-zA-ZÀ-ÿ\s]{1,35}$/,
    message: /^[a-zA-ZÀ-ÿ\s]{1,400}$/,
  };

  function validateFields(values) {
    // eslint-disable-next-line prefer-const
    let errors = {};

    if (!values.email) {
      errors.email = 'Campo obligatorio';
    } else if (!regularExpression.email.test(values.email)) {
      errors.email = 'Por favor ingrese un email valido';
    }

    if (!values.subject) {
      errors.subject = 'Campo obligatorio';
    } else if (!regularExpression.subject.test(values.subject)) {
      errors.subject = 'Por favor ingrese un asunto valido';
    }

    if (!values.message) {
      errors.message = 'Campo obligatorio';
    } else if (!regularExpression.message.test(values.message)) {
      errors.message = 'Por favor ingrese un mensaje valido';
    }

    return errors;
  }

  function sendEmail() {
    emailjs.sendForm(YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, form.current, YOUR_USER_ID)
      .then((result) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
  }

  return (
    <div className="App">
      <div className="App-header Support-content">
        <h1 className="Support-title">Support</h1>
        <Formik
          initialValues={{
            email: '',
            subject: '',
            message: '',
          }}
          validate={(values) => {
            // eslint-disable-next-line prefer-const
            let errors = validateFields(values);

            return errors;
          }}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            sendEmail();
            resetForm();
          }}
        >
          {
            // eslint-disable-next-line object-curly-newline
            ({ values, errors, touched, handleSubmit, handleChange, handleBlur }) => (
              <form ref={form} onSubmit={handleSubmit}>
                <div>
                  <input
                    className="Support-input-text"
                    type="text"
                    name="email"
                    placeholder="e-mail"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                  {touched.email && errors.email && <p className="Support-message-error">{errors.email}</p>}
                </div>
                <div>
                  <input
                    className="Support-input-text"
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={values.subject}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                  {touched.subject && errors.subject && <p className="Support-message-error">{errors.subject}</p>}
                </div>
                <div>
                  <textarea
                    className="Support-message"
                    name="message"
                    placeholder="Type your problem here"
                    value={values.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                  {touched.message && errors.message && <p className="Support-message-error">{errors.message}</p>}
                </div>
                <div className="Support-buttons">
                  <button type="button" className="Support-link">
                    <Link to="/" className="Support-link-back">BACK TO MENU</Link>
                  </button>
                  <input type="submit" className="Support-link" value="SEND" />
                </div>
              </form>
            )
            }
        </Formik>
      </div>
    </div>
  );
}
