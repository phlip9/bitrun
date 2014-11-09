/*** @jsx React.DOM */

window.renderIncentiveReact = function(incentive) {

	var APP = React.createClass({displayName: 'APP',
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
				React.createElement("div", null, 
					React.createElement("div", {className: "row page-header thin", id: "thePageHeader"}, 
						"Your Goal: Run ", this.props.goal, " km in ", this.props.repeat, " days."
					), 
					React.createElement("div", {className: "row"}, 
						React.createElement("div", {className: "col-md-6"}, 
							React.createElement("div", {className: "row thin bg-primary data-row"}, "Created On: ", this.props.create), 
							React.createElement("div", {className: "row thin bg-primary data-row"}, "Expires On: ", this.props.expire), 
							React.createElement("div", {className: "row thin bg-primary data-row"}, "Bitcoins Bid: ", this.props.amount), 
							React.createElement("div", {className: "row thin bg-primary data-row"}, "Percent Done: ", this.state.percent)
						), 
						React.createElement("div", {className: "col-md-6"}, 
							React.createElement("div", {className: "row thin bg-primary data-row"}, "Analytics"), 
							React.createElement("div", {className: "row thin bg-primary data-row"}, "This should be a D3 fancy graph"), 
							React.createElement("button", {className: "row thin btn btn-primary data-row", onClick: function(){window.alert("Sorry, the Developer sucks.")}}, "Real Time Data"), 
							React.createElement("div", {id: "socketChart", style: {'display': 'none'}}, "Fuck!")
						)
					)
				)
			);
		}
	});

	React.render(React.createElement(APP, null), document.getElementById("dashboard"));

};

window.setIncentiveReact = function () {

	var APP2 = React.createClass({displayName: 'APP2',
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
        React.createElement("form", {className: "myForm"}, 
            React.createElement("div", {className: "input-group row formRow"}, 
                React.createElement("input", {valueLink: this.linkState('goal'), type: "text", 
								 placeholder: "How many kms do you wanna run?", 
								 className: "form-control", required: true}), 
								React.createElement("span", {className: "input-group-addon"}, "km")
            ), 
						React.createElement("div", {className: "input-group row formRow"}, 
								React.createElement("span", {className: "input-group-addon"}, "Period:"), 
								React.createElement("input", {list: "periods", name: "period", className: "form-control", 
								 ref: "every", placeholder: "How long should one period be?", required: true}), 
								React.createElement("datalist", {id: "periods"}, 
										React.createElement("option", {value: "weekly"}), 
										React.createElement("option", {value: "every_two_weeks"}), 
										React.createElement("option", {value: "monthly"}), 
										React.createElement("option", {value: "yearly"})
								)
						), 
						React.createElement("div", {className: "input-group row formRow"}, 
								React.createElement("input", {valueLink: this.linkState('amount'), type: "text", 
								 placeholder: "How many BitCoins do you want to commit?", 
								 className: "form-control", required: true}), 
								React.createElement("span", {className: "input-group-addon"}, "BitCoins")
						), 
						React.createElement("div", {className: "input-group row formRow"}, 
								React.createElement("input", {list: "currencyList", name: "currencylst", className: "form-control", 
								ref: "curr", placeholder: "BitCoin or US Dollar?", onChange: this.change, 
								required: true}), 
								React.createElement("datalist", {id: "currencyList"}, 
										React.createElement("option", {value: "BTC"}), 
										React.createElement("option", {value: "USD"})
								), 
								React.createElement("span", {className: "input-group-addon"}, this.state.currency)
						), 
						React.createElement("div", {className: "row formRow"}, 
							React.createElement("button", {className: "btn btn-primary", onClick: this.update}, "Incentivize")
						)
        )
			);
		}
	});

	React.render(React.createElement(APP2, null), document.getElementById("create"));
};
