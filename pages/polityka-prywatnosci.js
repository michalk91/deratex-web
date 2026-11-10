import Head from "next/head";
import classNames from "classnames";
import styles from "./privacyPolicy.module.css";
import { openCookiePreferences } from "../lib/consent";
import { COOKIE_TRACKERS } from "../data/cookieTrackers";

const LAST_UPDATED = "10 listopada 2026 r.";

function Section({ id, title, children }) {
  return (
    <section id={id} className={styles.section}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      {children}
    </section>
  );
}

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Polityka prywatności i cookies</title>
        <meta
          name="description"
          content="Polityka prywatności i plików cookies serwisu Deratex Zakład DDD Tuchola."
        />
      </Head>
      <article
        className={classNames(
          "innerContentWidth",
          "accent-links",
          styles.article,
        )}
      >
        <h1
          className={classNames("title", "accent-underline", styles.pageTitle)}
        >
          Polityka prywatności i cookies
        </h1>
        <p className={styles.updated}>Ostatnia aktualizacja: {LAST_UPDATED}</p>

        <Section title="1. Administrator danych">
          <p>
            Administratorem Twoich danych osobowych jest Zakład Deratyzacji,
            Dezynfekcji i Dezynsekcji „DERATEX”, ul. Cegielniana 28/41, 89-500
            Tuchola. We wszystkich sprawach dotyczących danych osobowych możesz
            skontaktować się z nami pod adresem e-mail{" "}
            <a href="mailto:ul50@wp.pl">ul50@wp.pl</a> lub telefonicznie: 660
            826 121.
          </p>
        </Section>

        <Section title="2. Jakie dane przetwarzamy">
          <ul className={styles.list}>
            <li>
              <strong>Dane podane w formularzu kontaktowym</strong> – imię,
              nazwisko, adres e-mail, numer telefonu oraz treść wiadomości.
            </li>
            <li>
              <strong>Dane zbierane automatycznie</strong> – adres IP, dane o
              urządzeniu i przeglądarce, a w przypadku reCAPTCHA także dane o
              interakcji ze stroną (np. ruchy myszy, kliknięcia, przewijanie,
              zdarzenia dotykowe i klawiatury).
            </li>
            <li>
              <strong>Pliki cookies i podobne technologie</strong> – opisane w
              punkcie 8.
            </li>
          </ul>
        </Section>

        <Section title="3. Cele i podstawy prawne przetwarzania">
          <ul className={styles.list}>
            <li>
              <strong>Odpowiedź na zapytanie z formularza</strong> (np. wycena
              usługi) – art. 6 ust. 1 lit. b RODO (działania przed zawarciem
              umowy) oraz art. 6 ust. 1 lit. f RODO (nasz prawnie uzasadniony
              interes polegający na prowadzeniu korespondencji).
            </li>
            <li>
              <strong>Ochrona formularza przed spamem</strong> (Google
              reCAPTCHA) – art. 6 ust. 1 lit. f RODO (zapewnienie bezpieczeństwa
              serwisu).
            </li>
            <li>
              <strong>Wyświetlanie mapy Google oraz treści z Facebooka</strong>{" "}
              – art. 6 ust. 1 lit. a RODO (Twoja zgoda wyrażona w ustawieniach
              cookies).
            </li>
            <li>
              <strong>Utrzymanie i bezpieczeństwo serwisu</strong> (logi
              serwera) – art. 6 ust. 1 lit. f RODO.
            </li>
            <li>
              <strong>Ustalenie, dochodzenie lub obrona roszczeń</strong> – art.
              6 ust. 1 lit. f RODO.
            </li>
          </ul>
        </Section>

        <Section title="4. Odbiorcy danych">
          <p>
            Twoje dane mogą być przekazywane podmiotom, które świadczą na naszą
            rzecz usługi niezbędne do działania serwisu: dostawcy hostingu,
            dostawcy poczty elektronicznej oraz Google Ireland Limited
            (reCAPTCHA, Mapy Google). Po wyrażeniu zgody dane trafiają również
            do Meta Platforms Ireland Limited (wtyczki Facebooka).
          </p>
        </Section>

        <Section title="5. Przekazywanie danych poza EOG">
          <p>
            Google i Meta mogą przetwarzać dane na serwerach znajdujących się
            poza Europejskim Obszarem Gospodarczym, w szczególności w USA.
            Przekazanie odbywa się na podstawie decyzji Komisji Europejskiej w
            sprawie EU-US Data Privacy Framework lub standardowych klauzul
            umownych.
          </p>
        </Section>

        <Section title="6. Jak długo przechowujemy dane">
          <p>
            Dane z formularza kontaktowego przechowujemy przez czas potrzebny do
            obsługi zapytania, a następnie przez okres przedawnienia
            ewentualnych roszczeń. Jeżeli zawrzemy umowę, dane przechowujemy
            przez czas jej realizacji oraz przez okres wymagany przepisami
            prawa. Dane przetwarzane na podstawie zgody przechowujemy do czasu
            jej wycofania.
          </p>
        </Section>

        <Section title="7. Twoje prawa">
          <p>Przysługuje Ci prawo do:</p>
          <ul className={styles.list}>
            <li>dostępu do swoich danych i otrzymania ich kopii,</li>
            <li>sprostowania danych,</li>
            <li>usunięcia danych,</li>
            <li>ograniczenia przetwarzania,</li>
            <li>przenoszenia danych,</li>
            <li>
              wniesienia sprzeciwu wobec przetwarzania opartego na prawnie
              uzasadnionym interesie,
            </li>
            <li>
              wycofania zgody w dowolnym momencie – bez wpływu na zgodność z
              prawem przetwarzania dokonanego przed jej wycofaniem,
            </li>
            <li>
              wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych (ul.
              Stawki 2, 00-193 Warszawa).
            </li>
          </ul>
          <p>
            Podanie danych w formularzu jest dobrowolne, ale niezbędne do
            udzielenia odpowiedzi na zapytanie. Nie podejmujemy decyzji w sposób
            zautomatyzowany ani nie profilujemy użytkowników.
          </p>
        </Section>

        <Section id="cookies" title="8. Pliki cookies">
          <p>
            Pliki cookies to niewielkie pliki zapisywane na Twoim urządzeniu
            podczas korzystania ze strony. Korzystamy z nich w dwóch
            kategoriach:
          </p>
          <ul className={styles.list}>
            <li>
              <strong>Niezbędne</strong> – zapewniają działanie strony,
              zapamiętanie Twoich wyborów oraz ochronę formularza przed spamem.
              Nie wymagają zgody.
            </li>
            <li>
              <strong>Treści zewnętrzne</strong> – umożliwiają wyświetlenie mapy
              Google oraz treści z Facebooka. Są używane wyłącznie po wyrażeniu
              zgody.
            </li>
          </ul>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th scope="col">Nazwa</th>
                  <th scope="col">Dostawca</th>
                  <th scope="col">Cel</th>
                  <th scope="col">Kategoria</th>
                  <th scope="col">Okres</th>
                </tr>
              </thead>
              <tbody>
                {COOKIE_TRACKERS.map((tracker) => (
                  <tr key={tracker.name}>
                    <td>{tracker.name}</td>
                    <td>{tracker.provider}</td>
                    <td>{tracker.purpose}</td>
                    <td>{tracker.category}</td>
                    <td>{tracker.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Okresy przechowywania plików cookies dostawców zewnętrznych mogą się
            zmieniać zgodnie z ich politykami. Więcej informacji znajdziesz w{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Polityce prywatności Google
            </a>{" "}
            oraz{" "}
            <a
              href="https://www.facebook.com/privacy/policy/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Polityce prywatności Meta
            </a>
            .
          </p>
        </Section>

        <Section title="9. Zarządzanie zgodą">
          <p>
            Swoją zgodę możesz w każdej chwili zmienić lub wycofać w
            ustawieniach cookies. Możesz też usunąć lub zablokować pliki cookies
            w ustawieniach swojej przeglądarki – może to jednak utrudnić
            korzystanie z niektórych funkcji strony.
          </p>
          <button
            type="button"
            className={classNames(
              "button-reset",
              "outline-button",
              styles.button,
            )}
            onClick={openCookiePreferences}
          >
            Ustawienia cookies
          </button>
        </Section>

        <Section title="10. Zmiany polityki">
          <p>
            Możemy aktualizować niniejszą politykę, np. w związku ze zmianą
            przepisów lub usług używanych na stronie. Aktualna wersja jest
            zawsze dostępna na tej stronie.
          </p>
        </Section>
      </article>
    </>
  );
}
