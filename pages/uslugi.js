import Head from "next/head";
import MainServices from "../components/services/MainServices";
import Protection from "../components/services/Protection";
import OtherServices from "../components/services/OtherServices";
import Gallery from "../components/services/Gallery";
import ReferenceLetters from "../components/services/ReferenceLetters";
import Quality from "../components/services/Quality";

export default function Services() {
  return (
    <>
      <Head>
        <title>Usługi</title>
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
      <MainServices />
      <Protection />
      <Gallery />
      <OtherServices />
      <ReferenceLetters />
      <Quality />
    </>
  );
}
