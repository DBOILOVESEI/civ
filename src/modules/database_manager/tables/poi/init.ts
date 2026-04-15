const Table = {};
Table.Statements = {};
Table.Queries = {
  CREATE_POI_TABLE: `
    CREATE TABLE IF NOT EXISTS poi (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name STRING UNIQUE NOT NULL
    )
  `,

  CREATE_POI: `
    INSERT OR IGNORE INTO poi (name)
    VALUES (@name)
  `,

  REMOVE_POI: `
    DELETE FROM poi
    WHERE name = (@name)
  `,

  GET_ALL_POI: `
    SELECT * FROM poi
  `
};
Table.Init = async (client, database) => {
  Table.Database = database;

  Table.CreatePOITable();

  Table.Statements.CreatePOI = Table.Database.prepare(Table.Queries.CREATE_POI);
  Table.Statements.RemovePOI = Table.Database.prepare(Table.Queries.REMOVE_POI);
  Table.Statements.GetAllPOI = Table.Database.prepare(Table.Queries.GET_ALL_POI);

  Table.CreatePOI("Placeholder");
  console.log(Table.GetAllPOI());
};

Table.CreatePOITable = () => {
  Table.Database.exec(Table.Queries.CREATE_POI_TABLE);
};

Table.CreatePOI = (name: string) => {
  return Table.Statements.CreatePOI.run( { name:name } );
};

Table.RemovePOI = (name: string) => {
  return Table.Statements.RemovePOI.run( { name:name } );
};

Table.GetAllPOI = () => {
  return Table.Statements.GetAllPOI.all();
}

export default Table;
