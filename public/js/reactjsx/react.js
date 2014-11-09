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

window.setIncentiveReact = function (id) {

	var APP2 = React.createClass({
		mixins: [React.addons.LinkedStateMixin],
		getLength: function () {
			var value = document.getElementById("theDatalist").value;
			if (value === "Week") {
				return 7;
			} else if (value === "Two Weeks") {
				return 14;
			} else if (value === "Month") {
				return 30;
			} else {
				return undefined;
			}
		},
		update: function (e) {
			e.preventDefault();
			var obj = {
				km: this.state.km,
				length: this.getLength(),
				amount: this.state.amount,
				id: id
			};
			console.log(JSON.stringify(obj));
		},
		getInitialState: function () {
			return {
				km: 0,
				length: 7,
				amount: 0
			};
		},
		render: function () {
			return (
        <form>
            <div className="input-group">
                <input valueLink={this.linkState('km')} type="number"
								 placeholder="How many kms do you wanna run?"
								 className="form-control"/>
								<span className="input-group-addon">km</span>
            </div>
						<div className="input-group">
								<span className="input-group-addon">Period:</span>
								<input list="periods" name="period" className="form-control" id="theDatalist" />
								<datalist id="periods">
										<option value="Week"/>
										<option value="Two Weeks"/>
										<option value="Month"/>
								</datalist>
						</div>
						<div className="input-group">
								<input valueLink={this.linkState('amount')} type="number"
								 placeholder="How many BitCoins do you want to commit"/>
								<span className="input-group-addon">BitCoins</span>
						</div>
						<button className="btn btn-success" onClick={this.update}>Go</button>
        </form>
			);
		}
	});

	React.render(<APP2 />, document.getElementById("create"));
};
