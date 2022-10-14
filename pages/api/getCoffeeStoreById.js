import { findRecordByFilter, getExtractedRecords } from "../../lib/airtable";

const getCoffeeStoreById = async (req, res) => {
  const { id } = req.query;
  if (req.method.toLowerCase() === "get") {
    try {
      const storeList = await findRecordByFilter(id);
      if(storeList.length === 0) {
        res.status(400).json({message: `Store with id - ${id} was not found`});
      } else {
        res.json(storeList);
      }
    } catch (e) {
      res.status(400).json({ message: "Could not fetch coffee store." });
    }
  } else {
    res
      .status(400)
      .json({ message: `Invalid method. ${req.method} - method called.` });
  }
};

export default getCoffeeStoreById;
