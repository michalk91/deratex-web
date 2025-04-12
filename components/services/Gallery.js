import React from "react";
import RichLightboxGallery from "../lightboxGallery/RichLightboxGallery";
import { memo, useState, useRef } from "react";
import styles from "./gallery.module.css";
import classNames from "classnames";

function Gallery() {
  const images = [
    {
      src: "/images/services/gallery/image-1.jpg",
      alt: "Dezynsekcja przygotowanie zboża do fumigacji w magazynie płaskim.",
      caption:
        "Dezynsekcja przygotowanie zboża do fumigacji w magazynie płaskim.",
      width: 1368,
      height: 1824,
    },
    {
      src: "/images/services/gallery/image-2.jpg",
      alt: "Fumigacja zboza w magazynie płaskim.",
      caption: "Fumigacja zboza w magazynie płaskim.",
      width: 1368,
      height: 1824,
    },
    {
      src: "/images/services/gallery/image-3.jpg",
      alt: "Fumigacja zboza w magazynie plaskim.",
      caption: "Fumigacja zboza w magazynie plaskim.",
      width: 1368,
      height: 1824,
    },
    {
      src: "/images/services/gallery/image-4.jpg",
      alt: "Odkomarzanie terenów zielonych.",
      caption: "Odkomarzanie terenów zielonych.",
      width: 1368,
      height: 1824,
    },
    {
      src: "/images/services/gallery/image-5.jpg",
      alt: "Odkomarzanie terenów zielonych.",
      caption: "Odkomarzanie terenów zielonych.",
      width: 1368,
      height: 1824,
    },
    {
      src: "/images/services/gallery/image-6.jpg",
      alt: "Odkomarzanie terenów zielonych.",
      caption: "Odkomarzanie terenów zielonych.",
      width: 1368,
      height: 1824,
    },
    {
      src: "/images/services/gallery/image-7.jpg",
      alt: "Odkomarzanie terenów zielonych.",
      caption: "Odkomarzanie terenów zielonych.",
      width: 1368,
      height: 1824,
    },
    {
      src: "/images/services/gallery/image-8.jpg",
      alt: "Działanie środka owadobójczego i penetracja w drewnie wyrobionym na szkodniki drewna takie jak spuszczel pospolity, kołatek domowy i inne.",
      caption:
        "Działanie środka owadobójczego i penetracja w drewnie wyrobionym na szkodniki drewna takie jak spuszczel pospolity, kołatek domowy i inne.",
      width: 1385,
      height: 1041,
    },
    {
      src: "/images/services/gallery/image-9.jpg",
      alt: "Dezynsekcja na szkodniki drewna wyrobionego (wieżba dachowa), inne.",
      caption:
        "Dezynsekcja na szkodniki drewna wyrobionego (wieżba dachowa), inne.",
      width: 1385,
      height: 1041,
    },
    {
      src: "/images/services/gallery/image-10.jpg",
      alt: "Dezynsekcja zamgławianie hali przeciwko omacnicy spichrzanki.",
      caption: "Dezynsekcja zamgławianie hali przeciwko omacnicy spichrzanki.",
      width: 1385,
      height: 1041,
    },
    {
      src: "/images/services/gallery/image-11.jpg",
      alt: "Dezynsekcja zamgławianie hali przeciwko omacnicy spichrzanki.",
      caption: "Dezynsekcja zamgławianie hali przeciwko omacnicy spichrzanki.",
      width: 1387,
      height: 1849,
    },
    {
      src: "/images/services/gallery/image-12.jpg",
      alt: "Dezynsekcja zamgławianie hali przeciwko omacnicy spichrzanki.",
      caption: "Dezynsekcja zamgławianie hali przeciwko omacnicy spichrzanki.",
      width: 1387,
      height: 1849,
    },
    {
      src: "/images/services/gallery/image-13.jpg",
      alt: "Dezynsekcja zamgławianie hali przeciwko omacnicy spichrzanki.",
      caption: "Dezynsekcja zamgławianie hali przeciwko omacnicy spichrzanki.",
      width: 1385,
      height: 1041,
    },
    {
      src: "/images/services/gallery/image-14.jpg",
      alt: "Dezynsekcja zamgławianie hali przeciwko omacnicy spichrzanki.",
      caption: "Dezynsekcja zamgławianie hali przeciwko omacnicy spichrzanki.",
      width: 1385,
      height: 1041,
    },
    {
      src: "/images/services/gallery/image-15.jpg",
      alt: "Dezynsekcja młyna przeciwko szkodnikom magazynowym.",
      caption: "Dezynsekcja młyna przeciwko szkodnikom magazynowym.",
      width: 1385,
      height: 1041,
    },
    {
      src: "/images/services/gallery/image-16.jpg",
      alt: "Likwidacja gniazda os w dachu z trzciny.",
      caption: "Likwidacja gniazda os w dachu z trzciny.",
      width: 1385,
      height: 1041,
    },
    {
      src: "/images/services/gallery/image-17.jpg",
      alt: "Usuwanie gniazda szerszeni z elewacji budynku.",
      caption: "Usuwanie gniazda szerszeni z elewacji budynku.",
      width: 1385,
      height: 1041,
    },
    {
      src: "/images/services/gallery/image-18.jpg",
      alt: "Likwidacja dezynsekcja mrówek ogrodowych i faraona.",
      caption: "Likwidacja dezynsekcja mrówek ogrodowych i faraona.",
      width: 1280,
      height: 960,
    },
    {
      src: "/images/services/gallery/image-19.jpg",
      alt: "Dezynsekcja fumigacja ziarna w silosach przeciwko wołek zbozowy.",
      caption:
        "Dezynsekcja fumigacja ziarna w silosach przeciwko wołek zbozowy.",
      width: 1385,
      height: 1041,
    },
    {
      src: "/images/services/gallery/image-20.jpg",
      alt: "Dezynsekcja fumigacja ziarna w silosach przeciwko wołek zbozowy.",
      caption:
        "Dezynsekcja fumigacja ziarna w silosach przeciwko wołek zbozowy.",
      width: 1385,
      height: 1041,
    },
    {
      src: "/images/services/gallery/image-21.jpg",
      alt: "Szkodnik magazynowy wołek zbożowy.",
      caption: "Szkodnik magazynowy wołek zbożowy.",
      width: 1385,
      height: 1041,
    },
    {
      src: "/images/services/gallery/image-22.jpg",
      alt: "Dezynsekcja fumigacja ziarna w silosach przeciwko wołek zbozowy.",
      caption:
        "Dezynsekcja fumigacja ziarna w silosach przeciwko wołek zbozowy.",
      width: 1385,
      height: 1041,
    },
    {
      src: "/images/services/gallery/image-23.jpg",
      alt: "Dezynfekcja kościoła SARS COVID 19.",
      caption: "Dezynfekcja kościoła SARS COVID 19.",
      width: 544,
      height: 725,
    },
    {
      src: "/images/services/gallery/image-24.jpg",
      alt: "Dezynfekcja przy uzyciu Ozonu likwidacja przykrych zapachów.",
      caption: "Dezynfekcja przy uzyciu Ozonu likwidacja przykrych zapachów.",
      width: 1459,
      height: 1094,
    },
    {
      src: "/images/services/gallery/image-25.jpg",
      alt: "Ozonowanie pomieszczeń.",
      caption: "Ozonowanie pomieszczeń.",
      width: 1387,
      height: 1040,
    },
    {
      src: "/images/services/gallery/image-26.jpg",
      alt: "Ozonowanie kuchni.",
      caption: "Ozonowanie kuchni.",
      width: 1385,
      height: 1039,
    },
    {
      src: "/images/services/gallery/image-27.jpg",
      alt: "Dezynsekcja przeciwko szkodnikom drewna wyrobionego: spuszczel pospolity, kołatek domowy i inne",
      caption:
        "Dezynsekcja przeciwko szkodnikom drewna wyrobionego: spuszczel pospolity, kołatek domowy i inne",
      width: 1387,
      height: 1849,
    },
    {
      src: "/images/services/gallery/image-28.jpg",
      alt: "Srodek owadobójczy w formie zelu do aplikacji na szkodniki drewna wyrobionego. Numer partii oraz termin ważności produktu i objętość.",
      caption:
        "Srodek owadobójczy w formie zelu do aplikacji na szkodniki drewna wyrobionego. Numer partii oraz termin ważności produktu i objętość.",
      width: 1387,
      height: 1849,
    },
    {
      src: "/images/services/gallery/image-29.jpg",
      alt: "Szczelne opakowanie z plomba zabezpieczającą otwarcie wiaderka.",
      caption:
        "Szczelne opakowanie z plomba zabezpieczającą otwarcie wiaderka.",
      width: 1387,
      height: 1849,
    },
    {
      src: "/images/services/gallery/image-30.jpg",
      alt: "Przygotowanie środka do użytku przez agregat do natrysku.",
      caption: "Przygotowanie środka do użytku przez agregat do natrysku.",
      width: 1387,
      height: 1849,
    },
    {
      src: "/images/services/gallery/image-31.jpg",
      alt: "Przygotowanie logistyczne operatora agregatu natryskowego.",
      caption: "Przygotowanie logistyczne operatora agregatu natryskowego.",
      width: 1387,
      height: 1849,
    },
    {
      src: "/images/services/gallery/image-32.jpg",
      alt: "Nielegalne wysypisko śmieci o powierzchni około 1ha. Dezynsekcja przeciwko karaluchom, prusakom które w sezonie letnim potrafiły rozejść się z wysypiska śmieci w poszukiwaniu pokarmu w promieniu kilometra do innych zakładów sąsiadujących z nielegalnym wysypiskiem śmieci. Jedna z hałd w której w masowej ilości zawierała prusaki i karaluchy.",
      caption:
        "Nielegalne wysypisko śmieci o powierzchni około 1ha. Dezynsekcja przeciwko karaluchom, prusakom które w sezonie letnim potrafiły rozejść się z wysypiska śmieci w poszukiwaniu pokarmu w promieniu kilometra do innych zakładów sąsiadujących z nielegalnym wysypiskiem śmieci. Jedna z hałd w której w masowej ilości zawierała prusaki i karaluchy.",
      width: 1387,
      height: 1849,
    },
    {
      src: "/images/services/gallery/image-33.jpg",
      alt: "Wąskie przejazdy dla aut ciężarowych przywożących śmieci.",
      caption: "Wąskie przejazdy dla aut ciężarowych przywożących śmieci.",
      width: 1387,
      height: 1849,
    },
    {
      src: "/images/services/gallery/image-34.jpg",
      alt: "Wnętrze hali wypełnione po dach odpadami w której żyją karaluchy.",
      caption:
        "Wnętrze hali wypełnione po dach odpadami w której żyją karaluchy.",
      width: 1387,
      height: 1849,
    },
    {
      src: "/images/services/gallery/image-35.jpg",
      alt: "Obraz ilości składowanych śmieci bez żadnego porządku.",
      caption: "Obraz ilości składowanych śmieci bez żadnego porządku.",
      width: 1387,
      height: 1849,
    },
    {
      src: "/images/services/gallery/image-36.jpg",
      alt: "Na podłodze przed śmieciami brązowe kropki to efekt dezynsekcji martwe karaluchy.",
      caption:
        "Na podłodze przed śmieciami brązowe kropki to efekt dezynsekcji martwe karaluchy.",
      width: 1387,
      height: 1849,
    },
    {
      src: "/images/services/gallery/image-37.jpg",
      alt: "Widok hali załadowanej po brzegi śmieciami z przodu budynku oraz to co znajdowało się około 4 metrów przed budynkiem. Karaluchy biegały sobie do budynku i z powrotem.",
      caption:
        "Widok hali załadowanej po brzegi śmieciami z przodu budynku oraz to co znajdowało się około 4 metrów przed budynkiem. Karaluchy biegały sobie do budynku i z powrotem.",
      width: 1387,
      height: 1849,
    },
    {
      src: "/images/services/gallery/image-38.jpg",
      alt: "Jedna z części hali w której robactwa było trochę mniej.",
      caption: "Jedna z części hali w której robactwa było trochę mniej.",
      width: 1387,
      height: 1849,
    },
    {
      src: "/images/services/gallery/image-39.jpg",
      alt: "Tutaj niestety karaluchy rządziły.",
      caption: "Tutaj niestety karaluchy rządziły.",
      width: 1387,
      height: 1849,
    },
    {
      src: "/images/services/gallery/image-40.jpg",
      alt: "Jeden z boksów w budynku gdzie było ich najwięcej.",
      caption: "Jeden z boksów w budynku gdzie było ich najwięcej.",
      width: 1387,
      height: 1849,
    },
    {
      src: "/images/services/gallery/image-41.jpg",
      alt: "Te ciemne okruchy na podłodze to hordy martwych owadów.",
      caption: "Te ciemne okruchy na podłodze to hordy martwych owadów.",
      width: 1387,
      height: 1849,
    },
    {
      src: "/images/services/gallery/image-42.jpg",
      alt: "Tutaj bardzo dobrze widać ilość martwych owadów na podłodze i skala zjawiska zasiedlenia nielegalnego wysypiska śmieci przez karaluchy z jaka przyszło nam się mierzyć. Można powiedzieć „plagi egipskie.”",
      caption:
        "Tutaj bardzo dobrze widać ilość martwych owadów na podłodze i skala zjawiska zasiedlenia nielegalnego wysypiska śmieci przez karaluchy z jaka przyszło nam się mierzyć. Można powiedzieć „plagi egipskie.”",
      width: 1387,
      height: 1849,
    },
    {
      src: "/images/services/gallery/image-43.jpg",
      alt: "Tu również z martwych owadów brązowy dywanik się ścielę.",
      caption: "Tu również z martwych owadów brązowy dywanik się ścielę.",
      width: 1387,
      height: 1849,
    },
    {
      src: "/images/services/gallery/image-44.jpg",
      alt: "Tutaj również brązowy dywanik z martwych owadów. Bardzo lubiły schować się w odpadach styropianu dlaczego?...ciepło.",
      caption:
        "Tutaj również brązowy dywanik z martwych owadów. Bardzo lubiły schować się w odpadach styropianu dlaczego?...ciepło.",
      width: 1387,
      height: 1849,
    },
    {
      src: "/images/services/gallery/image-45.jpg",
      alt: "Tutaj przy dużym zbliżeniu zdjęcia ujrzeć można pojedyncze osobniki.",
      caption:
        "Tutaj przy dużym zbliżeniu zdjęcia ujrzeć można pojedyncze osobniki.",
      width: 1387,
      height: 1849,
    },
    {
      src: "/images/services/gallery/image-46.jpg",
      alt: "Owady martwe bardziej widoczne są na podłodze jasnej. Zdjęcie z dyżurki pomieszczenia również opanowanego przez karaluchy.",
      caption:
        "Owady martwe bardziej widoczne są na podłodze jasnej. Zdjęcie z dyżurki pomieszczenia również opanowanego przez karaluchy.",
      width: 1387,
      height: 1849,
    },
    {
      src: "/images/services/gallery/image-47.jpg",
      alt: "Brązowe rodzynki porozrzucane niestety nie to martwe karaluchy po zabiegu dezynsekcji.",
      caption:
        "Brązowe rodzynki porozrzucane niestety nie to martwe karaluchy po zabiegu dezynsekcji.",
      width: 1387,
      height: 1849,
    },
    {
      src: "/images/services/gallery/image-48.jpg",
      alt: "Tu również sporo zostało porażonych środkiem owadobójczym.",
      caption: "Tu również sporo zostało porażonych środkiem owadobójczym.",
      width: 1387,
      height: 1849,
    },
    {
      src: "/images/services/gallery/image-49.jpg",
      alt: "Sprzątania co nie mara ale efekt założony dezynsekcji jest.",
      caption: "Sprzątania co nie mara ale efekt założony dezynsekcji jest.",
      width: 1387,
      height: 1849,
    },
    {
      src: "/images/services/gallery/image_50.jpg",
      alt: "Podczas działań dezynsekcyjnych przeprowadzonych również na hałdach śmieci zauważyliśmy inny akcent. Mimo nie sprzyjających warunków rozwojowych pomidor koktajlowy wyrósł sobie",
      caption:
        "Podczas działań dezynsekcyjnych przeprowadzonych również na hałdach śmieci zauważyliśmy inny akcent. Mimo nie sprzyjających warunków rozwojowych pomidor koktajlowy wyrósł sobie",
      width: 1387,
      height: 1849,
    },
    {
      src: "/images/services/gallery/image_51.jpg",
      alt: "Tutaj widać bardziej jak pomidor próbuje wspinać się do góry i na bok szukając podpórki do rozrostu krzewu.",
      caption:
        "Tutaj widać bardziej jak pomidor próbuje wspinać się do góry i na bok szukając podpórki do rozrostu krzewu.",
      width: 1387,
      height: 1849,
    },
    {
      src: "/images/services/gallery/image_52.jpg",
      alt: "W przybliżeniu ładny pomidorek. Najwidoczniej nie apetyczny dla karaluchów.",
      caption:
        "W przybliżeniu ładny pomidorek. Najwidoczniej nie apetyczny dla karaluchów.",
      width: 1387,
      height: 1849,
    },
  ];

  const [showAll, setShowAll] = useState(false);
  const galleryRef = useRef(null);

  const toggleImages = () => {
    setShowAll((prevState) => {
      const newState = !prevState;
      if (!newState && galleryRef.current) {
        galleryRef.current.scrollIntoView({  behavior: 'smooth', block:'start' });
      }
      return newState;
    });
  };

  const imagesToDisplay = showAll ? images : images.slice(0, 14);

  return (
    <>
      <section className={styles.galleryOuterContainer} ref={galleryRef}>
        <span className={classNames("title")}>Galeria</span>
        <div className={classNames("graySection")}>
          <RichLightboxGallery
            virtualized
            key={imagesToDisplay.length}
            items={imagesToDisplay}
            imgContainerClassName={styles.imgContainer}
            lightboxContainerClassName={classNames(
              styles.container,
              "innerContentWidth"
            )}
            thumbnailWithBorderRadius
          />
               <button
        onClick={toggleImages}
        className={classNames(styles.toggleButton)}
      >
         <span className={styles.arrow}>{showAll ? "▲ Zamknij galerię" : "▼ Zobacz cała galerię"}</span>
      </button>
        </div>
   
      </section>
    </>
  );
}

export default memo(Gallery);
