import RichLightboxGallery from "../lightboxGallery/RichLightboxGallery";
import { memo, useState, useRef } from "react";
import styles from "./gallery.module.css";
import classNames from "classnames";
import image1 from "/public/images/services/gallery/image-1.jpg";
import image2 from "/public/images/services/gallery/image-2.jpg";
import image3 from "/public/images/services/gallery/image-3.jpg";
import image4 from "/public/images/services/gallery/image-4.jpg";
import image5 from "/public/images/services/gallery/image-5.jpg";
import image6 from "/public/images/services/gallery/image-6.jpg";
import image7 from "/public/images/services/gallery/image-7.jpg";
import image8 from "/public/images/services/gallery/image-8.jpg";
import image9 from "/public/images/services/gallery/image-9.jpg";
import image10 from "/public/images/services/gallery/image-10.jpg";
import image11 from "/public/images/services/gallery/image-11.jpg";
import image12 from "/public/images/services/gallery/image-12.jpg";
import image13 from "/public/images/services/gallery/image-13.jpg";
import image14 from "/public/images/services/gallery/image-14.jpg";
import image15 from "/public/images/services/gallery/image-15.jpg";
import image16 from "/public/images/services/gallery/image-16.jpg";
import image17 from "/public/images/services/gallery/image-17.jpg";
import image18 from "/public/images/services/gallery/image-18.jpg";
import image19 from "/public/images/services/gallery/image-19.jpg";
import image20 from "/public/images/services/gallery/image-20.jpg";
import image21 from "/public/images/services/gallery/image-21.jpg";
import image22 from "/public/images/services/gallery/image-22.jpg";
import image23 from "/public/images/services/gallery/image-23.jpg";
import image24 from "/public/images/services/gallery/image-24.jpg";
import image25 from "/public/images/services/gallery/image-25.jpg";
import image26 from "/public/images/services/gallery/image-26.jpg";
import image27 from "/public/images/services/gallery/image-27.jpg";
import image28 from "/public/images/services/gallery/image-28.jpg";
import image29 from "/public/images/services/gallery/image-29.jpg";
import image30 from "/public/images/services/gallery/image-30.jpg";
import image31 from "/public/images/services/gallery/image-31.jpg";
import image32 from "/public/images/services/gallery/image-32.jpg";
import image33 from "/public/images/services/gallery/image-33.jpg";
import image34 from "/public/images/services/gallery/image-34.jpg";
import image35 from "/public/images/services/gallery/image-35.jpg";
import image36 from "/public/images/services/gallery/image-36.jpg";
import image37 from "/public/images/services/gallery/image-37.jpg";
import image38 from "/public/images/services/gallery/image-38.jpg";
import image39 from "/public/images/services/gallery/image-39.jpg";
import image40 from "/public/images/services/gallery/image-40.jpg";
import image41 from "/public/images/services/gallery/image-41.jpg";
import image42 from "/public/images/services/gallery/image-42.jpg";
import image43 from "/public/images/services/gallery/image-43.jpg";
import image44 from "/public/images/services/gallery/image-44.jpg";
import image45 from "/public/images/services/gallery/image-45.jpg";
import image46 from "/public/images/services/gallery/image-46.jpg";
import image47 from "/public/images/services/gallery/image-47.jpg";
import image48 from "/public/images/services/gallery/image-48.jpg";
import image49 from "/public/images/services/gallery/image-49.jpg";
import image50 from "/public/images/services/gallery/image_50.jpg";
import image51 from "/public/images/services/gallery/image_51.jpg";
import image52 from "/public/images/services/gallery/image_52.jpg";

function Gallery() {
  const images = [
  { src: image1, alt: "Dezynsekcja przygotowanie zboża do fumigacji w magazynie płaskim.", caption: "Dezynsekcja przygotowanie zboża do fumigacji w magazynie płaskim.", width: 1368, height: 1824 },
  { src: image2, alt: "Fumigacja zboza w magazynie płaskim.", caption: "Fumigacja zboza w magazynie płaskim.", width: 1368, height: 1824 },
  { src: image3, alt: "Fumigacja zboza w magazynie plaskim.", caption: "Fumigacja zboza w magazynie plaskim.", width: 1368, height: 1824 },
  { src: image4, alt: "Odkomarzanie terenów zielonych.", caption: "Odkomarzanie terenów zielonych.", width: 1368, height: 1824 },
  { src: image5, alt: "Odkomarzanie terenów zielonych.", caption: "Odkomarzanie terenów zielonych.", width: 1368, height: 1824 },
  { src: image6, alt: "Odkomarzanie terenów zielonych.", caption: "Odkomarzanie terenów zielonych.", width: 1368, height: 1824 },
  { src: image7, alt: "Odkomarzanie terenów zielonych.", caption: "Odkomarzanie terenów zielonych.", width: 1368, height: 1824 },
  { src: image8, alt: "Działanie środka owadobójczego i penetracja w drewnie wyrobionym na szkodniki drewna takie jak spuszczel pospolity, kołatek domowy i inne.", caption: "Działanie środka owadobójczego i penetracja w drewnie wyrobionym na szkodniki drewna takie jak spuszczel pospolity, kołatek domowy i inne.", width: 1385, height: 1041 },
  { src: image9, alt: "Dezynsekcja na szkodniki drewna wyrobionego (wieżba dachowa), inne.", caption: "Dezynsekcja na szkodniki drewna wyrobionego (wieżba dachowa), inne.", width: 1385, height: 1041 },
  { src: image10, alt: "Dezynsekcja zamgławianie hali przeciwko omacnicy spichrzanki.", caption: "Dezynsekcja zamgławianie hali przeciwko omacnicy spichrzanki.", width: 1385, height: 1041 },
  { src: image11, alt: "Dezynsekcja zamgławianie hali przeciwko omacnicy spichrzanki.", caption: "Dezynsekcja zamgławianie hali przeciwko omacnicy spichrzanki.", width: 1387, height: 1849 },
  { src: image12, alt: "Dezynsekcja zamgławianie hali przeciwko omacnicy spichrzanki.", caption: "Dezynsekcja zamgławianie hali przeciwko omacnicy spichrzanki.", width: 1387, height: 1849 },
  { src: image13, alt: "Dezynsekcja zamgławianie hali przeciwko omacnicy spichrzanki.", caption: "Dezynsekcja zamgławianie hali przeciwko omacnicy spichrzanki.", width: 1385, height: 1041 },
  { src: image14, alt: "Dezynsekcja zamgławianie hali przeciwko omacnicy spichrzanki.", caption: "Dezynsekcja zamgławianie hali przeciwko omacnicy spichrzanki.", width: 1385, height: 1041 },
  { src: image15, alt: "Dezynsekcja młyna przeciwko szkodnikom magazynowym.", caption: "Dezynsekcja młyna przeciwko szkodnikom magazynowym.", width: 1385, height: 1041 },
  { src: image16, alt: "Likwidacja gniazda os w dachu z trzciny.", caption: "Likwidacja gniazda os w dachu z trzciny.", width: 1385, height: 1041 },
  { src: image17, alt: "Usuwanie gniazda szerszeni z elewacji budynku.", caption: "Usuwanie gniazda szerszeni z elewacji budynku.", width: 1385, height: 1041 },
  { src: image18, alt: "Likwidacja dezynsekcja mrówek ogrodowych i faraona.", caption: "Likwidacja dezynsekcja mrówek ogrodowych i faraona.", width: 1280, height: 960 },
  { src: image19, alt: "Dezynsekcja fumigacja ziarna w silosach przeciwko wołek zbozowy.", caption: "Dezynsekcja fumigacja ziarna w silosach przeciwko wołek zbozowy.", width: 1385, height: 1041 },
  { src: image20, alt: "Dezynsekcja fumigacja ziarna w silosach przeciwko wołek zbozowy.", caption: "Dezynsekcja fumigacja ziarna w silosach przeciwko wołek zbozowy.", width: 1385, height: 1041 },
  { src: image21, alt: "Szkodnik magazynowy wołek zbożowy.", caption: "Szkodnik magazynowy wołek zbożowy.", width: 1385, height: 1041 },
  { src: image22, alt: "Dezynsekcja fumigacja ziarna w silosach przeciwko wołek zbozowy.", caption: "Dezynsekcja fumigacja ziarna w silosach przeciwko wołek zbozowy.", width: 1385, height: 1041 },
  { src: image23, alt: "Dezynfekcja kościoła SARS COVID 19.", caption: "Dezynfekcja kościoła SARS COVID 19.", width: 544, height: 725 },
  { src: image24, alt: "Dezynfekcja przy uzyciu Ozonu likwidacja przykrych zapachów.", caption: "Dezynfekcja przy uzyciu Ozonu likwidacja przykrych zapachów.", width: 1459, height: 1094 },
  { src: image25, alt: "Ozonowanie pomieszczeń.", caption: "Ozonowanie pomieszczeń.", width: 1387, height: 1040 },
  { src: image26, alt: "Ozonowanie kuchni.", caption: "Ozonowanie kuchni.", width: 1385, height: 1039 },
  { src: image27, alt: "Dezynsekcja przeciwko szkodnikom drewna wyrobionego: spuszczel pospolity, kołatek domowy i inne", caption: "Dezynsekcja przeciwko szkodnikom drewna wyrobionego: spuszczel pospolity, kołatek domowy i inne", width: 1387, height: 1849 },
  { src: image28, alt: "Srodek owadobójczy w formie zelu do aplikacji na szkodniki drewna wyrobionego. Numer partii oraz termin ważności produktu i objętość.", caption: "Srodek owadobójczy w formie zelu do aplikacji na szkodniki drewna wyrobionego. Numer partii oraz termin ważności produktu i objętość.", width: 1387, height: 1849 },
  { src: image29, alt: "Szczelne opakowanie z plomba zabezpieczającą otwarcie wiaderka.", caption: "Szczelne opakowanie z plomba zabezpieczającą otwarcie wiaderka.", width: 1387, height: 1849 },
  { src: image30, alt: "Przygotowanie środka do użytku przez agregat do natrysku.", caption: "Przygotowanie środka do użytku przez agregat do natrysku.", width: 1387, height: 1849 },
  { src: image31, alt: "Przygotowanie logistyczne operatora agregatu natryskowego.", caption: "Przygotowanie logistyczne operatora agregatu natryskowego.", width: 1387, height: 1849 },
  { src: image32, alt: "Nielegalne wysypisko śmieci o powierzchni około 1ha. Dezynsekcja przeciwko karaluchom, prusakom które w sezonie letnim potrafiły rozejść się z wysypiska śmieci w poszukiwaniu pokarmu w promieniu kilometra do innych zakładów sąsiadujących z nielegalnym wysypiskiem śmieci. Jedna z hałd w której w masowej ilości zawierała prusaki i karaluchy.", caption: "Nielegalne wysypisko śmieci o powierzchni około 1ha. Dezynsekcja przeciwko karaluchom, prusakom które w sezonie letnim potrafiły rozejść się z wysypiska śmieci w poszukiwaniu pokarmu w promieniu kilometra do innych zakładów sąsiadujących z nielegalnym wysypiskiem śmieci. Jedna z hałd w której w masowej ilości zawierała prusaki i karaluchy.", width: 1387, height: 1849 },
  { src: image33, alt: "Wąskie przejazdy dla aut ciężarowych przywożących śmieci.", caption: "Wąskie przejazdy dla aut ciężarowych przywożących śmieci.", width: 1387, height: 1849 },
  { src: image34, alt: "Wnętrze hali wypełnione po dach odpadami w której żyją karaluchy.", caption: "Wnętrze hali wypełnione po dach odpadami w której żyją karaluchy.", width: 1387, height: 1849 },
  { src: image35, alt: "Obraz ilości składowanych śmieci bez żadnego porządku.", caption: "Obraz ilości składowanych śmieci bez żadnego porządku.", width: 1387, height: 1849 },
  { src: image36, alt: "Na podłodze przed śmieciami brązowe kropki to efekt dezynsekcji martwe karaluchy.", caption: "Na podłodze przed śmieciami brązowe kropki to efekt dezynsekcji martwe karaluchy.", width: 1387, height: 1849 },
  { src: image37, alt: "Widok hali załadowanej po brzegi śmieciami z przodu budynku oraz to co znajdowało się około 4 metrów przed budynkiem. Karaluchy biegały sobie do budynku i z powrotem.", caption: "Widok hali załadowanej po brzegi śmieciami z przodu budynku oraz to co znajdowało się około 4 metrów przed budynkiem. Karaluchy biegały sobie do budynku i z powrotem.", width: 1387, height: 1849 },
  { src: image38, alt: "Jedna z części hali w której robactwa było trochę mniej.", caption: "Jedna z części hali w której robactwa było trochę mniej.", width: 1387, height: 1849 },
  { src: image39, alt: "Tutaj niestety karaluchy rządziły.", caption: "Tutaj niestety karaluchy rządziły.", width: 1387, height: 1849 },
  { src: image40, alt: "Jeden z boksów w budynku gdzie było ich najwięcej.", caption: "Jeden z boksów w budynku gdzie było ich najwięcej.", width: 1387, height: 1849 },
  { src: image41, alt: "Te ciemne okruchy na podłodze to hordy martwych owadów.", caption: "Te ciemne okruchy na podłodze to hordy martwych owadów.", width: 1387, height: 1849 },
  { src: image42, alt: "Tutaj bardzo dobrze widać ilość martwych owadów na podłodze i skala zjawiska zasiedlenia nielegalnego wysypiska śmieci przez karaluchy z jaka przyszło nam się mierzyć. Można powiedzieć „plagi egipskie.”", caption: "Tutaj bardzo dobrze widać ilość martwych owadów na podłodze i skala zjawiska zasiedlenia nielegalnego wysypiska śmieci przez karaluchy z jaka przyszło nam się mierzyć. Można powiedzieć „plagi egipskie.”", width: 1387, height: 1849 },
  { src: image43, alt: "Tu również z martwych owadów brązowy dywanik się ścielę.", caption: "Tu również z martwych owadów brązowy dywanik się ścielę.", width: 1387, height: 1849 },
  { src: image44, alt: "Tutaj również brązowy dywanik z martwych owadów. Bardzo lubiły schować się w odpadach styropianu dlaczego?...ciepło.", caption: "Tutaj również brązowy dywanik z martwych owadów. Bardzo lubiły schować się w odpadach styropianu dlaczego?...ciepło.", width: 1387, height: 1849 },
  { src: image45, alt: "Tutaj przy dużym zbliżeniu zdjęcia ujrzeć można pojedyncze osobniki.", caption: "Tutaj przy dużym zbliżeniu zdjęcia ujrzeć można pojedyncze osobniki.", width: 1387, height: 1849 },
  { src: image46, alt: "Owady martwe bardziej widoczne są na podłodze jasnej. Zdjęcie z dyżurki pomieszczenia również opanowanego przez karaluchy.", caption: "Owady martwe bardziej widoczne są na podłodze jasnej. Zdjęcie z dyżurki pomieszczenia również opanowanego przez karaluchy.", width: 1387, height: 1849 },
  { src: image47, alt: "Brązowe rodzynki porozrzucane niestety nie to martwe karaluchy po zabiegu dezynsekcji.", caption: "Brązowe rodzynki porozrzucane niestety nie to martwe karaluchy po zabiegu dezynsekcji.", width: 1387, height: 1849 },
  { src: image48, alt: "Tu również sporo zostało porażonych środkiem owadobójczym.", caption: "Tu również sporo zostało porażonych środkiem owadobójczym.", width: 1387, height: 1849 },
  { src: image49, alt: "Sprzątania co nie mara ale efekt założony dezynsekcji jest.", caption: "Sprzątania co nie mara ale efekt założony dezynsekcji jest.", width: 1387, height: 1849 },
  { src: image50, alt: "Podczas działań dezynsekcyjnych przeprowadzonych również na hałdach śmieci zauważyliśmy inny akcent. Mimo nie sprzyjających warunków rozwojowych pomidor koktajlowy wyrósł sobie", caption: "Podczas działań dezynsekcyjnych przeprowadzonych również na hałdach śmieci zauważyliśmy inny akcent. Mimo nie sprzyjających warunków rozwojowych pomidor koktajlowy wyrósł sobie", width: 1387, height: 1849 },
  { src: image51, alt: "Tutaj widać bardziej jak pomidor próbuje wspinać się do góry i na bok szukając podpórki do rozrostu krzewu.", caption: "Tutaj widać bardziej jak pomidor próbuje wspinać się do góry i na bok szukając podpórki do rozrostu krzewu.", width: 1387, height: 1849 },
  { src: image52, alt: "W przybliżeniu ładny pomidorek. Najwidoczniej nie apetyczny dla karaluchów.", caption: "W przybliżeniu ładny pomidorek. Najwidoczniej nie apetyczny dla karaluchów.", width: 1387, height: 1849 },
];


  const [showAll, setShowAll] = useState(false);
  const galleryRef = useRef(null);

  const toggleImages = () => {
    setShowAll((prevState) => {
      const newState = !prevState;
      if (!newState && galleryRef.current) {
        galleryRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
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
            zoomedImgSizes="40vw"
          />
          <button
            onClick={toggleImages}
            className={classNames(styles.toggleButton)}
          >
            <span className={styles.arrow}>
              {showAll ? "▲ Zamknij galerię" : "▼ Zobacz cała galerię"}
            </span>
          </button>
        </div>
      </section>
    </>
  );
}

export default memo(Gallery);
