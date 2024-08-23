import { UserDto } from "src/user/user.dto";

declare module 'express' {
  interface Request {
    user?: UserDto;
  }
}
