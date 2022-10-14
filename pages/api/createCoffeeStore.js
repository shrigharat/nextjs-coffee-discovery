import {
  coffeeStoreTable,
  findRecordByFilter,
  getExtractedRecords,
  validateStoreBeforePost,
} from "../../lib/airtable";

const createCoffeeStore = async (req, res) => {
  if (req.method.toLowerCase() === "post") {
    try {
      const body = JSON.parse(req.body);
      const { id, name, address, neighborhood, imgURL, categories } = body;
      const validateStore = validateStoreBeforePost(body);
      if (validateStore !== "") {
        res.status(400).json({ message: validateStore });
        return;
      }
      const coffeeStores = await findRecordByFilter(id);

      if (coffeeStores.length !== 0) {
        res.json(coffeeStores);
      } else {
        //create a record
        let createdStores = await coffeeStoreTable.create([
          {
            fields: {
              id,
              name,
              address,
              neighborhood: neighborhood ? Array.isArray(neighborhood) ? neighborhood[0] : neighborhood : "",
              imgURL,
              likes: 0,
              categories: Array.isArray(categories)
                ? categories.map((c) => c.name).join(",")
                : categories,
            },
          },
        ]);
        createdStores = getExtractedRecords(createdStores);
        res.json(createdStores);
      }
    } catch (e) {
      console.error("Error creating coffee store", e);
      res.status(400).json({ message: "Error creating coffee store" });
    }
  } else {
    res
      .status(400)
      .json({ message: `Unsupported method. ${req.method} - method called` });
  }
};

export default createCoffeeStore;
