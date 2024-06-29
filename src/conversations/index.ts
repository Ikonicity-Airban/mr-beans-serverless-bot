import { type Conversation, type ConversationFlavor, conversations, createConversation } from "@grammyjs/conversations";
import { Bot, Context, session } from "grammy";

type MyContext = Context & ConversationFlavor;
type MyConversation = Conversation<MyContext>;

const bot = new Bot<MyContext>(process.env.BOT_TOKEN!);

bot.use(session({ initial: () => ({}) }));
bot.use(conversations());

/** Defines the conversation */
async function greeting(conversation: MyConversation, ctx: MyContext) {
	// TODO: code the conversation
	await ctx.reply("Hi there! What is your name?");
	const { message } = await conversation.wait();
	await ctx.reply(`Welcome to the chat, ${message.text}!`);
}

bot.use(createConversation(greeting));

bot.command("start", async ctx => {
	// enter the function "greeting" you declared
	await ctx.conversation.enter("greeting");
});

bot.start()