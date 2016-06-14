// this is the i18n object supplied by wp to js. i simulate defaults here for what i need in here for the karma tests.

export const I18N_DEFAULTS = {
	ui: {
		btn_launch_edit: 'Edit in Live Preview',
	},
	fields: {
		image: {
			button_default_remove: 'Remove',
			button_default_add: 'Add Image',
		},
		post_list: {
			chooser_heading: 'Add Another',
			notification_min_posts_single: 'This field requires %MIN_COUNT% more item',
			notification_min_posts_multiple: 'This field requires %MIN_COUNT% more items',
		},
		textarea: {
			tab_visual: 'Visual',
			tab_text: 'Text',
		},
		repeater: {
			msg_max_rows: 'You have reached the %TYPE% limit of this field',
			btn_new_default: 'Add Row',
			btn_delete_default: 'Delete Row',
		},
	},
};
