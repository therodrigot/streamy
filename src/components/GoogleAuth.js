import React, { Component } from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

class GoogleAuth extends Component {
	state = { isSignedIn: null };

	componentDidMount() {
		window.gapi.load("client:auth2", () => {
			window.gapi.client
				.init({
					clientId: "292225648762-fhe3mqiv7kd3fqpidhl9nns0ipjefeui.apps.googleusercontent.com",
					scope: "email"
				})
				.then(() => {
					this.auth = window.gapi.auth2.getAuthInstance();
					// this.setState({ isSignedIn: this.auth.isSignedIn.get() });
					this.onAuthChange(this.auth.isSignedIn.get());
					this.auth.isSignedIn.listen(this.onAuthChange);
				});
		});
	}

	onAuthChange = isSignedIn => {
		if (isSignedIn) {
			this.props.signIn(this.auth.currentUser.get().getId());
		} else {
			this.props.signOut();
		}
	};

	onSignOutClick = () => {
		this.auth.signOut();
	};
	onSignInClick = () => {
		this.auth.signIn();
	};

	renderAuthButton() {
		const { isSignedIn } = this.props;

		if (isSignedIn === null) {
			return null;
		} else if (isSignedIn) {
			return (
				<button className="ui google red button" onClick={this.onSignOutClick}>
					<i className="icon google" /> Sign Out
				</button>
			);
		} else {
			return (
				<button className="ui google red button" onClick={this.onSignInClick}>
					<i className="icon google" /> Sign In With Google
				</button>
			);
		}
	}

	render() {
		return <div className="item">{this.renderAuthButton()}</div>;
	}
}

const mapStateToProps = state => ({
	isSignedIn: state.auth.isSignedIn,
});

const mapDispatchToProps = { signIn, signOut };

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(GoogleAuth);
