import React, {useEffect, useState, useCallback} from 'react';
import useHttp from './components/hooks/use-http'
import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';

function App() {
	const [tasks, setTasks] = useState([])

	/*requestConfig 에 보내는 객체는 내부에 url 속성이있어야함(커스텀 훅 내부에서 url 속성에 접근하기때문)
	* - 커스텀 훅에있는 isLoading, error 속성과 sendRequest 함수 구조 분해
	* -sendRequest:fetchTasks 별칭*/
	const {isLoading, error, sendRequest: fetchTasks} = useHttp()

	/*의존성으로 추가,컴포넌트 함수 안에서 설정된 모든 데이터, 또는 함수는 그 함수의 의존성으로서 추가되어야 하기 때문
	* -무한 루프 발생 주의, sendRequest 에서 state 들이 업데이트될때마다 의존성 주입된 sendRequest 가 계속해서 업데이트 렌더링을하고 반복반복
	* --이럴때 sendRequest 함수 및 의존성 추가된 객체 및 함수에 연결된 함수에도 useCallback 함수로 감싸주면된다 */
	useEffect(() => {
	/*아래와 같이 코드를 짠다면 useHttp 에서는 의존성이나 매개변수 없이도 호출이 가능
	* -요청에 대한 설정과 데이터 전송 후 적용되야할 데이터 변환을 직접 보내기 때문*/
		/*필요한 구조와 유형을 갖는 객체로 변환*/
		const transFormTasks = (tasksObj) => {
			const loadedTasks = [];
			for (const taskKey in tasksObj) {
				loadedTasks.push({
					id: taskKey,
					text: tasksObj[taskKey].text,
				})
			}
			setTasks(loadedTasks)
		} /*외부에서 어떤것도 사용하지 않기때문에 의존성 주입이 필요없다, 이렇게 설정하므로 불변성이 보장됨*/
		fetchTasks({ /*sendRequest 함수에 인자로 requestConfig 를 넣었으니 여기에 객체 전달하도록함*/
			url: 'https://react-http-d5583-default-rtdb.firebaseio.com/tasks.json'
		},transFormTasks);
	}, [fetchTasks]);


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
