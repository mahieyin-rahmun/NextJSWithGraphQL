import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Connection } from "typeorm";
import { User } from "../../entities/User";

interface IContext {
  req: any;
  res: any;
  connection: any;
  databaseConnection: Connection;
}

@Resolver()
export class UserResolver {
  @Mutation(() => User)
  async registerUser(
    @Arg("firstName") firstName: string,
    @Arg("lastName") lastName: string,
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() context: IContext,
  ): Promise<User> {
    console.log(context);

    return await User.create({
      firstName,
      lastName,
      email,
      password, // I strongly recommend hashing the password before saving it into the database
    }).save();
  }

  @Query(() => User)
  async getUser(@Arg("userId") userId: string) {
    return await User.findOneOrFail(userId);
  }
}
