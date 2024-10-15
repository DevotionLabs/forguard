import { RequestHandler } from "express";

export const handleHealthcheck: RequestHandler = (_req, res) => {
	res.status(200).json({ status: "healthy" });
};
