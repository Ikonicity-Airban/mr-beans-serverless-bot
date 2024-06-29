import { IUser, IUserInput } from "../@types";
import { supabase } from "../supabase";
const log = require("debug")("bot:user-controller");

/**
 * Function to create user
 * @param user the user object
 * @returns A promise that resolves to a User object or null if the user is not found.
 */

export async function createUser(user: IUserInput) {
	log("Creating user");
	const { data, error } = await supabase
		.from("users")
		.insert({ ...user, created_at: new Date().toISOString(), bonus: 0 })
		.select("*")
		.single<IUser>();

	if (error) {
		console.table(error);
		return null;
	}
	return data;
}

/**
 * Function to get user by referral code
 * @param referralCode the code received from the user
 * @returns A promise that resolves to a User object or null if the user is not found.
 */
export async function getUserByReferralCode(referralCode: string): Promise<IUser | null> {
	const { data, error } = await supabase.from("users").select("*").eq("user_id", referralCode).select().single();
	if (error) {
		console.error("Error fetching user by referral code:", error);
		return null;
	}

	return data as IUser;
}

/**
 * Function to update user bonus and referrals
 * @param user_id the user id
 * @param bonus the bonus amount
 * @param referrals the referrals array
 * @returns A promise that resolves to a User object or null if the user is not found.
 */

// Function to update user bonus
export async function updateUserBonus(user_id: number, bonus: number, referrals: number[]) {
	console.log("🚀 ~ updateUserBonus ~ referrals:", referrals)
	const { data, error } = await supabase
		.from("users")
		.update({ bonus, referrals })
		.eq("user_id", user_id)
		.select()
		.single();

	if (error) {
		return null;
	}

	return data as IUser;
}

/**
 * Function to get user by id
 * @param user_id the user id
 * @returns A promise that resolves to a User object or null if the user is not found.
 */
export async function getUserById(user_id: number): Promise<IUser | null> {
	const { data, error } = await supabase.from("users").select("*").eq("user_id", user_id).single();

	if (error) {
		console.error("Error fetching user by referral code:", error);
		return null;
	}

	return data as IUser;
}
