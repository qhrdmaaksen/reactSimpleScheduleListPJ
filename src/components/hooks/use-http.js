import {useState} from "react";

const useHttp = (requestConfig, applyData) => {/*requestConfig : url 을 포함한 어떤 종류의 설정 사항도 포함할수 있는 객체가되어야함*/
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	/*get,post 두 개의 요청을 동시 처리 가능한 커스텀 훅*/
	const sendRequest = async () => {
		setIsLoading(true);
		setError(null);
		try {
			const response = await fetch(
					/*하드 코딩 url 'https://react-http-d5583-default-rtdb.firebaseio.com/tasks.json'*/
					/*hook 을 호출할때 url addr 을 담은 url 속성을 가진 객체를 전달해야하기때문
					* -두 번째 인자로 fetch 객체*/
					requestConfig.url, {
						method: requestConfig.method ? requestConfig.method : 'GET',/*요청에 따른 분류*/
						headers: requestConfig.headers ? requestConfig : {}, /*헤더가 적용되있는지 확인*/
						/*JSON 변환은 훅 안에서 수행되지만 본문은 훅 바깥에서 넘어온다*/
						body: requestConfig.body ? JSON.stringify(requestConfig.body) : null, /*본문 설정되있다면 JSON 형식으로 변환, 아니라면 null*/
					}
			);

			if (!response.ok) {
				throw new Error('sendRequest ::: Request failed!');
			}

			/*데이터를 가져오면 이 훅을 사용하는 컴포넌트로부터 얻은 함수를 실행해서 그 함수에 데이터를 넘기는 방법을 사용할 것*/
			const data = await response.json();
			applyData(data)/*데이터를 가져오면 applyData 를 호출해서 데이터 전달*/

		} catch (err) {
			setError(err.message || 'Something went wrong!');
		}
		setIsLoading(false);
	};
	return {
		isLoading,
		error,
		sendRequest,
	}
}
export default useHttp;