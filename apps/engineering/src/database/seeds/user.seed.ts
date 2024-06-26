import { Factory, Seeder } from "typeorm-seeding";
import { UserModel } from "../../entities/user.model";

export class UserFakeSeed implements Seeder {
  async run(factory: Factory): Promise<any> {
    await factory(UserModel)().createMany(30)
  }
}
