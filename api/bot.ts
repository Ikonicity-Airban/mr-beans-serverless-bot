import { Bot, Context, SessionFlavor, webhookCallback } from "grammy";
import { SessionData } from "../src/@types";
import { botUtils } from "../src/lib";
import { greeting } from "../src/text";

type MyContext = Context & SessionFlavor<SessionData>;
const BOT_TOKEN = process.env.BOT_TOKEN;

const bot = new Bot<MyContext>(BOT_TOKEN);

bot.command("start", greeting);

botUtils(bot);
const token = process.env.BOT_TOKEN;
if (!token) throw new Error("BOT_TOKEN is unset");

export default webhookCallback(bot, "std/http");
