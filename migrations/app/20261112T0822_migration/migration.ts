#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/54e5c15f07210e7eef89e9010b00bbc6b5231b92e19c6f6662a58bc4456454b1/contract';
import endContract from '../../snapshots/54e5c15f07210e7eef89e9010b00bbc6b5231b92e19c6f6662a58bc4456454b1/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/b0390cf59ab90b9daf46bfad52d864e705748f066876367bee3641214d92aa02/contract';
import startContract from '../../snapshots/b0390cf59ab90b9daf46bfad52d864e705748f066876367bee3641214d92aa02/contract.json' with { type: 'json' };
import { Migration, MigrationCLI } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
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
