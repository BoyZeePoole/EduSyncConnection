
import { Injectable } from "@angular/core";
import { User } from "./user.model";
import { MyHttpPostService } from '../services/http-post.service';

@Injectable()
export class UserService {
  constructor(private myHttpPostService: MyHttpPostService) { }
  token;
  login(user: User) {
    return this.myHttpPostService
      .postData({ username: user.username, password: user.password });
  }

}
