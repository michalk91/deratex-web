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
      <meta name='description' content='I hope this tutorial is helpful for you' />
    </Head>
      <MainServices />
      <Protection />
      <Gallery />
      <OtherServices/>
      <ReferenceLetters />
      <Quality />

    </>
  );
}
