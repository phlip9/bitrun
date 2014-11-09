/*** @jsx React.DOM */

window.renderIncentiveReact = function(incentive) {

	var APP = React.createClass({displayName: 'APP',
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
				React.createElement("div", null, 
					React.createElement("div", {className: "row page-header thin"}, 
						"Your Goal: Run ", this.props.km, " km in ", this.props.days, " days"
					), 
					React.createElement("div", {className: "row"}, 
						React.createElement("div", {className: "col-md-6"}, 
							React.createElement("div", {className: "row"}, "Created On: ", this.props.create), 
							React.createElement("div", {className: "row"}, "Expires On: ", this.props.expire), 
							React.createElement("div", {className: "row"}, "Bitcoins Bid: ", this.props.amount), 
							React.createElement("div", {className: "row"}, "Percent Done: ", this.state.percent)
						), 
						React.createElement("div", {className: "col-md-6"}, 
							React.createElement("div", null, "Analytics"), 
							React.createElement("div", null, "This should be a D3 fancy graph"), 
							React.createElement("button", {onClick: "createSocketConnection()"})
						)
					)
				)
			);
		}
	});

	React.renderComponent(React.createElement(APP, null), document.getElementById("dashboard"));

};

window.setIncentiveReact = function (id) {

	var APP2 = React.createClass({displayName: 'APP2',
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
        React.createElement("form", null, 
            React.createElement("div", null, 
								React.createElement("span", null, "I want to run:"), 
                React.createElement("input", {valueLink: this.linkState('km'), type: "number"}), 
                React.createElement("label", null, this.state.km), 
								React.createElement("span", null, "km.")
            ), 
						React.createElement("div", null, 
								React.createElement("span", null, "I want to keep running for:"), 
								React.createElement("input", {valueLink: this.linkState('length'), type: "number"}), 
								React.createElement("label", null, this.state.length), 
								React.createElement("span", null, "days.")
						), 
						React.createElement("div", null, 
								React.createElement("span", null, "I'm willing to bid:"), 
								React.createElement("input", {valueLink: this.linkState('amount'), type: "number"}), 
								React.createElement("label", null, this.state.amount), 
								React.createElement("span", null, "BitCoins.")
						), 
						React.createElement("button", {className: "btn btn-success", onClick: this.update}, "Go")
        )
			);
		}
	});

	React.renderComponent(React.createElement(APP2, null), document.getElementById("create"));
};
