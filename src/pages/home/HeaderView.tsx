/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import * as React from "react";
import "./HeaderView.css";
import {
	HomeOutlined as HomeIcon,
	GroupOutlined as GroupIcon,
	MusicNoteOutlined as MusicNoteIcon
} from "@material-ui/icons";

export type Pages =  "home" | "credits" | "submit";

export interface HeaderViewProps {
	page: Pages;
	onChangePage: (page: Pages) => void;
}

export interface HeaderViewState {

}

export class HeaderView extends React.Component<HeaderViewProps, HeaderViewState> {

	public constructor(props: HeaderViewProps) {

		super(props);

	}

	public render(): React.ReactElement {
		return (<header className={"HeaderView"}>
			<h1>Virtual Choir</h1>
			<nav>
				<div
					onClick={() => this.props.onChangePage("home")}
					className={"navItem" + (this.props.page === "home" ? " active" : "")}>
					<HomeIcon/>
					<span>Home</span>
				</div>
				<div
					onClick={() => this.props.onChangePage("credits")}
					className={"navItem" + (this.props.page === "credits" ? " active" : "")}>
					<GroupIcon/>
					<span>Credits</span>
				</div>
				<div
					onClick={() => this.props.onChangePage("submit")}
					className={"navItem" + (this.props.page === "submit" ? " active" : "")}>
					<MusicNoteIcon/>
					<span>Submit</span>
				</div>
			</nav>
		</header>);
	}

}