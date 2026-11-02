import classNames from "classnames";
import styles from "./map.module.css";
import { memo } from "react";
import ConsentGate from "../consent/ConsentGate";
import ConsentPlaceholder from "../consent/ConsentPlaceholder";
import { SERVICE_CONSENT } from "../../lib/iubenda";

function Map() {
  return (
    <div className={classNames(styles.mapContainer)}>
      <ConsentGate
        purposes={SERVICE_CONSENT.googleMaps}
        fallback={<ConsentPlaceholder serviceName="Google Maps" />}
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d9474.153930735054!2d17.8764168!3d53.5838529!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47025707dd9e1acd%3A0x972f11893877650d!2sDeratex%20Zak%C5%82ad%20DDD%20Gra%C5%BCyna%20Kukla%20Tuchola!5e0!3m2!1spl!2spl!4v1668269477343!5m2!1spl!2spl"
          width="100%"
          height="100%"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </ConsentGate>
    </div>
  );
}
export default memo(Map);
