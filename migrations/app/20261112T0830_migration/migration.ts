#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/6d47d83c6b9cb39b9139c40c0a53475c330849ff65f30134b4357b737f54a6f8/contract';
import endContract from '../../snapshots/6d47d83c6b9cb39b9139c40c0a53475c330849ff65f30134b4357b737f54a6f8/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/b0390cf59ab90b9daf46bfad52d864e705748f066876367bee3641214d92aa02/contract';
import startContract from '../../snapshots/b0390cf59ab90b9daf46bfad52d864e705748f066876367bee3641214d92aa02/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, placeholder } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.alterColumnType({
        schema: 'public',
        table: 'Product',
        column: 'price',
        type: 'int8',
        using: placeholder('Product.price:convert'),
      }),
      this.addUnique({
        schema: 'public',
        table: 'Product',
        constraint: 'Product_slug_key',
        columns: ['slug'],
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
