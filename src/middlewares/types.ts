import { Context } from "grammy";

export interface MyContext extends Context {
	referralCode?: string;
}
