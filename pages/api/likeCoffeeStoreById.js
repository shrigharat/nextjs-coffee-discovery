import { coffeeStoreTable, findRecordByFilter } from "../../lib/airtable";

const likeCoffeeStoreById = async (req, res) => {
  const { id, likes } = req.query;
  if (req.method.toLowerCase() === "put") {
    try {
      if(!id) {
        res
          .status(400)
          .json({ message: `id was not provided` });
          return;
      }
      const storeList = await findRecordByFilter(id);
      if (storeList.length === 0) {
        res
          .status(400)
          .json({ message: `Store with id - ${id} was not found` });
      } else {
        const storeToUpdate = storeList[0];
        const updatedStore = await coffeeStoreTable.update([
            {
                id: storeToUpdate.recordId,
                fields: {
                    id,
                    likes: parseInt(likes),
                }
            }
        ]);
        if(updatedStore && updatedStore.length > 0) {
            res.json({updatedLikes: updatedStore[0].fields.likes});
        } else {
            res.status(400).json({ message: "Could not update coffee store likes." });
        }
      }
    } catch (e) {
      res.status(400).json({ message: "Could not update coffee store likes." });
      console.error(e);
    }
  } else {
    res
      .status(400)
      .json({ message: `Invalid method. ${req.method} - method called.` });
  }
};

export default likeCoffeeStoreById;
