import React from "react";
import styles from "./contactForm.module.css";
import { memo, useState, useCallback } from "react";
import classNames from "classnames";
import Script from "next/script";
import { PRIVACY_POLICY_URL } from "../../lib/iubenda";

function ContactForm() {
  const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY;

  const [inputs, setInputs] = useState({
    name: "",
    surname: "",
    email: "",
    phoneNumber: "",
    message: "",
  });

  const [form, setForm] = useState("");
  const [recaptchaRequested, setRecaptchaRequested] = useState(false);

  const requestRecaptcha = useCallback(() => setRecaptchaRequested(true), []);

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmitForm = useCallback(
    async (e) => {
      e.preventDefault();

      if (!window.grecaptcha) {
        setForm({ state: "error" });
        return;
      }

      window.grecaptcha.ready(() => {
        window.grecaptcha
          .execute(SITE_KEY, { action: "submit" })
          .then(async (token) => {
            const body = { ...inputs, token };

            if (
              inputs.name &&
              inputs.surname &&
              inputs.email &&
              inputs.phoneNumber &&
              inputs.message
            ) {
              setForm({ state: "loading" });
              try {
                const res = await fetch(`api/contactByEmail`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(body),
                });

                const { error } = await res.json();

                if (error) {
                  setForm({
                    state: "error",
                  });
                  return;
                }

                setForm({
                  state: "success",
                });
                setInputs({
                  name: "",
                  surname: "",
                  email: "",
                  phoneNumber: "",
                  message: "",
                });
              } catch (error) {
                setForm({
                  state: "error",
                });
              }
            }
          });
      });
    },
    [inputs, SITE_KEY]
  );

  return (
    <>
      {recaptchaRequested && (
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`}
        />
      )}
      <div className={styles.container}>
        <form
          className={classNames(styles.form)}
          onSubmit={onSubmitForm}
          onFocus={requestRecaptcha}
        >
          <h2 className={classNames("title")}>Formularz kontaktowy</h2>
          <div className={styles.inputsContainer}>
            <label className="sr-only" htmlFor="name">
              Imię
            </label>
            <input
              id="name"
              autoComplete="given-name"
              type="text"
              value={inputs.name}
              onChange={handleChange}
              className={styles.inputField}
              placeholder="Imię"
              required
            />
            <label className="sr-only" htmlFor="surname">
              Nazwisko
            </label>
            <input
              id="surname"
              autoComplete="family-name"
              type="text"
              value={inputs.surname}
              onChange={handleChange}
              className={styles.inputField}
              placeholder="Nazwisko"
              required
            />
          </div>
          <div className={styles.inputsContainer}>
            <label className="sr-only" htmlFor="email">
              E-mail
            </label>
            <input
              id="email"
              autoComplete="email"
              type="email"
              value={inputs.email}
              onChange={handleChange}
              className={styles.inputField}
              placeholder="Twój e-mail"
              required
            />
            <label className="sr-only" htmlFor="phoneNumber">
              Numer telefonu
            </label>
            <input
              id="phoneNumber"
              type="tel"
              autoComplete="tel"
              value={inputs.phoneNumber}
              onChange={handleChange}
              className={styles.inputField}
              placeholder="Twój numer telefonu"
              required
            />
          </div>
          <label className="sr-only" htmlFor="message">
            Wiadomość
          </label>
          <textarea
            id="message"
            type="text"
            value={inputs.message}
            onChange={handleChange}
            className={styles.inputField}
            placeholder="Wiadomość"
            rows="8"
            required
          />
          <p className={styles.formNotice}>
            Informacje o tym, kto i w jaki sposób przetwarza dane podane w
            formularzu, znajdziesz w{" "}
            <a
              href={PRIVACY_POLICY_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Polityce prywatności
            </a>
            . Ta strona jest chroniona przez reCAPTCHA – obowiązują{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Polityka prywatności Google
            </a>{" "}
            oraz{" "}
            <a
              href="https://policies.google.com/terms"
              target="_blank"
              rel="noopener noreferrer"
            >
              Warunki korzystania z usług Google
            </a>
            .
          </p>
          <button
            title="Wyślij po wypełnieniu wszystkich pól formularza"
            type="submit"
            className={styles.button}
          >
            Wyślij
          </button>
          {form.state === "loading" ? (
            <div role="status" className={styles.messageLoading}>
              Wysyłanie...
            </div>
          ) : form.state === "error" ? (
            <div role="alert" className={styles.messageError}>
              {`Coś poszło nie tak... Prosimy o napisanie wiadomości bezpośrednio
              ze swojej poczty elektronicznej lub aplikacji pocztowej na adres:
              "ul50@wp.pl"`}
            </div>
          ) : (
            form.state === "success" && (
              <div role="status" className={styles.messageSuccess}>
                Wiadomość wysłana.
              </div>
            )
          )}
        </form>
      </div>
    </>
  );
}
export default memo(ContactForm);
