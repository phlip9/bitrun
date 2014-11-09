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

	React.renderComponent(<APP />, document.getElementById("dashboard"));

};

window.setIncentiveReact = function (id) {

	var APP2 = React.createClass({
		mixins: [React.addons.LinkedStateMixin],
		update: function(e) {
			e.preventDefault();
			var obj = {
				km: this.state.km,
				length: this.state.length,
				amount: this.state.amount,
				id: id
			};
			console.log(JSON.stringify(obj));
			window.alert(JSON.stringify(obj));
			return false;
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
            <div>
								<span>I want to run:</span>
                <input valueLink={this.linkState('km')} type="number" />
                <label>{this.state.km}</label>
								<span>km.</span>
            </div>
						<div>
								<span>I want to keep running for:</span>
								<input valueLink={this.linkState('length')} type="number" />
								<label>{this.state.length}</label>
								<span>days.</span>
						</div>
						<div>
								<span>I'm willing to bid:</span>
								<input valueLink={this.linkState('amount')} type="number" />
								<label>{this.state.amount}</label>
								<span>BitCoins.</span>
						</div>
						<button className="btn btn-success" onClick={this.update}>Go</button>
        </form>
			);
		}
	});

	React.renderComponent(<APP2 />, document.getElementById("create"));
};
