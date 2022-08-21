import useHttp from '../hooks/use-http'
import Section from '../UI/Section';
import TaskForm from './TaskForm';

const NewTask = (props) => {
	const {isLoading, error, sendRequest: sendTaskRequest} = useHttp()
	/*const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);*/

	const createTask = (taskText, taskData) => {
		const generatedId = taskData.name; // firebase-specific => "name" contains generated id
		const createdTask = {id: generatedId, text: taskText};

		props.onAddTask(createdTask);
	}

	/*Firebase 에 data 저장하려는 post 요청이 전송됨
	* -TaskForm 이 최종적으로 제출될때 트리거됨
	* -버튼이 클릭되고 입력된 값이 검증되는 시점*/
	const enterTaskHandler = async (taskText) => {
		sendTaskRequest({
					url: 'https://react-http-d5583-default-rtdb.firebaseio.com/tasks.json',
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: {text: taskText},
				}, createTask.bind(null, taskText)
				/*createTask 에있는 taskText 인자를 enterTaskHandler 에서 사용하려면 bind 해줘야한다
				*-bind 는 Fn 를 사전에 구성할수있게해주며 호출 즉시 함수가 실행되지 않음
				*--두번째 인자는 호출 예정인 함수가 받는 첫 번째 인자가 됨*/
		)
		/* setIsLoading(true);
		 setError(null);
		 try {
			 const response = await fetch(
				 'https://react-http-d5583-default-rtdb.firebaseio.com/tasks.json',
				 {
					 method: 'POST',
					 body: JSON.stringify({ text: taskText }),
					 headers: {
						 'Content-Type': 'application/json',
					 },
				 }
			 );

			 if (!response.ok) {
				 throw new Error('Request failed!');
			 }

			 const data = await response.json();

		 } catch (err) {
			 setError(err.message || 'Something went wrong!');
		 }
		 setIsLoading(false);
 */
	}

	return (
			<Section>
				<TaskForm onEnterTask={enterTaskHandler} loading={isLoading}/>
				{error && <p>{error}</p>}
			</Section>
	);
};

export default NewTask;
