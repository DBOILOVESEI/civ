const Table = {};
Table.Statements = {};
Table.Queries = {
  CreatePOITable: `
    CREATE TABLE IF NOT EXISTS poi (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name STRING UNIQUE NOT NULL,
      description STRING,
      coordinate_x INTEGER,
      coordinate_y INTEGER,
      parent_poi_id INTEGER
      
    )
  `,

  CreatePOI: `
    INSERT OR IGNORE INTO poi (name)
    VALUES (@name)
  `,

  RemovePOI: `
    DELETE FROM poi
    WHERE name = (@name)
  `,

  GetAllPOI: `
    SELECT * FROM poi
  `
};
Table.Init = async (client, database) => {
  Table.CreatePOI({
    name: "Placeholder"
  });
  console.log(Table.GetAllPOI());
};

export default Table;
