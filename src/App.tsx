/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import * as React from "react";
import {HeaderView, Pages} from "./pages/home/HeaderView";
import {HomePage} from "./pages/home/HomePage";
import "./App.css";

export interface AppProps {

}

export interface AppState {
	currentPage: Pages;
	content: React.ReactElement;
}

export class App extends React.Component<AppProps, AppState> {

	public constructor(props: AppProps) {

		super(props);

		this.state = {
			currentPage: "home",
			content: <HomePage/>
		};
		this.handlePageChange = this.handlePageChange.bind(this);

	}

	private handlePageChange(page: Pages): void {

		let element: React.ReactElement;

		switch (page) {
			case "credits":
				element = <p>Credits</p>;
				break;
			case "home":
				element = <HomePage/>;
				break;
			case "submit":
				element = <p>Submit</p>;
				break;
			default:
				element = <p>error, invalid menu</p>;
				break;
		}

		this.setState({
			content: element,
			currentPage: page
		});

	}

	public render(): React.ReactElement {
		return (<div className={"App"}>
			<HeaderView onChangePage={this.handlePageChange} page={this.state.currentPage}/>
			<div className={"appContainer"}>
				<div className={"appContent"}>
					{this.state.content}
				</div>
			</div>
		</div>);
	}

}