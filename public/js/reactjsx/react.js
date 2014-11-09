/*** @jsx React.DOM */

window.renderIncentiveReact = function(incentive) {

	var APP = React.createClass({
		getDefaultProps: function () {
			return {
					goal: incentive.goal,
					create: incentive.create_date,
					expire: incentive.expire_date,
					amount: incentive.amount,
					repeat: (function(){
						var c_m = moment(incentive.create_date, "YYYY-MM-DDTHH:mm:ssZ");
						var e_m = moment(incentive.expire_date, "YYYY-MM-DDTHH:mm:ssZ");
						return e_m.diff(c_m, "days")
					})()
				};
		},
		changePercent: function (total) {
			this.setState({percent: (total/parseInt(incentive.goal))*100 + "%"})
		},
		getInitialState: function () {
			var app = this;
			console.log("sending request");
			$.get("/api/pedometer/" + window.userId)
			 .done(function (data) {
					console.log(JSON.stringify(data));
					app.changePercent(data.total_distance);
			  })
			 .fail(function (err) {
					console.error(err);
			  })
			return {
				percent: "Calculating..."
			};
		},
		render: function () {
			return (
				<div>
					<div className="row page-header thin">
						Your Goal: Run {this.props.goal} km in {this.props.repeat} days.
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
							<button onClick={window.createSocketConnection()}></button>
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
			var repeatResult = ["monthly", "weekly", "every_two_weeks", "yearly"];
			var currencyResult = ["USD", "BTC"];

			/* TODO: Error Handling
			if (repearResult.indexOf(obj.repeat) === -1) {

			} else if (currencyResult.indexOf(obj.currency) === -1) {

			} else if (goal === "NaN") {

			} else if (amount === "NaN") {

			} else {
				window.createIncentive(obj);
			} */
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
								 className="form-control" required/>
								<span className="input-group-addon">km</span>
            </div>
						<div className="input-group row formRow">
								<span className="input-group-addon">Period:</span>
								<input list="periods" name="period" className="form-control"
								 ref="every" placeholder="How long should one period be?" required/>
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
								 className="form-control" required/>
								<span className="input-group-addon">BitCoins</span>
						</div>
						<div className="input-group row formRow">
								<input list="currencyList" name="currencylst" className="form-control"
								ref="curr" placeholder="BitCoin or US Dollar?" onChange={this.change}
								required/>
								<datalist id="currencyList">
										<option value="BTC"/>
										<option value="USD"/>
								</datalist>
								<span className="input-group-addon">{this.state.currency}</span>
						</div>
						<div className="row formRow">
							<button className="btn btn-primary" onClick={this.update}>Create Sentiment</button>
						</div>
        </form>
			);
		}
	});

	React.render(<APP2 />, document.getElementById("create"));
};
