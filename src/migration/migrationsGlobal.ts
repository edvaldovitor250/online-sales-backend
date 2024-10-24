/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { CreateTableUser1726620770841 } from './1726620770841-create_table_user'; 
import { CreateTableCity1726667004482 } from './1726667004482-create_table_city';
import { CreateTableState1726666964172 } from './1726666964172-create_table_state';
import { CreateTableAddress1726667024256 } from './1726667024256-create_table_address';
import { AlterTableState1727305750944 } from './1727305750944-alter-table-state'; 
import { InsertInState1727305845930 } from './1727305845930-insert-in-state';
import { InsertInCity1727305893493 } from './1727305893493-insert-in-city';
import { AlterTableUser1728422401564 } from './1728422401564-alter-table-user';
import { CreateTableCategory1728599551033 } from './1728599551033-create-table-category';
import { CreateTableProduct1728599588283 } from './1728599588283-create-table-product';
import { InsertRootInUser1729374161281 } from './1729374161281-insert-root-in-user';
import { CreateTableCart1729557237620 } from './1729557237620-create-table-cart';
import { CreateTableCartProduct1729630818082 } from './1729630818082-create-table-cart-product';
import { AlterTableCart1729638959259 } from './1729638959259-alter-table-cart';

export const migrationsGlobal = [
    CreateTableUser1726620770841,
    CreateTableCity1726667004482,
    CreateTableState1726666964172,
    CreateTableAddress1726667024256,
    InsertInState1727305845930,
    InsertInCity1727305893493,
    AlterTableState1727305750944,
    AlterTableUser1728422401564,
    CreateTableCategory1728599551033,
    CreateTableProduct1728599588283,
    InsertRootInUser1729374161281,
    CreateTableCart1729557237620,
    CreateTableCartProduct1729630818082,
    AlterTableCart1729638959259

]