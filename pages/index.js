
import React, { useState } from "react";
import AboutUs from "../components/index/AboutUs";
import OfferFor from "../components/index/OfferFor";
import HelpForAllSlogan from "../components/index/HelpForAllSlogan";
import Cooperation from "../components/index/Cooperation";
import OurGuarantee from "../components/index/OurGuarantee";
import Certificates from "../components/index/Certificates";

import Reviews from "../components/index/Reviews";
import Slider from "../components/slider/Slider";
import { SliderData } from "../components/slider/SliderData";
import classNames from "classnames";
import ServicesShort from "../components/index/ServicesShort";
import Head from "next/head";





export default function Home() {
  return (
 <>
  <Head>
      <title>Strona główna</title>
      <meta name='description' content='I hope this tutorial is helpful for you' />
    </Head>
      <Slider slides={SliderData} />
      <div>
        <h1  className={classNames("mainTitle")}>
          {`Zakład Deratyzacji, Dezynfekcji i Dezynsekcji "DERATEX"`}
        </h1>
      </div>

      <AboutUs />
      <ServicesShort />
      <OfferFor />
      <HelpForAllSlogan />
      <Cooperation />
      <OurGuarantee />
      <Certificates />
      <Reviews />
      {/* <Gallery/> */}







 </>
  );
}
