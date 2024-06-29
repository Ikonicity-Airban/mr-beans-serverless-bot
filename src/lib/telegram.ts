import { VercelRequest, VercelResponse } from "@vercel/node";

import { Bot, Context, SessionFlavor, WebhookReplyEnvelope } from "grammy";
import { ok } from "./responses";
import { botUtils } from "./utils";
import { SessionData } from "../@types";

type MyContext = Context & SessionFlavor<SessionData>;

const debug = require("debug")("lib:telegram");
const isDev = process.env.DEV;
const VERCEL_URL = process.env.VERCEL_URL;
const BOT_TOKEN = process.env.BOT_TOKEN;

export const bot = new Bot<MyContext>(BOT_TOKEN);

async function localBot() {
	debug("Bot is running in development mode at http://localhost:3000");
	await bot.init();
	const botInfo = bot.botInfo;
	console.info("Server has initialized bot username: ", botInfo.username);
	debug(`deleting webhook`);
	await bot.api.deleteWebhook();
	debug(`starting polling`);
	// bot.command("start", (ctx) => ctx.reply("Hello World!"));
	botUtils(bot);
}

export async function useWebhook(req: VercelRequest, res: VercelResponse) {
	try {
		if (!isDev && !VERCEL_URL) {
			throw new Error("VERCEL_URL is not set.");
		}

		const getWebhookInfo = await bot.api.getWebhookInfo();
		const botInfo = await bot.api.getMe();
		console.info("Server has initialized bot username using Webhook. ", botInfo.username);

		if (getWebhookInfo.url !== VERCEL_URL + "/api") {
			debug(`deleting webhook`);
			await bot.api.deleteWebhook();
			debug(`setting webhook to ${VERCEL_URL}/api`);
			await bot.api.setWebhook(`${VERCEL_URL}/api`);
			// call bot commands and middleware
		}
		botUtils(bot);

		// console.log("webhook already defined");
		// console.log("request method: ", req.method);
		// console.log("req.body", req.body);

		if (req.method === "POST") {
			await bot.handleUpdate(req.body, res as unknown as WebhookReplyEnvelope);
		} else {
			ok(res, "Listening to bot events...");
		}
	} catch (error) {
		console.error(error);
		return error.message;
	}
}

//run bot in development mode
(async () => {
	if (isDev) {
		console.log("isDev", isDev);
		await localBot();
		// call bot commands and middleware
	}
})();
