# reactSimpleScheduleListPJ
## 스케쥴 관리

### API 와 인터렉션을 통한 데이터 요청 및 응답

```js

1. 메인 화면
2. 메인 화면에 일정 목록 출력
3. 일정 새로운 일정 추가 및 목록에 추가
4. 로딩 상태 (버튼, 목록 등)
5. Firebase 가상 database 활용, 요청 및 응답 테스트

React CSS Html

components
  hooks : 커스텀 훅 관련 폴더
    use-http.js : 일정 목록 요청 및 응답 로직
  NewTask : 새로운 일정 관련 폴더
    TaskForm.js : 일정 추가 form
    NewTask.js : 일정 추가 http post 로직
  Tasks : 목록 및 일정 아이템 관련 폴더
    TaskItem.js
    Tasks.js : default 목록 및 아이템 및 속성 전달 받으면 반환 로직
  UI : form 들어갈 card 관련 폴더
    Section.js : Card setting

Function
TaskForm.js
-submitHandler : 기본 값 방지 및 입력 예외 처리
NewTask.js
-enterTaskHandler : 일정 추가 http post 로직
use-http.js
-sendRequest : get, post http 로직
App.js
-transFormTasks : 일정에 대한 객체 변환에 따른 새로운 배열 생성
-taskAddHandler : setTasks state 로 새로운 일정 추가

```

메인 화면

![simpleScheduleMain](https://user-images.githubusercontent.com/75942405/198401366-7fb493f9-7663-480d-8c29-83b4eec9ab59.png)

일정 추가 및 목록

![addSchedule List02](https://user-images.githubusercontent.com/75942405/198401515-d2047d5b-5770-42d0-b510-41d943859335.png)

Firebase 에 추가된 일정 정보

![fireBasePostData02](https://user-images.githubusercontent.com/75942405/198401606-eac14c8d-b211-4c54-9371-10ae094bf76b.png)

일정 추가 시 버튼 로딩 변환

![buttonIsLoading](https://user-images.githubusercontent.com/75942405/198401783-923c4885-fc7f-4314-8222-d2b3ed07988c.png)

기존 목록 불러오기 로딩

![scheduleListLoading](https://user-images.githubusercontent.com/75942405/198401882-52d5cca1-0e69-4dcc-9dd8-8cee564e9e50.png)


