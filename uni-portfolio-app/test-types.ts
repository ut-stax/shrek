import type { Database } from "./database.types";

type PublicType = Database["public"];
type TablesType = PublicType["Tables"];
type FunctionsType = PublicType["Functions"];

// Check if TablesType satisfies GenericTable requirement
type TestTable = TablesType["inquiries"];

type HasRow = TestTable extends { Row: unknown } ? true : false;
type HasInsert = TestTable extends { Insert: unknown } ? true : false;
type HasUpdate = TestTable extends { Update: unknown } ? true : false;
type HasRelationships = TestTable extends { Relationships: unknown[] } ? true : false;

const hasRow: HasRow = true;
const hasInsert: HasInsert = true;
const hasUpdate: HasUpdate = true;
const hasRelationships: HasRelationships = true;

// Check Functions
type TestFunction = FunctionsType[string];
type HasArgs = TestFunction extends { Args: unknown } ? true : false;
type HasReturns = TestFunction extends { Returns: unknown } ? true : false;

const hasArgs: HasArgs = true;
const hasReturns: HasReturns = true;
