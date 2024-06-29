import { Bot, Context, NextFunction, session } from "grammy";
import debug from "debug";
import { storage } from "../supabase";
import { middlewares } from "../middlewares";
import { about, startCommand } from "../commands";
import { greeting } from "../text";

export function botUtils(bot: Bot) {
	// bot.use();
	debug("lib:utils")("Middlewares added");
	// bot.api.setChatMenuButton(, "Start");
	bot.use(
		session({
			initial: () => ({ counter: 0 }),
			storage,
		}),
	);

	bot.use(logger);
	bot.use(middlewares);
	bot.command("start", startCommand);
	bot.command("greeting", greeting);
	bot.command("about", about);
	bot.on("message::email", ctx => ctx.reply("this is an email"));
	bot.catch(error => {
		console.error(error);
		return error.ctx.reply("Something went wrong. Please try again later.");
	});
	bot.start();
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
