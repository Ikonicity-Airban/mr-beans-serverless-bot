import { Menu } from "@grammyjs/menu";
import { Context } from "grammy";

const main = new Menu("root-menu")
	.text("Welcome", (ctx: Context) => ctx.reply("Hi!"))
	.row()
	.submenu("Credits", "credits-menu");

const settings = new Menu("credits-menu")
	.text("Show Credits", (ctx: Context) => ctx.reply("Powered by grammY"))
	.back("Go Back");

// Register settings menu at main menu.
main.register(settings);
// Optionally, set a different parent.
main.register(settings, "back-from-settings-menu");

export default main;
