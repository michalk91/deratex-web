export const COOKIE_TRACKERS = [
  {
    name: "deratex-consent",
    provider: "Deratex (pamięć lokalna przeglądarki)",
    purpose: "Zapamiętanie Twoich wyborów dotyczących cookies",
    category: "Niezbędne",
    duration: "12 miesięcy",
  },
  {
    name: "_GRECAPTCHA",
    provider: "Google Ireland Limited (reCAPTCHA)",
    purpose:
      "Plik cookie, który pozwala odróżnić człowieka od bota przy wysyłaniu formularza kontaktowego",
    category: "Niezbędne",
    duration: "Czas trwania sesji",
  },
  {
    name: "rc::b, rc::c",
    provider: "Google Ireland Limited (reCAPTCHA)",
    purpose:
      "Wpisy w pamięci sesji przeglądarki, którymi reCAPTCHA sprawdza, czy formularz wypełnia człowiek",
    category: "Niezbędne",
    duration: "Czas trwania sesji",
  },
  {
    name: "rc::a, rc::f",
    provider: "Google Ireland Limited (reCAPTCHA)",
    purpose:
      "Wpisy w pamięci lokalnej przeglądarki, dzięki którym reCAPTCHA rozpoznaje wcześniejsze wizyty i nie musi pokazywać zagadek",
    category: "Niezbędne",
    duration: "Do czasu wyczyszczenia danych przeglądarki",
  },
  {
    name: "NID i inne pliki cookies Google",
    provider: "Google Ireland Limited (Mapy Google)",
    purpose:
      "Wyświetlenie mapy dojazdu; Google może zapamiętywać ustawienia i rozpoznawać przeglądarkę",
    category: "Treści zewnętrzne",
    duration: "Według ustawień Google (NID – ok. 6 miesięcy)",
  },
  {
    name: "datr i inne pliki cookies Facebooka",
    provider: "Meta Platforms Ireland Limited (wtyczki Facebooka)",
    purpose:
      "Wyświetlenie strony Facebook i opinii; datr służy bezpieczeństwu i wykrywaniu nadużyć, a u zalogowanych użytkowników Facebook odczytuje też ich pliki cookies logowania",
    category: "Treści zewnętrzne",
    duration: "Według ustawień Meta (datr – 2 lata)",
  },
];
