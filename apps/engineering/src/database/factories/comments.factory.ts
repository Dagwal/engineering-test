import { define } from "typeorm-seeding";
import { CommentModel } from "../../entities/comment.model";

define(CommentModel, (faker) => {
  const comment = new CommentModel;
  // comment.id = faker.random.number();
  comment.commentText = faker.lorem.sentence();
//   comment.date = faker.date.recent();
  return comment;
})