import UserRepository from "../repositories/user.repository";
import UserDto from "../dto/user.dto";
import { IUser } from "../types/user.type";

class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();

    this.createUser = this.createUser.bind(this);
    this.getUsers = this.getUsers.bind(this);
    this.getUserById = this.getUserById.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }

  public getUsers(): Promise<IUser[]> {
    return this.userRepository.getUsers();
  }

  public async getUserById(id: string): Promise<{
    status: number;
    data: IUser | { message: string };
  }> {
    const user = await this.userRepository.getUserById(id);

    if (!user) return { data: { message: "User not found" }, status: 404 };

    return { status: 200, data: user };
  }

  public createUser(data: UserDto): Promise<IUser> {
    return this.userRepository.createUser({
      name: data.name,
      email: data.email,
      password: data.password,
    });
  }

  public updateUser(id: string, data: UserDto): Promise<IUser | null> {
    return this.userRepository.updateUser(id, {
      name: data.name,
      email: data.email,
      password: data.password,
    });
  }

  public async deleteUser(id: string): Promise<void> {
    await this.userRepository.deleteUser(id);
  }
}

export default UserService;