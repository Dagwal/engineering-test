import { Factory, Seeder } from "typeorm-seeding";
import { CommentModel } from "../../entities/comment.model";

export class CommentFakeSeed implements Seeder {
  async run(factory: Factory): Promise<any> {
    await factory(CommentModel)().createMany(30)
  }
}