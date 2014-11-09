/*** @jsx React.DOM */

window.renderIncentiveReact = function(incentive) {

	var APP = React.createClass({
		getDefaultProps: function() {
			return {
					km: incentive.goal,
					create: incentive.create_date,
					expire: incentive.expire_date,
					amount: incentive.amount
				};
		},
		getInitialState: function () {
			return {
				percent: "Calculating..."
			};
		},
		render: function () {
			return (
				<div>
					<div className="row page-header thin">
						Your Goal: Run {this.props.km} km in {this.props.days} days
					</div>
					<div className="row">
						<div className="col-md-6">
							<div className="row">Created On: {this.props.create}</div>
							<div className="row">Expires On: {this.props.expire}</div>
							<div className="row">Bitcoins Bid: {this.props.amount}</div>
							<div className="row">Percent Done: {this.state.percent}</div>
						</div>
						<div className="col-md-6">
							<div>Analytics</div>
							<div>This should be a D3 fancy graph</div>
							<button onClick="createSocketConnection()"></button>
						</div>
					</div>
				</div>
			);
		}
	});

	React.render(<APP />, document.getElementById("dashboard"));

};

window.setIncentiveReact = function () {

	var APP2 = React.createClass({
		mixins: [React.addons.LinkedStateMixin],
		change: function () {
			this.setState({
				currency: this.refs.curr.getDOMNode().value
			});
		},
		update: function (e) {
			e.preventDefault();
			var obj = {
				goal: String(parseInt(this.state.goal)),
				repeat: this.refs.every.getDOMNode().value,
				amount: String(parseInt(this.state.amount)),
				currency: this.refs.curr.getDOMNode().value,
			};
			console.log(JSON.stringify(obj));
			window.createIncentive(obj);
		},
		getInitialState: function () {
			return {
				goal: "",
				repeat: "",
				amount: "",
				currency: "BTC"
			};
		},
		render: function () {
			return (
        <form className="myForm">
            <div className="input-group row formRow">
                <input valueLink={this.linkState('goal')} type="text"
								 placeholder="How many kms do you wanna run?"
								 className="form-control"/>
								<span className="input-group-addon">km</span>
            </div>
						<div className="input-group row formRow">
								<span className="input-group-addon">Period:</span>
								<input list="periods" name="period" className="form-control"
								 ref="every" placeholder="How long should one period be?"/>
								<datalist id="periods">
										<option value="weekly"/>
										<option value="every_two_weeks"/>
										<option value="monthly"/>
										<option value="yearly"/>
								</datalist>
						</div>
						<div className="input-group row formRow">
								<input valueLink={this.linkState('amount')} type="text"
								 placeholder="How many BitCoins do you want to commit?"
								 className="form-control"/>
								<span className="input-group-addon">BitCoins</span>
						</div>
						<div className="input-group row formRow">
								<input list="currencyList" name="currencylst" className="form-control"
								ref="curr" placeholder="BitCoin or US Dollar?" onChange={this.change}/>
								<datalist id="currencyList">
										<option value="BTC"/>
										<option value="USD"/>
								</datalist>
								<span className="input-group-addon">{this.state.currency}</span>
						</div>
						<div className="row formRow">
							<button className="btn btn-success" onClick={this.update}>Create Sentiment</button>
						</div>
        </form>
			);
		}
	});

	React.render(<APP2 />, document.getElementById("create"));
};
