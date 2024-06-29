import { IExtractUserDTO, User } from "../@types";

export function createUserDto(user: User): IExtractUserDTO {
	return {
		user_id: user.id,
		full_name: user.first_name + " " + user.last_name,
		username: user.username,
	};
}
