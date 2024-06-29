import { VercelResponse as NowResponse } from "@vercel/node";

export function badRequest(res: NowResponse, text = "Bad Request") {
	res.status(400).json(text);
}

export function ok(res: NowResponse, text = "Ok") {
	res.status(200).json(text);
}

export function notFound(res: NowResponse, text = "Not Found") {
	res.status(404).json(text);
}

export function internalServerError(res: NowResponse, text = "Internal Server Error") {
	res.status(500).json(text);
}
