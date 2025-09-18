import Image from "next/image";
import styles from "./mainServices.module.css";
import classNames from "classnames";
import { memo, useRef } from "react";
import useInViewAnimation from "../../hooks/useInViewAnimation";
import { outfitBolder } from "../../fonts/fonts";
import rat from "/public/images/services/MainServices/rat.png";
import insect from "/public/images/services/MainServices/insect.png";
import moth from "/public/images/services/MainServices/moth.png";
import ozonowanieImg from "/public/images/services/MainServices/ozonowanie.png";
import fumigation from "/public/images/services/MainServices/fumigation.png";
import woodpests from "/public/images/services/MainServices/woodpests.png";

function MainServices() {
  const items = [
    {
      src: rat,
      alt: "deratyzacja, szczur",
      title: "deratyzacja",
      captionText: null,
      imgAuthorHref: null,
      text: 'Inaczej "odszczurzanie" to ograniczenie populacji wszelkich gryzoni w obiektach i poza nimi.',
      bgColorClass: "yellowBG",
    },
    {
      src: insect,
      alt: "dezynsekcja, robak",
      title: "dezynsekcja",
      captionText: null,
      imgAuthorHref: null,
      text: 'Inaczej "odrobaczanie" to wszelkiego rodzaju metody i działania, które ograniczaja, tępia owady.',
      bgColorClass: "greenBG",
    },
    {
      src: moth,
      alt: "dezynfekcja, mól",
      title: "dezynfekcja",
      captionText: null,
      imgAuthorHref: null,
      text: "Jest to zakres działań majacych na celu zmniejszenie drobnoustrojów, bakterii, wirusów, grzybów chorobotwórczych z przedmiotów i pomieszczeń.",
      bgColorClass: "blueBG",
    },
    {
      src: ozonowanieImg,
      alt: "ozonowanie, ozon",
      title: "ozonowanie",
      text: "To metoda dezynfekcji(dezodoryzacji) bez użycia srodków chemicznych gdzie czynnikiem biobójczym jest ozon, gaz o silnych właściwościach utleniajacych.",
      bgColorClass: "grayBG",
    },
    {
      src: fumigation,
      alt: "fumigacja",
      title: "fumigacja",
      captionText: null,
      imgAuthorHref: null,
      text: "To metoda zwalczania owadów, gryzoni za pomoca srodków chemicznych w formie dymu pary, gazu. Substancje te nazywamy fumigantami.",
      bgColorClass: "redBG",
    },
    {
      src: woodpests,
      alt: "fumigacja",
      title: "Zwalczanie szkodników drewna wyrobionego",
      captionText: null,
      imgAuthorHref: null,
      text: "Więźba dachowa",
      bgColorClass: "brownBG",
    },
  ];

  const containerRef = useRef();

  const { animate } = useInViewAnimation({
    animateContainerRef: containerRef,
    sensivity: 0,
    mobileSensivity: 0,
  });

  return (
    <div className={styles.wrapper} ref={containerRef}>
      {items.map((item, index) => (
        <div key={index} className={classNames(`${styles[item.bgColorClass]}`)}>
          <div className={classNames("innerContentWidth")}>
            <div
              className={classNames(styles.serviceRowContainer, {
                [styles.shiftedToRight]: index % 2 === 0,
                [styles.shiftedToLeft]: index % 2 !== 0,
                ["fade-in"]: animate,
              })}
            >
              <div
                className={classNames(styles.imageContainer, {
                  [styles.orderZero]: index % 2 === 0,
                  [styles.orderOne]: index % 2 !== 0,
                })}
              >
                <Image
                  width={0}
                  height={0}
                  placeholder="blur"
                  sizes="(max-width: 280px) 100vw, (max-width: 1030px) 20vw, 15vw"
                  src={item.src}
                  alt={item.alt}
                  priority={true}
                />

                <div className="captionContainer">
                  {item.imgAuthorHref && item.captionText && (
                    <a className="caption" href={item.imgAuthorHref}>
                      {item.captionText}
                    </a>
                  )}
                </div>
              </div>

              <div className={styles.textContainer}>
                <p className={classNames(styles.title, outfitBolder.className)}>
                  {item.title}
                </p>
                <p className={styles.text}>{item.text}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
export default memo(MainServices);
