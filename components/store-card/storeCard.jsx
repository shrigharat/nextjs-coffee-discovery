import Image from "next/image";
import BuildingIcon from "../icons/building-icon";
import LocationIcon from "../icons/location-icon";
import LikeIcon from "../icons/like-icon";
import styles from "./storeCard.module.css";

const StoreCard = ({ store }) => {
  const {
    name,
    neighborhood,
    address,
    cross_street,
    categories,
    imgURL,
    likes,
    setLikes,
  } = store;

  return (
    <div className={styles.infoContainer}>
      <div className={styles.storeImage}>
        <Image src={imgURL || "/static/banner-img.jpg"} layout="fill" />
      </div>
      <div className={styles.content}>
        <h2>{name}</h2>
        {address && (
          <p className={styles.detailRow}>
            <span title="Store address">
              <LocationIcon color="white" />
            </span>
            <span>{address}</span>
          </p>
        )}
        {(neighborhood || cross_street) && (
          <p className={styles.detailRow}>
            <span title="Store neighbourhood">
              <BuildingIcon color="white" />
            </span>
            <span>
              {neighborhood
                ? Array.isArray(neighborhood)
                  ? neighborhood[0]
                  : neighborhood
                : cross_street}
            </span>
          </p>
        )}
        {categories && categories.length > 0 && (
          <div className={styles.chipList}>
            {categories.map((c, index) => (
              <span key={index} className={styles.chip}>
                {typeof c === "string" ? c : c.name}
              </span>
            ))}
          </div>
        )}
        <p className={styles.detailRow}>
          <span onClick={() => setLikes()} title="Likes">
            <LikeIcon color="white" />
          </span>
          <span>{likes || 1}</span>
        </p>
      </div>
    </div>
  );
};

export default StoreCard;
