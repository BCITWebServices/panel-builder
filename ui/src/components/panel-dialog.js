import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import autobind from 'autobind-decorator';
import Modal from 'react-modal';

import Button from './shared/button';

import styles from './panel-dialog.pcss';

const wpWrap = document.getElementById('wpwrap');

/**
 * Class Panel Dialog
 *
 * @package ModularContent
 *
 * All dialogs for the system are managed here. Event based so any component can trigger it with success/error/confirm types
 */

class Dialog extends Component {
	state = {
		active: false,
		type: 'success',
		heading: '',
		message: '',
		template: '',
		confirmCallback: 'modern_tribe/dialog_confirmation',
		cancelCallback: 'modern_tribe/dialog_cancellation',
	};

	componentDidMount() {
		document.addEventListener('modern_tribe/open_dialog', this.openDialog);
		document.addEventListener('modern_tribe/close_dialog', this.closeDialog);
	}

	componentWillUnmount() {
		document.removeEventListener('modern_tribe/open_dialog', this.openDialog);
		document.removeEventListener('modern_tribe/close_dialog', this.closeDialog);
	}

	@autobind
	openDialog(e) {
		this.setState({
			active: true,
			type: e.detail.type ? e.detail.type : 'success',
			heading: e.detail.heading ? e.detail.heading : '',
			message: e.detail.message ? e.detail.message : '',
			template: e.detail.template ? e.detail.template : '',
			confirmCallback: e.detail.confirmCallback ? e.detail.confirmCallback : 'modern_tribe/dialog_confirmation',
			cancelCallback: e.detail.cancelCallback ? e.detail.cancelCallback : 'modern_tribe/dialog_cancellation',
		});

		if (wpWrap) {
			wpWrap.classList.add(styles.blur);
		}
	}

	@autobind
	closeDialog() {
		this.setState({ active: false });

		if (wpWrap) {
			wpWrap.classList.remove(styles.blur);
		}
	}

	confirmPanelSetTitle() {
		return null;
	}

	renderMessage() {
		let Message;
		if (this.state.template.length) {
			if (this.state.template === 'confirmPanelSetTitle') {
				Message = this.confirmPanelSetTitle();
			}
		} else {
			if (this.state.message.length) {
				Message = (
					<div className={styles.message}>
						<p>{this.state.message}</p>
					</div>
				);
			}
		}
		return Message;
	}

	renderModalContent() {
		const modalClasses = classNames({
			[styles.error]: this.state.type === 'error',
			[styles.success]: this.state.type === 'success',
			[styles.confirm]: this.state.type === 'confirm',
			[styles.outer]: true,
		});

		return (
			<div className={modalClasses}>
				<div className={styles.inner}>
					<span className={styles.icon} />
					{this.state.heading.length && <h4>{this.state.heading}</h4>}
					{this.renderMessage()}
				</div>
			</div>
		);
	}

	render() {
		return (
			<Modal
				isOpen={this.state.active}
				onRequestClose={this.closeDialog}
				className={styles.modal}
				overlayClassName={styles.overlay}
			>
				<Button
					handleClick={this.closeDialog}
					bare
					full={false}
					icon="dashicons-no"
					classes={styles.close}
				/>
				{this.renderModalContent()}
			</Modal>
		);
	}
}

Dialog.propTypes = {
	handleDialogConfirm: PropTypes.func,
	handleDialogCancel: PropTypes.func,
};

Dialog.defaultProps = {
	handleDialogConfirm: () => {},
	handleDialogCancel: () => {},
};

export default Dialog;

