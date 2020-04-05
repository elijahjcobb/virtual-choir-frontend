/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import * as React from "react";

export interface PreviewViewProps {
	onDidFinishLoadingVideo: () => void;
	partId: string;
}

export interface PreviewViewState {

}

export class PreviewView extends React.Component<PreviewViewProps, PreviewViewState> {

	public constructor(props: PreviewViewProps) {

		super(props);

		this.start = this.start.bind(this);
		this.stop = this.stop.bind(this);
		this.getPreviewView = this.getPreviewView.bind(this);
		this.didFinishLoadingPreview = this.didFinishLoadingPreview.bind(this);

		this.state = {};


	}

	private getPreviewView(): HTMLVideoElement {

		const obj: HTMLVideoElement | null = document.getElementById("songView") as HTMLVideoElement;
		if (obj == null) throw new Error("cannot get preview view...");
		return obj;

	}

	public start(): void {

		console.log("will play video");
		this.getPreviewView().play().catch((err) => console.error(err));

	}

	public stop(): void {

		console.log("will stop video");
		const video = this.getPreviewView();
		video.currentTime = 0;
		video.pause();


	}

	private didFinishLoadingPreview(event: React.SyntheticEvent<HTMLVideoElement>) {

		console.log("finished loading video");
		this.props.onDidFinishLoadingVideo();

	}

	public render(): React.ReactElement {

		return (<video
			src={"https://api.nmcvirtualchoir.com/part/" + this.props.partId}
			className={"songView"}
			id={"songView"}
			onLoadedData={this.didFinishLoadingPreview}
		/>);

	}
}