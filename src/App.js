import logo from './logo.svg';
// import './App.css';
import { React, Component } from 'react';
import PropTypes from 'prop-types';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from "react-router-dom";
import { Redirect } from "react-router-dom";
//import { Router } from 'react-router';
//import PropTypes from 'prop-types';


class MyForm extends Component {
	constructor(props) {

		super(props);

		this.state = {
			redirect: null,
			TimeOfPostmortemExamination: '12:30',

			DateOfPostmortemExamination: '',
			SceneOfDeath: '',
			PoliceStation: '',
			PoliceCaseNo: 0,
			PlaceOfExamination: '',
			Nationality: '',
			InformantRelationToDeceased: '',
			InformantName: '',
			ImformantCidNo: '',
			History: '',
			GeneralExternalInformation: '',
			Dzongkhag: '',
			DeceasedName: '',
			Sex: '',
			CidOrPassport: '',
			Age: 0,
			Address: '',
			Remark: '',
			Isactive: true,
			//Lastchanged: new Date(),
			Transactedby: 'reactapp',
			//Transacteddate: new Date(),
			Id: this.uuidv4()
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	uuidv4() {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
			var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
	}

	handleChange(event) {
		//this.setState({ value: event.target.value });
	}

	async handleSubmit(event) {

		console.log(JSON.stringify(this.state));
		event.preventDefault();

		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

		var raw = "client_id=Wgh93ZfcM4mC5nD&client_secret=80H5Rn1N3XirYjs&grant_type=client_credentials&scope=fhir";

		var requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: raw,
			redirect: 'follow'
		};

		const token = await fetch("https://identityserverfhir.azurewebsites.net/connect/token", requestOptions)
			.then(response => response.text())
			.catch(error => console.log('error', error));
		console.log(JSON.parse(token).access_token);

		var myHeaders2 = new Headers();
		myHeaders2.append("Authorization", "Bearer " + JSON.parse(token).access_token);
		myHeaders2.append("Content-Type", "application/json");

		this.state.TimeOfPostmortemExamination = new Date(2001, 1, 1,
			this.state.TimeOfPostmortemExamination.split(':')[0],
			this.state.TimeOfPostmortemExamination.split(':')[1], 0);
		raw = JSON.stringify(this.state);

		var requestOptions2 = {
			method: 'POST',
			headers: myHeaders2,
			body: raw,
			redirect: 'follow'
		};

		var postResponse = await fetch("http://localhost:6001/api/unnaturaldeaths/post2", requestOptions2)
			.then(response => response.text())
			.catch(error => console.log('error', error));
		console.log(postResponse);

		if (postResponse.indexOf("created") !== -1) {
			this.setState({ redirect: "/unnaturaldeaths" });
		}

	}

	render() {
		if (this.state.redirect) {
			return <Redirect to={this.state.redirect} />
		}

		return (
			<div>
				<Link to={"/unnaturaldeaths"}>Go to List</Link>
				<form onSubmit={this.handleSubmit}>
					<h3>Record an unnatural death</h3>
					{/* <div className="row">
					<div className="col-md-3">
						<label>
							Name:
							<input type="text" value={this.state.value} onChange={this.handleChange} />
						</label>
					</div>
				</div> */}
					<div className="row">
						<div className="col-md-3">
							<div className="form-group">
								<label asp-for="TimeOfPostmortemExamination" className="control-label">Postmortem Examination Time</label>
								<input asp-for="TimeOfPostmortemExamination" placeholder="Time" onChange={(ev) => {


									this.setState({ TimeOfPostmortemExamination: ev.target.value })
								}} className="form-control" value={this.state.TimeOfPostmortemExamination} type="time" required />
								<span asp-validation-for="TimeOfPostmortemExamination" className="text-danger"></span>
							</div>
						</div>
						<div className="col-md-3">
							<div className="form-group">
								<label asp-for="DateOfPostmortemExamination" className="control-label">Postmortem Examination Date</label>
								<input asp-for="DateOfPostmortemExamination" className="form-control" placeholder="Time" onChange={(ev) => { this.setState({ DateOfPostmortemExamination: ev.target.value }) }} value={this.state.DateOfPostmortemExamination} type="datetime-local" required />
								<span asp-validation-for="DateOfPostmortemExamination" className="text-danger"></span>
							</div>
						</div>



						<div className="col-md-3">
							<div className="form-group">
								<label asp-for="SceneOfDeath" className="control-label">Scene of Death</label>
								<input asp-for="SceneOfDeath" onChange={(ev) => { this.setState({ SceneOfDeath: ev.target.value }) }} value={this.state.SceneOfDeath} className="form-control" required/>
								<span asp-validation-for="SceneOfDeath" className="text-danger"></span>
							</div>
						</div>

					</div>
					<div className="row">
						<div className="col-md-3">
							<label asp-for="PoliceStation" className="control-label">Police Station</label>
							<input asp-for="PoliceStation" onChange={(ev) => { this.setState({ PoliceStation: ev.target.value }) }} value={this.state.PoliceStation} className="form-control" />
							<span asp-validation-for="PoliceStation" className="text-danger"></span>
						</div>
						<div className="col-md-3">
							<label asp-for="PoliceCaseNo" className="control-label">Police Case No</label>
							<input asp-for="PoliceCaseNo" onChange={(ev) => { this.setState({ PoliceCaseNo: ev.target.value }) }} value={this.state.PoliceCaseNo} type="number" className="form-control" />
							<span asp-validation-for="PoliceCaseNo" className="text-danger"></span>
						</div>
					</div>
					<div className="row">
						<div className="col-md-3">
							<div className="form-group">
								<label asp-for="PlaceOfExamination" className="control-label">Place Of Examination</label>
								<input asp-for="PlaceOfExamination" onChange={(ev) => { this.setState({ PlaceOfExamination: ev.target.value }) }} value={this.state.PlaceOfExamination} className="form-control" />
								<span asp-validation-for="PlaceOfExamination" className="text-danger"></span>
							</div>
						</div>
						<div className="col-md-3">
							<div className="form-group">
								<label asp-for="Nationality" className="control-label">Nationality</label>
								<input asp-for="Nationality" onChange={(ev) => { this.setState({ Nationality: ev.target.value }) }} value={this.state.Nationality} className="form-control" />
								<span asp-validation-for="Nationality" className="text-danger"></span>
							</div>
						</div>
						<div className="col-md-3">
							<div className="form-group">
								<label asp-for="InformantRelationToDeceased" className="control-label">Relation of the Informant To the Deceased</label>
								<input asp-for="InformantRelationToDeceased" onChange={(ev) => { this.setState({ InformantRelationToDeceased: ev.target.value }) }} value={this.state.InformantRelationToDeceased} className="form-control" />
								<span asp-validation-for="InformantRelationToDeceased" className="text-danger"></span>
							</div>
						</div>
						<div className="col-md-3">
							<div className="form-group">
								<label asp-for="InformantName" className="control-label">Name of the informant</label>
								<input asp-for="InformantName" onChange={(ev) => { this.setState({ InformantName: ev.target.value }) }} value={this.state.InformantName} className="form-control" />
								<span asp-validation-for="InformantName" className="text-danger"></span>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-md-3">
							<div className="form-group">
								<label asp-for="ImformantCidNo" className="control-label">CID of the Informant</label>
								<input asp-for="ImformantCidNo" onChange={(ev) => { this.setState({ ImformantCidNo: ev.target.value }) }} value={this.state.ImformantCidNo} className="form-control" />
								<span asp-validation-for="ImformantCidNo" className="text-danger"></span>
							</div>
						</div>
						<div className="col-md-3">
							<div className="form-group">
								<label asp-for="History" className="control-label">History</label>
								<input asp-for="History" onChange={(ev) => { this.setState({ History: ev.target.value }) }} value={this.state.History} className="form-control" />
								<span asp-validation-for="History" className="text-danger"></span>
							</div>
						</div>
						<div className="col-md-3">
							<div className="form-group">
								<label asp-for="GeneralExternalInformation" className="control-label">General External Information</label>
								<input asp-for="GeneralExternalInformation" onChange={(ev) => { this.setState({ GeneralExternalInformation: ev.target.value }) }} value={this.state.GeneralExternalInformation} className="form-control" />
								<span asp-validation-for="GeneralExternalInformation" className="text-danger"></span>
							</div>
						</div>
						<div className="col-md-3">
							<div className="form-group">
								<label lang="dz" asp-for="Dzongkhag" className="control-label">Dzongkhag</label>
								<input asp-for="Dzongkhag" onChange={(ev) => { this.setState({ Dzongkhag: ev.target.value }) }} value={this.state.Dzongkhag} className="form-control" lang="dz" required/>
								<span asp-validation-for="Dzongkhag" className="text-danger"></span>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-md-3">
							<div className="form-group">
								<label asp-for="DeceasedName" className="control-label">Name of the Deceased</label>
								<input asp-for="DeceasedName" onChange={(ev) => { this.setState({ DeceasedName: ev.target.value }) }} value={this.state.DeceasedName} className="form-control" required/>
								<span asp-validation-for="DeceasedName" className="text-danger"></span>
							</div>
						</div>
						<div className="col-md-3">


							<div className="form-group">
								<label asp-for="Sex" className="control-label">Gender</label>
								<select asp-for="Sex" onChange={(ev) => { this.setState({ Sex: ev.target.value }) }} value={this.state.Sex} className="form-control" required>
									<option value="Select">Select Gender</option>
									<option value="F">Female</option>
									<option value="M">Male</option>
									<option value="O">Other</option>
								</select>
								<span asp-validation-for="Sex" className="text-danger"></span>
							</div>

						</div>
						<div className="col-md-3">
							<div className="form-group">
								<label asp-for="CidOrPassport" className="control-label">CID/Passport Number</label>
								<input asp-for="CidOrPassport" onChange={(ev) => { this.setState({ CidOrPassport: ev.target.value }) }} value={this.state.CidOrPassport} className="form-control" />
								<span asp-validation-for="CidOrPassport" className="text-danger"></span>
							</div>
						</div>
						<div className="col-md-3">
							<div className="form-group">
								<label asp-for="Age" className="control-label">Age</label>
								<input asp-for="Age" onChange={(ev) => { this.setState({ Age: ev.target.value }) }} value={this.state.Age} type="number" className="form-control" required />
								<span asp-validation-for="Age" className="text-danger"></span>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-md-3">
							<div className="form-group">
								<label asp-for="Address" className="control-label">Address</label>
								<input asp-for="Address" onChange={(ev) => { this.setState({ Address: ev.target.value }) }} value={this.state.Address} className="form-control" />
								<span asp-validation-for="Address" className="text-danger"></span>
							</div>
						</div>


						<div className="col-md-3">
							<div className="form-group">
								<label asp-for="Remark" className="control-label">Remark</label>
								<input asp-for="Remark" onChange={(ev) => { this.setState({ Remark: ev.target.value }) }} value={this.state.Remark} className="form-control" />
								<span asp-validation-for="Remark" className="text-danger"></span>
							</div>
						</div>

					</div>

					<input type="submit" className="btn btn-primary" value="Submit" />
					<Link to={"/unnaturaldeaths"} className="btn btn-danger">Cancel</Link>
				</form>
			</div>
		);
	}
}



const routes = [
	{
		path: "/",
		exact: true,
		sidebar: () => <div></div>,
		main: () => <div>
			<MyForm />
		</div>
	},

	{
		path: "/unnaturaldeaths",
		sidebar: () => <div></div>,
		main: () => <div>
			<UnnaturalDeathsList initialUnnaturalDeathData={[]} initialData={[]} unnaturalDeathData={[]} accessToken={""} pollInterval={"5000"} />
			{/* <UserList initialUserData={[]} initialData={[]} userData={[]} accessToken={""} pollInterval={"5000"} /> */}
		</div>
	}
];

function Greeting(props) {
	const isLoading = props.isLoading;
	if (isLoading) {
		return <div id="loadingLabel">
			<h5>Loading...</h5>
		</div>;
	}
	else {
		return <div></div>;
	}

}





class CommentBox extends Component {
	state = {
		data: this.props.initialData,
		userData: this.props.initialUserData,
		accessToken: this.props.accessToken,
		showLoading: false
	};

	componentDidMount() {

	}

	render() {

		return (

			<Router>
				<div>
					<nav className="navbar navbar-expand-md bg-dark navbar-dark">

						<a className="navbar-brand" href="#">ePIS Prototype</a>


						<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
							<span className="navbar-toggler-icon"></span>
						</button>
						<div className="collapse navbar-collapse" id="collapsibleNavbar">
							<ul className="navbar-nav">
								<li className="navbar-item">
									<Link className="nav-link" to="/">Record an Unnatural Death</Link>
								</li>

								<li className="navbar-item">
									<Link className="nav-link" to="/unnaturaldeaths">List of Unnatural Deaths</Link>
								</li>
							</ul>
						</div>
					</nav>

					<Switch>
						{routes.map((route, index) => (
							// You can render a <Route> in as many places
							// as you want in your app. It will render along
							// with any other <Route>s that also match the URL.
							// So, a sidebar or breadcrumbs or anything else
							// that requires you to render multiple things
							// in multiple places at the same URL is nothing
							// more than multiple <Route>s.
							<Route
								key={index}
								path={route.path}
								exact={route.exact}
								children={<route.sidebar />}
							/>
						))}
					</Switch>
				</div>

				<div style={{ flex: 1, padding: "10px" }}>
					<Switch>
						{routes.map((route, index) => (
							// Render more <Route>s with the same paths as
							// above, but different components this time.
							<Route
								key={index}
								path={route.path}
								exact={route.exact}
								children={<route.main />}
							/>
						))}
					</Switch>
				</div>


			</Router>
		);
	}
}

class Welcome extends Component {
	render() {
		return <h1>Hello, {this.props.name}</h1>;
	}
}

class CommentList extends Component {
	render() {
		var commentNodes = this.props.data.map(function (comment) {
			return (
				<Comment author={comment.author} key={comment.id}>
					{comment.text}
				</Comment>
			);
		});
		return <div className="commentList">{commentNodes}</div>;
	}
}

class UnnaturalDeathsList extends Component {
	state = {
		data: this.props.initialData,
		unnaturalDeathData: this.props.initialUnnaturalDeathData,
		accessToken: this.props.accessToken,
		showLoading: false
	};

	getTokenAndCallAPI = async () => {
		console.log("Loading data...");
		this.setState({ showLoading: true });
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

		var raw = "client_id=Wgh93ZfcM4mC5nD&client_secret=80H5Rn1N3XirYjs&grant_type=client_credentials&scope=fhir";

		var requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: raw,
			redirect: 'follow'
		};

		const token = await fetch("https://identityserverfhir.azurewebsites.net/connect/token", requestOptions)
			.then(response => response.text())
			.catch(error => console.log('error', error));
		//		console.log(JSON.parse(token).access_token);

		var myHeaders2 = new Headers();
		myHeaders2.append("Authorization", "Bearer " + JSON.parse(token).access_token);

		var userData2;

		var requestOptions2 = {
			method: 'GET',
			headers: myHeaders2,
			redirect: 'follow'
		};

		let headers = { 'Accept': 'application/json', };
		headers["Authorization"] = 'Bearer ' + JSON.parse(token).access_token;

		await fetch("http://localhost:6001/api/unnaturaldeaths", { headers, })
			.then(response => response.text())
			.then(result => {
				//				console.log(result);
				userData2 = result;
				this.setState({ unnaturalDeathData: JSON.parse(userData2), showLoading: false });

			})
			.catch(error => console.log('error', error));


	}

	loadCommentsFromServer = async () => {

		await this.getTokenAndCallAPI();

	};



	componentDidMount() {
		window.setTimeout(this.loadCommentsFromServer, this.props.pollInterval);
	}

	render() {
		const unnaturalDeathData = this.state.unnaturalDeathData.map(({ deceasedName, timeOfPostmortemExamination, dateOfPostmortemExamination, id }) => ({ deceasedName, timeOfPostmortemExamination, dateOfPostmortemExamination, id }));

		return (
			<div className="container">
				<Greeting isLoading={this.state.showLoading} />
				<div className="row">
					<div className="col-md-8">
						<h3>Unnatural Deaths</h3>
						<table className="table-bordered table-striped">
							<thead>
								<tr style={{ fontWeight: "bold" }}>
									<td>Name of the deceased</td>
									<td>Time of Postmartem</td>
									<td>Date of postmartem</td>
								</tr>
							</thead>
							<tbody>
								{unnaturalDeathData.map((row, index) => (
									<tr key={row.id}>
										<td>{row.deceasedName}</td>
										<td>{row.timeOfPostmortemExamination.split("T")[1]}</td>
										<td>{row.dateOfPostmortemExamination}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		)
	}
}

class UserList extends Component {
	state = {
		data: this.props.initialData,
		userData: this.props.initialUserData,
		accessToken: this.props.accessToken,
		showLoading: false
	};

	getTokenAndCallAPI = async () => {
		console.log("Loading data...");
		this.setState({ showLoading: true });
		window.setTimeout(function () { }, 1000);
		// Get access token to the API. 
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "text/plain");

		var raw = "grant_type=password&username=phonixadmin&password=Admin_123";

		var requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: raw,
			redirect: 'follow'
		};

		var userData2;

		if (this.state.accessToken.length == 0) {
			const token = await fetch("http://localhost/disha2adminapi/api/ApplicationUser/GetToken?userName=phonixadmin&password=Admin_123", requestOptions)
				.then(response => response.text())
				.catch(error => console.log('error', error));



			console.log("Token response: " + token);

			this.setState({ accessToken: JSON.parse(token).access_token });
		}

		let headers = { 'Accept': 'application/json', };
		if (this.state.accessToken) {
			headers["Authorization"] = `Bearer ${this.state.accessToken}`;
		}
		//console.log(headers);


		fetch("http://localhost/disha2adminapi/api/applicationuser/getinfolist", { headers, })
			.then(response => response.text())
			.then(result => {
				//console.log(result);
				userData2 = result;
				this.setState({ userData: JSON.parse(userData2), showLoading: false });

			})
			.catch(error => console.log('error', error));
	}

	loadCommentsFromServer = async () => {

		await this.getTokenAndCallAPI();

	};

	handleCommentSubmit = comment => {
		var comments = this.state.data;
		// Optimistically set an id on the new comment. It will be replaced by an
		// id generated by the server. In a production application you would likely
		// not use Date.now() for this and would have a more robust system in place.
		comment.id = Date.now();
		var newComments = comments.concat([comment]);
		this.setState({ data: newComments });

		var data = new FormData();
		data.append('author', comment.author);


		data.append('text', comment.text + " ");

		var xhr = new XMLHttpRequest();
		xhr.open('post', this.props.submitUrl, true);
		xhr.onload = function () {
			this.loadCommentsFromServer();
		}.bind(this);
		xhr.send(data);
	};

	componentDidMount() {
		window.setInterval(this.loadCommentsFromServer, this.props.pollInterval);
	}

	render() {
		const userData = this.state.userData.map(({ name, firstName, lastName, email, mobileNo, userId }) => ({ name, firstName, lastName, email, mobileNo }));

		return (
			<div className="container">
				<div className="row">
					<div className="col-md-8">
						<h3>List of Users</h3>
						<table className="table-bordered table-striped">
							<thead>
								<tr style={{ fontWeight: "bold" }}>
									<td>Name</td>
									<td>Mobile</td>
									<td>Email</td>
								</tr>
							</thead>
							<tbody>
								{userData.map((row, index) => (
									<tr key={index}>
										<td>{row.name}</td>
										<td>{row.mobileNo}</td>
										<td>{row.email}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		)
	}
}



function createRemarkable() {
	var remarkable =
		'undefined' != typeof global && global.Remarkable
			? global.Remarkable
			: window.Remarkable;

	return new remarkable();
}

class Comment extends Component {
	rawMarkup = () => {
		var md = createRemarkable();
		var rawMarkup = md.render(this.props.children.toString());
		return { __html: rawMarkup };
	};

	render() {
		return (
			<div className="comment">
				<h2 className="commentAuthor">{this.props.author}</h2>
				<span dangerouslySetInnerHTML={this.rawMarkup()} />
			</div>
		);
	}
}

class User extends Component {

	render() {
		return (
			<div className="comment">
				<h4 className="commentAuthor">{this.props.name}</h4>
				<h5>{this.props.mobile}</h5>
			</div>
		);
	}
}


function App() {
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					Edit <code>src/App.js</code> and save to reload.
				</p>
				<a
					className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					Learn React faster
				</a>
			</header>
		</div>
	);
}

export default CommentBox;
