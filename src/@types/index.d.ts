import { Context } from "grammy";
import { User } from "grammy/types";
export interface IUser extends IExtractUserDTO {
	user_id: number;
	referee_id: number | null;
	bonus: number;
	created_at: string;
	referrals?: number[]; // New field to store referred user IDs
}

export interface IExtractUserDTO {
	full_name: string;
	username: string;
	user_id: number;
}

export type IUserInput = Omit<IUser, "user_id" | "bonus" | "created_at" | "referrals">;


export interface SessionData {
	counter: number;
}

export interface Referral {
	id: string;
	user_id: number;
	referee_id: string;
	created_at: string;
}

export interface ReferralCode {
	id: string;
	code: string;
	created_at: string;
}

export interface Task {
	id: string;
	task_id: number;
	user_id: number;
	task_type: string;
	status: string;
	created_at: string;
}

export interface Database {
	users: IUser[];
	referrals: Referral[];
	referral_codes: ReferralCode[];
	tasks: Task[];
	public: Public[];
}

export interface Public {}
