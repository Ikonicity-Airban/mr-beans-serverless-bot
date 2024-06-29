import { IExtractUserDTO } from "../@types";
import { User } from "grammy/types";

export function createUserDto(user: User): IExtractUserDTO {
	return {
		user_id: user.id,
		full_name: user.first_name + " " + user.last_name,
		username: user.username,
	};
}
