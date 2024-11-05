import { author } from "./author";
import { comment } from "./comment";
import { community } from "./community";
import { thread } from "./thread";

export const schema = {
  types: [author, community, thread, comment],
}
