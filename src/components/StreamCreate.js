import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { createStream } from "../actions";

export class StreamCreate extends Component {
	// static propTypes = {
	// 	prop: PropTypes
	// };
	renderErrorMsg({ touched, error }) {
		if (touched && error) {
			return <div className="ui error message">{error}</div>;
		}
	}
	renderInput = ({ input, label, meta }) => {
		const className = `field ${meta.error && meta.touched ? "error" : ""}`;
		return (
			<div className={className}>
				<label htmlFor={input.name}>{label}</label>
				<input {...input} />
				{this.renderErrorMsg(meta)}
			</div>
		);
	};
	onSubmit = formValues => {
		console.log(formValues);
		this.props.createStream(formValues);
		// document.getElementsByTagName('form')[0].classList.add('error')
	};
	render() {
		return (
			<form className="ui form container error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
				<Field name="title" component={this.renderInput} label="Title" />
				<Field name="description" component={this.renderInput} label="Description" />
				<button type="submit" className="ui button primary">
					Submit
				</button>
			</form>
		);
	}
}

const validate = formValues => {
	const errors = {};
	if (!formValues.title) errors.title = "Title cant be empty";
	if (!formValues.description) errors.description = "Description cant be empty";
	return errors;
};
// const mapStateToProps = state => ({});

// const mapDispatchToProps = {};
const formWrapped = reduxForm({
	form: "streamCreate",
	validate
})(StreamCreate);

export default connect(
	null,
	{ createStream }
)(formWrapped);
