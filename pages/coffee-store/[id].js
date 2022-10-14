import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useContext, useEffect } from "react";
import BackIcon from "../../components/icons/back-icon";
import {
  createCoffeeStore,
  getCoffeeStores,
  isObjectEmpty,
} from "../../utils/coffee-stores";
import { CoffeeStoreContext } from "../../contexts/coffee-store-context";
import styles from "./store.module.css";
import StoreCard from "../../components/store-card/storeCard";
import useSWR from "swr";

export async function getStaticProps(props) {
  const params = props.params;
  const coffeeStores = await getCoffeeStores();

  const store = coffeeStores.find((store) => {
    return store.id.toString() === params.id;
  });

  return {
    props: {
      coffeeStore: store ? store : {},
    },
  };
}

export async function getStaticPaths() {
  const coffeeStores = await getCoffeeStores();
  const paths = coffeeStores.map((store) => ({
    params: { id: store.id },
  }));

  return {
    paths,
    fallback: true,
  };
}

const IndividualStore = (initialProps) => {
  const router = useRouter();
  const storeId = router.query.id;

  const [coffeeStore, setCoffeeStore] = useState(
    initialProps.coffeeStore || {}
  );

  const {
    state: { nearbyStores, nearbyPhotos },
  } = useContext(CoffeeStoreContext);

  useEffect(() => {
    const func = async () => {
      if (isObjectEmpty(initialProps.coffeeStore)) {
        if (nearbyStores.length > 0) {
          let foundIndex = 0;
          const foundStore = nearbyStores.find((store, index) => {
            foundIndex = index;
            return store.id.toString() === storeId;
          });
          if (foundStore) {
            foundStore.imgURL = nearbyPhotos[foundIndex].fullURL;
            await createCoffeeStore(foundStore);
          } else {
            console.error("Not able to find coffee store in props or context");
          }
          setCoffeeStore(foundStore);
        }
      } else {
        await createCoffeeStore(initialProps.coffeeStore);
      }
    };
    func();
  }, [storeId, initialProps.coffeeStore, nearbyStores]);

  const [likes, setLikes] = useState(0);

  const fetcher = (url) => {
    if (!storeId) {
      return {};
    } else {
      return fetch(url)
        .then((res) => res.json())
        .catch((e) => console.error);
    }
  };

  const { data, error } = useSWR(
    `/api/getCoffeeStoreById?id=${storeId}`,
    fetcher
  );

  const { name = "" } = coffeeStore;

  const handleLikeButton = async () => {
    //make API call
    if (storeId) {
      try {
        const response = await fetch(
          `/api/likeCoffeeStoreById?id=${storeId}&likes=${likes + 1}`,
          {
            method: "PUT",
          }
        );
        const data = await response.json();
        setLikes(data.updatedLikes);
      } catch (e) {
        console.error("Could not update likes for storeId -> ", storeId);
      }
    }
  };

  useEffect(() => {
    if (data && data.length && data.length > 0) {
      setCoffeeStore(data[0]);
      setLikes(data[0].likes);
    }
  }, [data]);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.storeContainer}>
      <Head>
        <title>{name}</title>
        <meta property="og:title" content={name} />
        <meta
          property="og:description"
          content={`Located at ${coffeeStore.address}.`}
        />
        <meta property="og:image" content={coffeeStore.imgURL} />
        <meta
          name="twitter:title"
          content={name}
        />
        <meta
          name="twitter:description"
          content={`Located at ${coffeeStore.address}.`}
        />
        <meta
          name="twitter:image"
          content={coffeeStore.imgURL}
        />
      </Head>
      <div className={styles.infoWrapper}>
        <div className={styles.backButton}>
          <Link href={`/`}>
            <a className={styles.detailRow}>
              <span>
                <BackIcon color="white" />
              </span>
              <span>Back to stores</span>
            </a>
          </Link>
        </div>
        <StoreCard
          store={{ ...coffeeStore, setLikes: handleLikeButton, likes }}
        />
      </div>
    </div>
  );
};

export default IndividualStore;
