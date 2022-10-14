import { getCoffeeStores } from "../../utils/coffee-stores";

const getCoffeeStoresByLocation = async (req, res) => {
    try {
      const { latlong, limit } = req.query;
    const response = await getCoffeeStores(latlong, limit);
    res.json(response);
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: "Failed to get coffee stores" });
  }
};

export default getCoffeeStoresByLocation;
