import Image from "next/image";
import styles from "./mainServices.module.css";
import classNames from "classnames";
import { memo, useRef } from "react";
import useInViewAnimation from "../../hooks/useInViewAnimation";
import { outfitBolder } from "../../fonts/fonts";

function MainServices() {
  const items = [
    {
      src: "/images/services/MainServices/rat.png",
      alt: "deratyzacja, szczur",
      title: "deratyzacja",
      captionText: "Image by macrovector on Freepik",
      imgAuthorHref:
        "https://www.freepik.com/free-vector/insecticides-illustration-set_16027923.htm#query=rats&position=26&from_view=search&track=sph",
      text: 'Inaczej "odszczurzanie" to ograniczenie populacji wszelkich gryzoni w obiektach i poza nimi.',
      bgColorClass: "yellowBG",
    },
    {
      src: "/images/services/MainServices/insect.png",
      alt: "dezynsekcja, robak",
      title: "dezynsekcja",
      captionText: "Image by macrovector on Freepik",
      imgAuthorHref:
        "https://www.freepik.com/free-vector/insecticides-illustration-set_16027923.htm#query=rats&position=26&from_view=search&track=sph",
      text: 'Inaczej "odrobaczanie" to wszelkiego rodzaju metody i działania, które ograniczaja, tępia owady.',
      bgColorClass: "greenBG",
    },
    {
      src: "/images/services/MainServices/moth.png",
      alt: "dezynfekcja, mól",
      title: "dezynfekcja",
      captionText: "Image by macrovector on Freepik",
      imgAuthorHref:
        "https://www.freepik.com/free-vector/insecticides-illustration-set_16027923.htm#query=rats&position=26&from_view=search&track=sph",
      text: "Jest to zakres działań majacych na celu zmniejszenie drobnoustrojów, bakterii, wirusów, grzybów chorobotwórczych z przedmiotów i pomieszczeń.",
      bgColorClass: "blueBG",
    },
    {
      src: "/images/services/MainServices/ozonowanie.png",
      alt: "ozonowanie, ozon",
      title: "ozonowanie",
      text: "To metoda dezynfekcji(dezodoryzacji) bez użycia srodków chemicznych gdzie czynnikiem biobójczym jest ozon, gaz o silnych właściwościach utleniajacych.",
      bgColorClass: "grayBG",
    },
    {
      src: "/images/services/MainServices/fumigation.png",
      alt: "fumigacja",
      title: "fumigacja",
      captionText: "Image by storyset on Freepik",
      imgAuthorHref:
        "https://www.freepik.com/free-vector/virus-disinfection-concept-illustration_7709386.htm#query=pest%20control&position=12&from_view=search&track=sph",
      text: "To metoda zwalczania owadów, gryzoni za pomoca srodków chemicznych w formie dymu pary, gazu. Substancje te nazywamy fumigantami.",
      bgColorClass: "redBG",
    },
    {
      src: "/images/services/MainServices/woodpests.png",
      alt: "fumigacja",
      title: "Zwalczanie szkodników drewna wyrobionego",
      captionText: "Image by brgfx on Freepik",
      imgAuthorHref:
        "https://www.freepik.com/free-vector/centipede-wood-white-background_2590722.htm#query=wood%20pests&position=49&from_view=search&track=sph",
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
