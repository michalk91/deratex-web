import React from "react";
import styles from "../../styles/contactStyles/contactForm.module.css";
import { memo, useState, useCallback, useRef, useEffect } from "react";
import Image from "next/dist/client/image";
import classNames from "classnames";


function ContactForm() {
  const [inputs, setInputs] = useState({
    name: "",
    surname: "",
    email: "",
    phoneNumber: "",
    message: "",
  });

  const [form, setForm] = useState("");

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();

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
          body: JSON.stringify(inputs),
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
  };
  return (
    <div className={styles.container}>

      <form className={styles.form} onSubmit={(e) => onSubmitForm(e)}>
      <p className={classNames("title")}>Formularz kontaktowy</p>
        <div className={styles.inputsContainer}>
        <input
          id="name"
          type="text"
          value={inputs.name}
          onChange={handleChange}
          className={styles.inputField}
          placeholder="Imię*"
          required
        />
        <input
          id="surname"
          type="text"
          value={inputs.surname}
          onChange={handleChange}
          className={styles.inputField}
          placeholder="Nazwisko*"
          required
        />
        </div>
        <div className={styles.inputsContainer}>
        <input
          id="email"
          type="email"
          value={inputs.email}
          onChange={handleChange}
          className={styles.inputField}
          placeholder="Twój e-mail*"
          required
        />
        <input
          id="phoneNumber"
          type="text"
          value={inputs.phoneNumber}
          onChange={handleChange}
          className={styles.inputField}
          placeholder="Twój numer telefonu*"
          required
        />
        </div>
        <textarea
          id="message"
          type="text"
          value={inputs.message}
          onChange={handleChange}
          className={styles.inputField}
          placeholder="Wiadomość*"
          rows="8"
          required
        />
        <p className={styles.requiredInfo}>* Pola obowiązkowe</p>
        <button type="submit"  className={styles.button} >Wyślij</button>
        {form.state === "loading" ? (
          <div className={styles.messageLoading}>Wysyłanie...</div>
        ) : form.state === "error" ? (
          <div className={styles.messageError}>
            Coś poszło nie tak... Prosimy o napisanie wiadomości bezpośrednio ze
            swojej poczty elektronicznej lub aplikacji pocztowej na adres:
            "ul50@wp.pl"
          </div>
        ) : (
          form.state === "success" && (
            <div className={styles.messageSuccess}>Wiadomość wysłana.</div>
          )
        )}
      </form>
    </div>
  );
}
export default memo(ContactForm);
