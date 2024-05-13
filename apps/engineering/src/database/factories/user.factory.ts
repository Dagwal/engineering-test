import { define } from "typeorm-seeding";
import { UserModel } from "../../entities/user.model";

define(UserModel, (faker) => {
  const user = new UserModel;

  user.id = faker.random.uuid();
  user.name = faker.name.findName();
  user.email = faker.internet.email();

  return user
})
