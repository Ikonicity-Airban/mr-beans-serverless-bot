import { Bot, Context, NextFunction, session } from "grammy";
import debug from "debug";
import { storage } from "../supabase";
import { middlewares } from "../middlewares";
import { about, start } from "../commands";
import { greeting } from "../text";

export function botUtils(bot: Bot) {
	// bot.use();
	// bot.api.setChatMenuButton(, "Start");
	debug("lib:utils")("Middlewares added");
	bot.use(
		session({
			initial: () => ({ counter: 0 }),
			storage,
		}),
	);

	bot.use(logger);
	bot.on("message::email", ctx => ctx.reply("this is an email"));
	bot.command("start", start);
	bot.command("greeting", greeting);
	bot.command("about", about);
	bot.use(middlewares);
	bot.catch(error => {
		console.error(error);
		return error.ctx.reply("Something went wrong. Please try again later.");
	});
}

export const logger = async (_: Context, next: NextFunction): Promise<void> => {
	const start = new Date();
	await next();
	const ms = new Date().getTime() - start.getTime();
	console.log("Response time: %sms", ms);
};

export function toArgs(ctx: Context) {
	const regex = /^\/([^@\s]+)@?(?:(\S+)|)\s?([\s\S]+)?$/i;
	const parts = regex.exec(ctx.message!.text!.trim());
	if (!parts) {
		return [];
	}
	return !parts[3] ? [] : parts[3].split(/\s+/).filter(arg => arg.length);
}

export const hiddenCharacter = "\u200b";

export function generateReferralLink(user_id: number) {
	return `https://t.me/mr_beans_token_bot?start=${user_id}`;
}