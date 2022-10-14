const foursquareHeaders = {
  Authorization: process.env.NEXT_PUBLIC_FS_KEY,
  Accept: "application/json",
};

const unsplashHeaders = {
  Authorization: `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_KEY}`,
  Accept: "application/json",
};

//get initial/default coffee stores data
const getCoffeeStores = async (latlon = "41.8781,-87.6298", limit = "8") => {
  const baseURL = "https://api.foursquare.com/v3/places/search";
  const apiURL = `${baseURL}?query=coffee&ll=${latlon}&limit=${limit}`;
  let data;
  try {
    const response = await fetch(apiURL, {
      method: "GET",
      headers: foursquareHeaders,
    });
    data = await response.json();
    data = data.results.map((store) => ({
      ...store,
      id: store.fsq_id,
      address: store.location.address || "",
      neighborhood: store.location.neighborhood || "",
      cross_street: store.location.cross_street || "",
    }));
  } catch (e) {
    console.log("Error fetching default coffee stores");
    console.error(e);
    data = { results: [] };
  }
  return data;
};

const getCoffeePhotos = async (limit = "8") => {
  const baseURL = "https://api.unsplash.com/search/photos/";
  const apiURL = `${baseURL}?query=coffee&per_page=${limit}`;
  let data;
  try {
    const response = await fetch(apiURL, {
      method: "GET",
      headers: unsplashHeaders,
    });
    data = await response.json();
    data.results = data.results.map((p) => ({
      smallURL: p.urls.small,
      fullURL: p.urls.regular,
    }));
  } catch (e) {
    console.log("Error fetching unsplash photos");
    console.error(e);
    data = { results: [] };
  }
  return data.results;
};

const createCoffeeStore = async (store) => {
  try {
    const response = await fetch("/api/createCoffeeStore", {
      method: "POST",
      body: JSON.stringify(store),
    });
    const data = await response.json();
    return data;
  } catch (e) {
    console.error("Error creating store", e);
    return null;
  }
};

const isObjectEmpty = (obj) => {
  return !obj || Object.keys(obj).length === 0;
};

export { getCoffeeStores, getCoffeePhotos, isObjectEmpty, createCoffeeStore };
