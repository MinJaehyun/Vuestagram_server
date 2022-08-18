# Today's Improvements

## ToDoList
    * heroku 자동 배포 에러나서 직접 배포: $ git push heroku main 

### 2022/08/18
    1. [v] 전체 게시글 api 

### 2022/08/17
    1. [v] $npm audit fix
    2. [v] id 또는 password 잘못 입력 시, 에러 메시지 유저가 알아보기 쉽게 한글로 변경

### 2022/04/19
    1. [v] post - put(:/id)
    2. [v] post - get(:/id)

### 2022/04/18
    1. [v] fix Duplicated message
    2. [v] posts - delete api 

### 2022/04/16
    1. [v] post get 구현
        - [v] router, get api 설정
    2. [v] 각각의 models 에 timestamps 추가

### 2022/04/15
    1. [v] post create 구현
        - [v] router, create api, model 구현
    2. [v] user 인증을 위한 미들웨어 구현

### 2022/04/14
    1. [v] post crud swagger api 작성 

### 2022/04/11
    1. [v] auth.js - async await 적용 및 try catch 적용하여 status, send 값 제대로 수신
    2. [v] swagger api 적용
        - 배포 서버 접속 시, swagger 문서 출력
        - 문서화 기능은 사용되지만 Test 기능은 오류
            - [v] 코드 개선한 뒤 해결

### 2022/04/10
    1. [v] server 에 있는 id 로 client 에서 회원가입 회원가입 요청 시, 
    server 는 "존재하는 id 입니다" 메시지를 출력한다.
        - [v] res.status(400).send() 에서 res.status(409).send() 로 변경

### 2022/04/08
    1. [v] Heroku 로 배포 테스트

### 2022/04/06
    1. [v] 1_setup: eslint, prettier, .vscode - settings.json
    2. [v] 2_signup: 회원 가입 기능 구현
        - [v] server.js
        - [v] models/UserModel.js
        - [v] api/auth.js - signup api
    3. [v] .env setup