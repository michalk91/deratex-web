export const CONSENT_PURPOSES = [
  {
    id: "necessary",
    required: true,
    title: "Niezbędne",
    description:
      "Zapewniają prawidłowe działanie strony, zapamiętanie Twojego wyboru dotyczącego cookies oraz ochronę formularza kontaktowego przed spamem.",
    services: ["Google reCAPTCHA (Google Ireland Limited)"],
  },
  {
    id: "experience",
    required: false,
    title: "Treści zewnętrzne",
    description:
      "Pozwalają wyświetlić mapę dojazdu oraz naszą stronę na Facebooku. Dostawcy tych treści mogą zapisywać własne pliki cookies i przetwarzać dane o Twojej aktywności.",
    services: [
      "Mapy Google (Google Ireland Limited)",
      "Facebook (Meta Platforms Ireland Limited)",
    ],
  },
];
