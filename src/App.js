import React, {useEffect, useState} from 'react';
import useHttp from './components/hooks/use-http'
import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';

function App() {
	const [tasks, setTasks] = useState([])

	/*필요한 구조와 유형을 갖는 객체로 변환*/
	const transFormTasks = (tasksObj) => {
		const loadedTasks = [];
		for(const taskKey in tasksObj) {
			loadedTasks.push({
				id: taskKey,
				text: tasksObj[taskKey].text,
			})
		}
		setTasks(loadedTasks)
	}

	/*requestConfig 에 보내는 객체는 내부에 url 속성이있어야함(커스텀 훅 내부에서 url 속성에 접근하기때문)
	* - 커스텀 훅에있는 isLoading, error 속성과 sendRequest 함수 구조 분해
	* -sendRequest:fetchTasks 별칭*/
	const {isLoading, error, sendRequest:fetchTasks}=useHttp({url: 'https://react-http-d5583-default-rtdb.firebaseio.com/tasks.json'},
			transFormTasks)

	useEffect(() => {
		fetchTasks();
	}, []);


	const taskAddHandler = (task) => {
		setTasks((prevTasks) => prevTasks.concat(task));
	};

	return (
			<React.Fragment>
				<NewTask onAddTask={taskAddHandler}/>
				<Tasks
						items={tasks}
						loading={isLoading}
						error={error}
						onFetch={fetchTasks}
				/>
			</React.Fragment>
	);
}

export default App;
