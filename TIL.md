# Today's Improvements

## ToDoList

### 2022/04/10
    1. [v] server 에 있는 id 로 client 에서 회원가입 회원가입 요청 시, 
    server 는 "존재하는 id 입니다" 메시지를 출력한다.
        - res.status(400).send() 에서 res.status(409).send() 로 변경

### 2022/04/08
    1. [v] Heroku 로 배포 테스트

### 2022/04/06
    1. [v] 1_setup: eslint, prettier, .vscode - settings.json
    2. [v] 2_signup: 회원 가입 기능 구현
        - [v] server.js
        - [v] models/UserModel.js
        - [v] api/auth.js - signup api
    3. [v] .env setup