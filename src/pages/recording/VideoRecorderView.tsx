/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import * as React from "react";
import "./VideoRecorderView.css"

export interface VideoResolution {
	min?: number;
	ideal?: number;
	max?: number;
}

export interface VideoOptions {
	width?: VideoResolution;
	height?: VideoResolution;
}

export interface VideoRecorderViewProps {
	audio?: boolean;
	video?: VideoOptions;
	onRecordingCompleted?: (data: Blob) => void;
	onRecordingStarted?: () => void;
	onRecordingStopped?: () => void;
}

export interface VideoRecorderViewState {
	isRecording: boolean;
	hasRecorded: boolean;
	canRecord: boolean;
}

export class VideoRecorderView extends React.Component<VideoRecorderViewProps, VideoRecorderViewState> {

	private mediaRecorder: MediaRecorder | undefined;
	private recording: Blob | undefined;

	public constructor(props: VideoRecorderViewProps) {

		super(props);
		this.state = {
			isRecording: false,
			hasRecorded: false,
			canRecord: false
		};

		this.getAudioOption = this.getAudioOption.bind(this);
		this.getVideoOptions = this.getVideoOptions.bind(this);
		this.handlerError = this.handlerError.bind(this);
		this.initializeVideoStream = this.initializeVideoStream.bind(this);
		this.startRecording = this.startRecording.bind(this);
		this.stopRecording = this.stopRecording.bind(this);
		this.initVideo = this.initVideo.bind(this);
		this.handleStartRecording = this.handleStartRecording.bind(this);
		this.reRecord = this.reRecord.bind(this);
		this.getRecordButton = this.getRecordButton.bind(this);
		this.getStopRecordingButton = this.getStopRecordingButton.bind(this);
		this.getRetryButton = this.getRetryButton.bind(this);
		this.handleVideoPreviewUpdate = this.handleVideoPreviewUpdate.bind(this);

	}

	private getAudioOption(): MediaTrackConstraints {

		return {
			advanced: [{
				echoCancellation: true,
				noiseSuppression: true,
				autoGainControl: true
			}]
		};

	}

	private getVideoOptions(): object {

		return {
			facingMode: "user",
			width: {
				min: this.props.video?.width?.min ?? 640,
				ideal: this.props.video?.width?.ideal ?? 1280,
				max: this.props.video?.width?.max ?? 1920
			},
			height: {
				min: this.props.video?.height?.min ?? 480,
				ideal: this.props.video?.height?.ideal ?? 720,
				max: this.props.video?.height?.max ?? 1080
			}
		}

	}

	private handlerError(msg: string): Error {

		alert("Whoops! An error occured.");
		return  new Error(msg);

	}

	public handleVideoPreviewUpdate(canRecord: boolean): void {

		this.setState({canRecord});

	}

	private async initializeVideoStream(): Promise<void> {

		if (navigator.mediaDevices === undefined) {
			return alert("Whoops! It looks like your computer either doesn't have a web cam or you did not" +
				" allow permission. We need to access your web cam so that we can record you performing!" +
				" Please refresh the page.");
		}

		const mediaStreamObject: MediaStream = await navigator.mediaDevices.getUserMedia({
			audio: this.getAudioOption(),
			video: this.getVideoOptions()
		});

		this.mediaRecorder = new MediaRecorder(mediaStreamObject);

		const previewView: HTMLVideoElement | null = document.getElementById("feedView") as HTMLVideoElement;
		if (previewView === null) throw this.handlerError("previewView is null");

		previewView.srcObject = mediaStreamObject;
		previewView.onloadedmetadata = (ev: Event): void => {
			previewView.play();
		};

		previewView.muted = true;

		let videoPreviewWindow: HTMLVideoElement | null = document.getElementById("previewView") as HTMLVideoElement;
		if (videoPreviewWindow === null) throw this.handlerError("videoPreviewWindow is null.");

		let chunks: Blob[] = [];


		this.mediaRecorder.ondataavailable = (ev: BlobEvent): void => {
			chunks.push(ev.data);
		};

		this.mediaRecorder.onstop = (ev: Event): void => {

			let blob: Blob = new Blob(chunks, { "type" : "video/mp4;" });
			this.recording = blob;

			chunks = [];

			const videoURL = window.URL.createObjectURL(blob);
			if (videoPreviewWindow === null) throw this.handlerError("videoPreviewWindow is null.");
			videoPreviewWindow.src = videoURL;

			this.setState({isRecording: false, hasRecorded: true});

			if (this.props.onRecordingCompleted === undefined) throw this.handlerError("Save handler not defined.");
			this.props.onRecordingCompleted(this.recording);

		};

	}

	private initVideo(): void {

		this.initializeVideoStream().catch(err => console.error(err));

	}

	private handleStartRecording(): void {

		this.startRecording().catch(err => console.error(err));

	}

	private async startRecording(): Promise<void> {

		if (this.mediaRecorder === undefined) await this.initializeVideoStream();
		if (this.mediaRecorder === undefined) throw this.handlerError("mediaRecorder failed to init.");

		this.mediaRecorder.start();
		this.setState({isRecording: true});
		if (this.props.onRecordingStarted) this.props.onRecordingStarted();

	}

	private stopRecording(): void {

		if (this.mediaRecorder === undefined) throw this.handlerError("mediaRecorder is undefined");
		this.mediaRecorder.stop();
		if (this.props.onRecordingStopped) this.props.onRecordingStopped();

	}


	public componentDidMount(): void {

		this.initVideo();

	}

	private reRecord(): void {

		let videoPreviewWindow: HTMLVideoElement | null = document.getElementById("previewView") as HTMLVideoElement;
		if (videoPreviewWindow === null) throw this.handlerError("videoPreviewWindow is null.");

		videoPreviewWindow.pause();

		this.setState({hasRecorded: false, isRecording: false});
	}
	
	private getRecordButton(): React.ReactElement {
		
		return <button onClick={this.startRecording}><div style={{
			height: 30,
			width: 30,
			background: "red",
			borderRadius: 15
		}}/></button>
		
	}

	private getStopRecordingButton(): React.ReactElement {

		return <button onClick={this.stopRecording}><div style={{
			height: 30,
			width: 30,
			background: "black"
		}}/></button>

	}

	private getRetryButton(): React.ReactElement {

		return <button onClick={this.reRecord} style={{color:"red"}}>Retry</button>

	}

	public render(): React.ReactElement {

		return (<div className={"recorder"}>
			<div className="bubble" style={{display: this.state.isRecording ? "block" : "none"}}/>
			<video style={{display: this.state.hasRecorded ? (this.state.isRecording ? "block": "none") : "block"}} id="feedView"/>
			<video style={{display: this.state.hasRecorded ? (this.state.isRecording ? "none": "block") : "none"}} id={"previewView"} controls/>
			{this.state.canRecord ? (this.state.isRecording ? this.getStopRecordingButton() : (this.state.hasRecorded ? this.getRetryButton() : this.getRecordButton())) : null}
		</div>);

	}
}