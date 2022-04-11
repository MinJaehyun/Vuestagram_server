# Today's Improvements

## ToDoList

### 2022/04/10
    1. [v] server 에 있는 id 로 client 에서 회원가입 회원가입 요청 시, 
    server 는 "존재하는 id 입니다" 메시지를 출력한다.
        - [v] res.status(400).send() 에서 res.status(409).send() 로 변경
        - [v] async await 적용 및 try catch 적용하여 status, send 값 제대로 수신 
    2 [v] swagger api 적용
        - 배포 서버 접속 시, swagger 문서 출력
        - FIXME: 문서화는 됐으나, Test 기능 오류

### 2022/04/08
    1. [v] Heroku 로 배포 테스트

### 2022/04/06
    1. [v] 1_setup: eslint, prettier, .vscode - settings.json
    2. [v] 2_signup: 회원 가입 기능 구현
        - [v] server.js
        - [v] models/UserModel.js
        - [v] api/auth.js - signup api
    3. [v] .env setup