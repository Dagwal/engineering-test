import { define } from "typeorm-seeding";
import { ParcModel } from "../../entities/parc.model";

define(ParcModel, (faker) => {
  const parc = new ParcModel;
  // parc.id = faker.random.number();
  parc.name = faker.lorem.word();
  parc.description = faker.lorem.sentence();

  return parc
})
