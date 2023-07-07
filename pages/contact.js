import classNames from "classnames";
import styles from "./contact.module.css";
import React from "react";
import ContactForm from "../components/contact/ContactForm";
import FbPage from "../components/contact/FbPage";
import Map from "../components/contact/Map";
import Head from "next/head";

export default function Contact() {
  return (
    <>
      <Head>
        <title>Kontakt</title>
        <meta
          name="description"
          content="Deratex Zakład DDD Tuchola - deratyzacja (odszczurzanie), dezynsekcja (odrobaczanie), dezynfekcja. Gazowanie zbóż, silosów. Usuwanie os, szerszeni, kretów."
        />
        <meta
          name="keywords"
          content="deratyzacja, odszczurzanie, dezynsekcja, odrobaczanie, dezynfekcja, gazowanie, tuchola"
        />
        <meta property="og:title" content="DDD Deratex"></meta>
        <meta property="og:type" content="website"></meta>
      </Head>
      <Map />
      <div className={classNames(styles.gridContainer, "innerContentWidth")}>
        <ContactForm />

        <FbPage />
      </div>
    </>
  );
}
