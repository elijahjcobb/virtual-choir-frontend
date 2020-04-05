/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import {PromResolve, PromReject} from "@elijahjcobb/prom-type";

export enum APIMethod {
	post = "POST",
	get = "GET"
}

export type APIObject<T> = T & {
	id: string;
	updatedAt: number;
	createdAt: number;
}

export interface APIRecording {
	recording: APIObject<{
		key: string;
		name: string;
	}>
	parts: APIObject<{
		name: string;
		recordingId: string;
	}>[]
}

export class API {

	private static async get<T extends object>(endpoint: string, body?: object | undefined, method: APIMethod = APIMethod.get): Promise<T> {
		return new Promise((resolve: PromResolve<T>, reject: PromReject): void => {

			const req: XMLHttpRequest = new XMLHttpRequest();

			req.addEventListener("load", (): void => {

				let obj: object;

				try {
					obj = JSON.parse(req.responseText);
				} catch (e) {
					return reject(new Error("Could not parse json response."));
				}

				if (req.status !== 200) return reject(req.status);
				resolve(obj as T);

			});

			req.open(method, "https://api.nmcvirtualchoir.com" + endpoint);
			req.send(JSON.stringify(body));

		});
	}

	public static async getRecording(recordingKey: string): Promise<APIRecording> {

		return await this.get("/recording/" + recordingKey) as APIRecording;

	}

	public static async startSubmission(value: {firstName: string, lastName: string, email: string, organization: string, recordingKey: string}): Promise<string> {

		const res: {submissionId: string} = await this.get("/submission", value, APIMethod.post);
		return res.submissionId;

	}

	public static async finishSubmission(submissionId: string, verificationCode: string): Promise<string> {

		console.log(submissionId);
		console.log(verificationCode);
		const res: {submissionId: string} = await this.get("/submission/verify", {
			submissionId: submissionId,
			verificationCode: verificationCode
		}, APIMethod.post);
		console.log(res);
		return res.submissionId;

	}

}