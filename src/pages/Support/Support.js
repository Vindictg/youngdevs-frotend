import React, { useRef } from 'react';
import { Button } from '@material-ui/core';
import emailjs from 'emailjs-com';
import { Formik } from 'formik';
import './Support.scss';
import useAuth from '../../hooks/useAuth';

export default function Support({
  email = '',
  subject = '',
  message = '',
}) {
  const { user } = useAuth();

  const form = useRef();
  const sendButton = useRef(null);
  const YOUR_SERVICE_ID = 'service_hcoa7ij';
  const YOUR_TEMPLATE_ID = 'template_5sca7vc';
  const YOUR_USER_ID = 'user_ijlJo0XGucv2mYoKRhhr4';

  const regularExpression = {
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    subject: /^[a-zA-ZÀ-ÿ\s]{1,35}$/,
    message: /^[a-zA-ZÀ-ÿ\s]{1,400}$/,
  };

  const validateFields = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = 'Please enter an email';
    } else if (!regularExpression.email.test(values.email)) {
      errors.email = 'Please enter a valid email';
    }

    if (!values.subject) {
      errors.subject = 'Please enter a subject';
    } else if (!regularExpression.subject.test(values.subject)) {
      errors.subject = 'Please enter a valid subject';
    }

    if (!values.message) {
      errors.message = 'Please enter a message';
    } else if (!regularExpression.message.test(values.message)) {
      errors.message = 'Please enter a valid message';
    }

    return errors;
  };

  const sendEmail = async () => {
    await emailjs.sendForm(YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, form.current, YOUR_USER_ID);
  };

  const handleSendButton = () => {
    sendButton.current.click();
  };

  return (
    <div className="App-container">
      <div className="Container">
        <h1 className="Generic-title">Support</h1>
        <Formik
          initialValues={{
            email: email || user.email,
            subject,
            message,
          }}
          validate={(values) => {
            const errors = validateFields(values);

            return errors;
          }}
          onSubmit={(_, { resetForm }) => {
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
                  <Button variant="contained" className="App-link" href="/">BACK TO MENU</Button>
                  <Button variant="contained" className="App-link" onClick={handleSendButton}>SEND</Button>
                  <input ref={sendButton} type="submit" className="Support-link" value="SEND" />
                </div>
              </form>
            )
            }
        </Formik>
      </div>
    </div>
  );
}
