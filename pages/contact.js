import classNames from "classnames";
import styles from "../styles/contactStyles/contact.module.css";
import React from "react";
import ContactForm from "../components/contact/ContactForm";
import FbPage from "../components/contact/FbPage";
import Map from "../components/contact/Map";
import Head from 'next/head'

export default function Contact() {
  return (
    <>
     <Head>
      <title>Kontakt</title>
      <meta name='description' content='I hope this tutorial is helpful for you' />
    </Head>
      <Map />
      <div className={classNames(styles.gridContainer, "innerContentWidth")}>
        <ContactForm />
        <FbPage />
      </div>
    </>
  );
}
