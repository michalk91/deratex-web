import Image from "next/image";
import styles from "./otherServices.module.css";
import classNames from "classnames";
import { memo, useRef } from "react";
import useInViewAnimation from "../../hooks/useInViewAnimation";

function OtherServices() {
  const containerRef = useRef();
  const { animate } = useInViewAnimation({ animateContainerRef: containerRef });
  return (
    <>
      <div className={classNames("innerContentWidth")}>
        <span className={classNames("title", styles.underline)}>
          Nasze usługi obejmuja:
        </span>
        <ul
          ref={containerRef}
          className={classNames(styles.textContainer, { ["fade-in"]: animate })}
        >
          <li>
            Dokumentacje dla potrzeb systemu HACCP, GMP, GHP (program,
            procedury, raporty, wykresy, instrukcje).
          </li>
          <li>
            Wykonywanie inspekcji zerowych (audyt) w obiektach wdrażajacych
            system jakosci HACCP pod katem opracowania procedur dla programu
            ochrony przed szkodnikami.
          </li>
          <li>
            Doradztwo techniczne z zakresu gryzonioszczelności,
            insektoszczelności , ptakoszczelności.
          </li>
          <li>
            Montaż obsługa bieżaca urzadzeń do monitoringu gryzoni i owadów w
            obiekcie.
          </li>
          <li>Dezynfekcja, ozonowanie, dezodoracja pomieszczeń po zmarłych.</li>
          <li>Zwalczanie szkodników maczno zbożowych (silosy gazowanie).</li>
          <li>Dezynsekcje elewatorów, silosów i młynów.</li>
          <li>Gazowanie zboża w silosach.</li>
          <li>
            Dezynfekcja samochodów wykorzystywanych do przewozu srodków
            spożywczych.
          </li>
          <li>Ozonowanie pomieszczeń, lokali po pożarach.</li>
          <li>Odstraszanie kretów.</li>
          <li>Usuwanie gniazd os i szerszeni – skuteczność 100%.</li>
        </ul>

        <div className={styles.imgContainer}>
          <Image
            src="/images/services/OtherServices/pestcontrol.jpg"
            alt="kontrola zywnosci"
            width={0}
            height={0}
            sizes="(max-width: 1200px) 100vw, 80vw"
          />
          <a
            className="caption"
            href="https://www.freepik.com/free-vector/isometric-pest-control-service-house-disinfection-infographics-with-workers-insects-rodents-3d-vector-illustration_34481859.htm#query=pest%20control&position=1&from_view=search&track=sph"
          >
            Image by macrovector on Freepik
          </a>
        </div>
      </div>
    </>
  );
}
export default memo(OtherServices);
