import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { ParcModel } from "../../entities/parc.model";

export class ParcFakeSeed implements Seeder {
  async run(factory: Factory, connection: Connection): Promise<any> {
    await factory(ParcModel)().createMany(20)
  }
}
