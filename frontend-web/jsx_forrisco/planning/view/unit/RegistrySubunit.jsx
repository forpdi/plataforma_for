import React from 'react';
import _ from 'underscore';

import UserStore from "forpdi/jsx/core/store/User.jsx";
import UnitStore from "forpdi/jsx_forrisco/planning/store/Unit.jsx";
import VerticalInput from "forpdi/jsx/core/widget/form/VerticalInput.jsx";
import Messages from "forpdi/jsx/core/util/Messages.jsx";

export default React.createClass({
	contextTypes: {
		toastr: React.PropTypes.object.isRequired,
		tabPanel: React.PropTypes.object,
		router: React.PropTypes.object,
	},

	getInitialState() {
		return {
			users: [],
			plansLength: null,
			unit: {
				name: '',
				abbreviation: '',
				user: null,
				description: '',
				planRisk: { id: this.props.params.planRiskId },
				parent: { id: this.props.params.unitId }
			},
		};
	},

	componentDidMount() {
		const tab = this.context.tabPanel.getTabByPath(this.props.location.pathname);
		if (tab && tab.state) {
			this.setState({
				unit: tab.state,
			});
		}
		UserStore.on('retrieve-user', (response) => {
			if (response.data) {
				this.setState({
					users: _.map(response.data, user => user)
				});
			} else {
				this.context.toastr.addAlertError("Erro ao recuperar os usuários da companhia");
			}
		}, this);

		UserStore.dispatch({
			action: UserStore.ACTION_RETRIEVE_USER,
			data: {
				page: 1,
				pageSize: 500,
			},
		});

		UnitStore.on("subunitCreated", (response) => {
			if (response.data) {
				this.context.tabPanel.clearTabState(this.props.location.pathname);
				this.context.toastr.addAlertSuccess(Messages.get("notification.subunit.save"));
				this.context.router.push(`forrisco/plan-risk/${this.props.params.planRiskId}/unit/${this.props.params.unitId}/subunit/${response.data.id}/info`);
			} else {
				this.context.toastr.addAlertError("Erro ao criar Unidade");
			}
		});

		UnitStore.on("unitRetrieved", (model) => {
			if (model.data) {
				const unit = model.data;
				this.refreshTabinfo(this.props.location.pathname, `Nova Subunidade - ${unit.name}`);
			}
		}, this);

		UnitStore.dispatch({
			action: UnitStore.ACTION_RETRIEVE_UNIT,
			data: { unitId: this.props.params.unitId },
		});
	},

	componentWillUnmount() {
		UserStore.off(null, null, this);
		UnitStore.off(null, null, this);
	},

	componentWillReceiveProps(newProps) {
		if (newProps.location.pathname !== this.props.location.pathname) {
			UnitStore.dispatch({
				action: UnitStore.ACTION_RETRIEVE_UNIT,
				data: { unitId: newProps.params.unitId },
			});
		}
	},

	refreshTabinfo(newPathname, tabName) {
		_.defer(() =>
			this.context.tabPanel.addTab(
				newPathname,
				this.state.riskModel ? this.state.riskModel.name : tabName,
			)
		);
	},

	fieldChangeHandler(e) {
		this.setState({
			unit: {
				...this.state.unit,
				[e.target.name]: e.target.value,
			}
		}, this.updateTabPanelState);
	},

	selectChangeHandler(e) {
		const idx = e.target.options.selectedIndex - 1;
		this.setState({
			unit: {
				...this.state.unit,
				user: this.state.users[idx],
			}
		}, this.updateTabPanelState);
	},

	updateTabPanelState() {
		this.context.tabPanel.setTabState(
			this.props.location.pathname,
			this.state.unit,
		);
	},

	handleSubmit(event) {
		event.preventDefault();
		const { unit } = this.state;

		if (unit.name === '' || unit.user === null) {
			this.context.toastr.addAlertError(Messages.get("label.error.form"));
			return false;
		}

		UnitStore.dispatch({
			action: UnitStore.ACTION_NEW_SUBUNIT,
			data: unit,
		});
	},

	onCancel() {
		this.context.tabPanel.removeTabByPath(this.props.location.pathname);
	},

	getFields() {
		var fields = [];
		fields.push({
			name: "name",
			type: "text",
			currValue: this.state.unit.name,
			required: true,
			maxLength: 240,
			placeholder: "Nome da Subnidade",
			label: Messages.getEditable("label.name", "fpdi-nav-label"),
			onChange: this.fieldChangeHandler,
		}, {
			name: "abbreviation",
			type: "text",
			currValue: this.state.unit.abbreviation,
			placeholder: "Sigla da Unidade",
			required: true,
			maxLength: 240,
			label: Messages.getEditable("label.abbreviation", "fpdi-nav-label"),
			onChange: this.fieldChangeHandler,
		}, {
			name: "user",
			type: "select",
			currValue: this.state.unit.user ? this.state.unit.user.name: null,
			options: _.map(this.state.users, user => user.name),
			renderDisplay: value => value,
			className: "form-control-h",
			required: true,
			displayField: 'label',
			placeholder: "Selecione o Responsável pela Subnidade",
			label: Messages.getEditable("label.responsible", "fpdi-nav-label"),
			onChange: this.selectChangeHandler,
		}, {
			name: "description",
			type: "textarea",
			currValue: this.state.unit.description,
			placeholder: "Descrição da Subnidade",
			maxLength: 9900,
			label: Messages.getEditable("label.descriptionPolicy", "fpdi-nav-label"),
			onChange: this.fieldChangeHandler,
		});

		return fields;
	},

	render() {
		return (
			<div>
				<h1 className="marginLeft115">Nova Subunidade</h1>
				<div className="fpdi-card">
					<form onSubmit={this.handleSubmit}>
						{
							this.getFields().map((field, index) => {
								return (
									<VerticalInput key={index} fieldDef={field}/>
								);
							})
						}
						<div className="fpdi-editable-data-input-group">
							<button type="submit" className="btn btn-success">
								{Messages.get('label.save')}
							</button>
							<button type="button" className="btn btn-default" onClick={this.onCancel}>
								{Messages.get('label.cancel')}
							</button>
						</div>
					</form>
				</div>
			</div>
		)
	}
})
