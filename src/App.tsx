/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import * as React from "react";
import {HeaderView} from "./pages/home/HeaderView";
import {HomePage} from "./pages/home/HomePage";
import "./App.css";

export interface AppProps {

}

export interface AppState {

}

export class App extends React.Component<AppProps, AppState> {

	public constructor(props: AppProps) {

		super(props);

	}

	public render(): React.ReactElement {
		return (<div className={"App"}>
			<HeaderView/>
			<div className={"appContainer"}>
				<div className={"appContent"}>
					<HomePage/>
				</div>
			</div>
		</div>);
	}

}