import { createUser, getUserById, getUserByReferralCode, updateUserBonus } from "./user-controller";
import { IUser } from "../@types";
import { createUserDto } from "../dtos/user.dto";
const debug = require("debug")("bot:controllers");

const user = createUserDto({
	id: 1,
	first_name: "John",
	last_name: "Doe",
	username: "johndoe",
	language_code: "en",
	is_bot: false,
});
describe("controllers", () => {
	it("should create a user", async () => {
		const newUser = await createUser({ ...user, referee_id: 6664562 });
		expect(newUser).toBeDefined();
		expect(newUser).toBeInstanceOf(Object);
		expect(newUser.user_id).toBeDefined();
		expect(newUser.user_id).toBeGreaterThan(0);
	});

	it("should get a user by id", async () => {
		const newUser = await createUser({ ...user, referee_id: 6664562 });

		const userById = await getUserById(newUser.user_id);
		expect(userById).toBeDefined();
		expect(userById).toBeInstanceOf(Object);
		expect(userById.user_id).toBeDefined();
		expect(userById.user_id).toBeGreaterThan(0);
	});

	it("should update user bonus", async () => {
		const newUser = await createUser({ ...user, referee_id: 6664562 });
		const userById = await getUserById(newUser.user_id);
		expect(userById).toBeDefined();
		expect(userById).toBeInstanceOf(Object);
		expect(userById.user_id).toBeDefined();
		expect(userById.user_id).toBeGreaterThan(0);
		await updateUserBonus(newUser.user_id, 100, [1, 2, 3]);
		const userByIdAfter = await getUserById(newUser.user_id);
		expect(userByIdAfter).toBeDefined();
		expect(userByIdAfter).toBeInstanceOf(Object);
		expect(userByIdAfter.user_id).toBeDefined();
		expect(userByIdAfter.user_id).toBeGreaterThan(0);
		expect(userByIdAfter.bonus).toBe(100);
		expect(userByIdAfter.referrals).toBeDefined();
		expect(userByIdAfter.referrals).toBeInstanceOf(Array);
		expect(userByIdAfter.referrals.length).toBe(3);
	});
});
