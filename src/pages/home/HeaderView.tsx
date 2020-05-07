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

export interface HeaderViewProps {

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
				<div className={"navItem active"}>
					<HomeIcon/>
					<span>Home</span>
				</div>
				<div className={"navItem"}>
					<GroupIcon/>
					<span>Credits</span>
				</div>
				<div className={"navItem"}>
					<MusicNoteIcon/>
					<span>Submit</span>
				</div>
			</nav>
		</header>);
	}

}