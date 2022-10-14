const Airtable = require("airtable");
const base = new Airtable({ apiKey: process.env.NEXT_AIRTABLE_KEY }).base(
  process.env.NEXT_AIRTABLE_COFFEE_BASE_ID
);

const tableName = "coffee-stores";
const coffeeStoreTable = base(tableName);

const extractFields = (record) => ({
  ...record.fields,
  recordId: record.id,
  categories: record.fields.categories.split(","),
});

const getExtractedRecords = (records) =>
  records.map((record) => extractFields(record));

const findRecordByFilter = async (id) => {
  let recordsList = await coffeeStoreTable
    .select({
      filterByFormula: `id="${id}"`,
    })
    .firstPage();
  
    return getExtractedRecords(recordsList);
};

const validateStoreBeforePost = (store) => {
  if (!store.id) {
    return "[id] was missing or was empty.";
  } else if (!store.name) {
    return "[name] was missing or was empty.";
  }
  return "";
};

export { coffeeStoreTable, getExtractedRecords, validateStoreBeforePost, findRecordByFilter };
