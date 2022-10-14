import Image from "next/image";
import Link from "next/link";
import LocationIcon from "../icons/location-icon";
import styles from "./preview-card.module.css";

const PreviewCard = ({ id, imgUrl, title, link }) => {
  return (
    <Link href={`/coffee-store/${id}`}>
      <a className={styles.previewCard}>
        <article className={styles.cardContainer}>
          <div className={styles.imageContainer}>
            <Image
              src={imgUrl}
              width="240"
              height="180"
            />
          </div>
          <h3 className={styles.cardTitle}>{title}</h3>
        </article>
      </a>
    </Link>
  );
};

export default PreviewCard;
