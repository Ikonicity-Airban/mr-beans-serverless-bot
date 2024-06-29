import { NextFunction } from "grammy";
import { MyContext } from "./types";
export * from "./types";
// Middleware to extract the referral code from the /start command

export const middlewares = (ctx: MyContext, next: NextFunction) => {
	if (ctx.message?.text?.startsWith("/start")) {
		const startPayload = ctx.message.text.split(" ")[1];
		ctx.referralCode = startPayload;
	}
	return next();
};
