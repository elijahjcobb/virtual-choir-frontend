/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import * as React from "react";
import {VideoRecorderView} from "./VideoRecorderView";
import "./RecordingView.css";
import {PreviewView} from "./PreviewView";

export interface RecordingViewResponse {
	submissionId: string;
	recording: Blob;
}

export interface RecordingViewProps {
	submissionId: string;
	onVideoRecorded: (response: RecordingViewResponse) => void;
	partId: string;
}

export interface RecordingViewState {
	canSave: boolean;
	recording: Blob | undefined;
}

export class RecordingView extends React.Component<RecordingViewProps, RecordingViewState> {

	private readonly previewView: React.RefObject<PreviewView>;
	private readonly recordingView: React.RefObject<VideoRecorderView>;

	public constructor(props: RecordingViewProps) {

		super(props);

		this.handleStartRecording = this.handleStartRecording.bind(this);
		this.handleStopRecording = this.handleStopRecording.bind(this);
		this.handleDidFinishLoadingVideo = this.handleDidFinishLoadingVideo.bind(this);
		this.handleRecordingCompleted = this.handleRecordingCompleted.bind(this);
		this.handleSaveButtonClicked = this.handleSaveButtonClicked.bind(this);

		this.previewView = React.createRef();
		this.recordingView = React.createRef();

		this.state = {
			canSave: false,
			recording: undefined
		};

	}

	private handleStartRecording(): void {

		this.setState({canSave: false});
		this.previewView.current?.start();

	}

	private handleStopRecording(): void {

		this.previewView.current?.stop();

	}

	private handleDidFinishLoadingVideo(): void {

		this.recordingView.current?.handleVideoPreviewUpdate(true);

	}

	private handleRecordingCompleted(data: Blob): void {

		this.setState({
			canSave: true,
			recording: data
		});

	}

	private handleSaveButtonClicked(): void {

		if (this.state.recording === undefined) {
			throw new Error("Somehow, the save button was clicked while video recording is undefined.");
		}

		this.props.onVideoRecorded({
			submissionId: this.props.submissionId,
			recording: this.state.recording
		});

	}

	public render(): React.ReactElement {

		return (<div className={"recordingView"}>
			<button
				style={{display: this.state.canSave ? "block" : "none"}}
				className={"saveButton"}
				onClick={this.handleSaveButtonClicked}
			>Save</button>
			<PreviewView
				partId={this.props.partId}
				ref={this.previewView}
				onDidFinishLoadingVideo={this.handleDidFinishLoadingVideo}
			/>
			<VideoRecorderView
				ref={this.recordingView}
				onRecordingStarted={this.handleStartRecording}
				onRecordingStopped={this.handleStopRecording}
				onRecordingCompleted={this.handleRecordingCompleted}
			/>
		</div>);

	}
}