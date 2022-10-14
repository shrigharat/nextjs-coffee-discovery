import { useContext, useState } from "react";
import { CoffeeStoreContext, COFFEE_STORE_ACTION_TYPES } from "../contexts/coffee-store-context";

const useGeoLocation = () => {
  const [locationError, setLocationError] = useState("");
  const [loading, setLoading] = useState(false);
  const { dispatch } = useContext(CoffeeStoreContext);

  const successHandler = (position) => {
    const { latitude, longitude } = position.coords;
    dispatch({
      type: COFFEE_STORE_ACTION_TYPES.SET_LAT_LONG,
      payload: `${latitude},${longitude}`,
    });
    setLocationError("");
  };

  const erroHandler = (e) => {
    setLocationError("There was some error getting your location!");
  };

  const getLocation = () => {
    setLoading(true);
    if (!navigator.geolocation) {
      setLocationError("Your browser does not support geolocation!");
    } else {
      navigator.geolocation.getCurrentPosition(successHandler, erroHandler);
    }
    setLoading(false);
  };

  return {
    getLocation,
    locationError,
    loading,
  };
};

export default useGeoLocation;
