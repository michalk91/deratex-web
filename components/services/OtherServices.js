import Image from "next/image";
import styles from "./otherServices.module.css";
import classNames from "classnames";
import { memo, useRef } from "react";
import useInViewAnimation from "../../hooks/useInViewAnimation";
import { FiCheck } from "react-icons/fi";
import pestcontrol from "/public/images/services/OtherServices/pestcontrol.png";

const SERVICES = [
  "Dokumentacja dla potrzeb systemów HACCP, GMP, GHP (program, procedury, raporty, wykresy, instrukcje).",
  "Inspekcje zerowe (audyt) w obiektach wdrażających system jakości HACCP pod kątem opracowania procedur dla programu ochrony przed szkodnikami.",
  "Doradztwo techniczne z zakresu gryzonioszczelności, insektoszczelności i ptakoszczelności.",
  "Montaż i bieżąca obsługa urządzeń do monitoringu gryzoni i owadów w obiekcie.",
  "Dezynfekcja, ozonowanie i dezodoracja pomieszczeń po zmarłych.",
  "Zwalczanie szkodników mączno-zbożowych (gazowanie silosów).",
  "Dezynsekcja elewatorów, silosów i młynów.",
  "Gazowanie zboża w silosach.",
  "Dezynfekcja samochodów wykorzystywanych do przewozu środków spożywczych.",
  "Ozonowanie pomieszczeń i lokali po pożarach.",
  "Odstraszanie kretów.",
  "Usuwanie gniazd os i szerszeni – skuteczność 100%.",
];

function OtherServices() {
  const containerRef = useRef();
  const { animate } = useInViewAnimation({ animateContainerRef: containerRef });
  return (
    <>
      <div className={classNames("innerContentWidth")}>
        <div className={styles.layout}>
          <div className={styles.imgContainer}>
            <Image
              src={pestcontrol}
              alt="Kontrola żywności"
              placeholder="blur"
              sizes="(max-width: 850px) 100vw, 40vw"
            />
          </div>
          <div>
            <h2
              className={classNames("title", "accent-underline", styles.title)}
            >
              Nasze usługi obejmują:
            </h2>
            <ul
              ref={containerRef}
              className={classNames(styles.servicesList, {
                ["fade-in"]: animate,
              })}
            >
              {SERVICES.map((service) => (
                <li key={service} className={styles.serviceItem}>
                  <span className={styles.checkIcon} aria-hidden>
                    <FiCheck />
                  </span>
                  {service}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
export default memo(OtherServices);
