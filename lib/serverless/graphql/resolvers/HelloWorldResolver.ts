import { Query, Resolver } from "type-graphql";

@Resolver()
export class HelloWorldResolver {
  @Query(() => String)
  sayHello() {
    return "hello, world!";
  }
}
