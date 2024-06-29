import { Context } from "grammy";
import { getUserByReferralCode, createUser, updateUserBonus } from "../controllers";
// import { User } from "../supabase/types";
const debug = require("debug");

import { createUserDto } from "../dtos/user.dto";
import { startText } from "../text";
import { startKeyboard } from "../keyboards";

export const start = (ctx: Context) => {
	debug("lib:start")('Triggered "start" text command');
	// Extract referral code from the start parameter
	// const startPayload = ctx.message?.text?.split(" ")[1];
	const message_id = ctx.message?.message_id!;

	ctx.reply(startText(ctx.message!.from!.username!), {
		reply_parameters: {
			message_id,
		},
		parse_mode: "HTML",
		reply_markup: startKeyboard,
	});
};

// Function to send status updates
export async function sendStatusUpdate(ctx: Context, message: string, messageId?: number) {
	if (messageId) {
		await ctx.api.editMessageText(ctx.chat!.id, messageId, message);
		return messageId;
	} else {
		const statusMessage = await ctx.reply(message);
		return statusMessage.message_id;
	}
}

// Handle the /start command
export const startCommand = async (ctx: Context) => {
	const user = createUserDto(ctx.message!.from);
	const referralCode = ctx.message.text.split(" ")[1];

	debug("lib:referral-code")(referralCode);

	debug("bot:start")("Triggered start command");

	let statusMessageId: number | undefined;

	try {
		// Send initial status message
		statusMessageId = await sendStatusUpdate(ctx, "Processing your request...");

		if (referralCode) {
			const referee = await getUserByReferralCode(referralCode);

			referee
				? await sendStatusUpdate(ctx, "Valid referral code. Creating your account...", statusMessageId)
				: await sendStatusUpdate(ctx, "Invalid referral code.", statusMessageId);

			const newUser = await createUser({ ...user, referee_id: referee.user_id });
			if (newUser) {
				// const referralLink = generateReferralLink(newUser.user_id);
				await updateUserBonus(referee.user_id, referee.bonus + 200, [...referee.referrals, newUser.user_id]);
				await sendStatusUpdate(
					ctx,
					`Welcome! ${user.full_name}
		${referee ? `You were referred by ${referee.full_name ?? referee.username}` : ""}
						${startText}
						`,
					statusMessageId,
				);
			} else {
				await sendStatusUpdate(ctx, "Error creating new user.", statusMessageId);
			}
		} else {
			await sendStatusUpdate(ctx, "No referral code provided. Creating your account...", statusMessageId);

			let newUser = await createUser({ ...user, referee_id: null });

			if (newUser) {
				await sendStatusUpdate(
					ctx,
					`Welcome! ${user.full_name}
						${startText}
						`,
					statusMessageId,
				);
			} else {
				await sendStatusUpdate(ctx, "Error creating new user.", statusMessageId);
			}
		}
	} catch (error) {
		console.error("Error handling start command:", error);
		await sendStatusUpdate(ctx, "An error occurred. Please try again later.", statusMessageId as number);
	}
};

// Start the bot
