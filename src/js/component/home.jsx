import { element } from "prop-types";
import React, { useState, useEffect } from "react";

//create your first component
const Home = () => {
	const [task, setTask] = useState("");
	const [todo, setTodo] = useState([]);
	const agregartask = () => {
		if (task !== "") {
			setTodo([...todo, { label: task, done: false }]);
			setTask("");
			actualizartask([...todo, { label: task, done: false }]);
		}
	};
	const eliminartask = index => {
		let todofiltrados = todo.filter((element, i) => {
			if (index !== i) {
				return element;
			}
		});
		setTodo(todofiltrados);
		actualizartask(todofiltrados);
	};
	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/kevinbullor")
			.then(response => response.json())
			.then(data => setTodo(data));
	}, []);
	const actualizartask = task => {
		let url =
			"https://assets.breatheco.de/apis/fake/todos/user/kevinbullor";
		let data = task;

		fetch(url, {
			method: "PUT",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(res => res.json())
			.catch(error => console.error("Error:", error))
			.then(response => console.log("Success:", response));
	};
	return (
		<div className="container">
			<h2 className="fst-italic text-white-50 bg-dark">To-do list</h2>
			<div className="row g-3 align-items-center">
				<div className="col-10">
					<input
						className="form-control"
						type="text"
						onChange={e => setTask(e.target.value)}
						value={task}
					/>
				</div>
				<div className="col-2">
					<button
						className="btn btn-outline-dark w-100"
						onClick={agregartask}>
						Add Task
					</button>
				</div>
			</div>
			<ul>
				{todo.map((item, index) => (
					<li className="text-secondary" key={index}>
						{item.label}{" "}
						<span onClick={() => eliminartask(index)}>
							<i className="far fa-trash-alt"></i>
						</span>
					</li>
				))}
			</ul>
			{todo.length > 0 && (
				<span className="text-secondary">
					tareas por hacer: {todo.length}
				</span>
			)}
			{todo.length == 0 && (
				<span className="text-secondary">No hay tareas por hacer</span>
			)}
		</div>
	);
};
export default Home;
