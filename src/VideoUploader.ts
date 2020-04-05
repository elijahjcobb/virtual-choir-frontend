/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import {PromResolve, PromReject} from "@elijahjcobb/prom-type";

export class VideoUploader {

	public static upload(video: Blob, submissionId: string): Promise<void> {
		return new Promise<void>(((resolve: PromResolve<void>, reject: PromReject) => {

			console.log(`About to upload video ${video.size} bytes as submission ${submissionId}.`);

			const req: XMLHttpRequest = new XMLHttpRequest();

			req.addEventListener("load", (): void => {

				resolve();

			});

			req.open("POST", "https://api.nmcvirtualchoir.com/submission/video");

			req.setRequestHeader("submission-id", submissionId);
			req.setRequestHeader("content-type", "video/mp4");
			
			req.send(video);

		}));
	}

}