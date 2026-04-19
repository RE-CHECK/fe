# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # 개발 서버 실행 (Vite, localhost:5173)
npm run build     # 프로덕션 빌드
npm run lint      # ESLint 검사
npm run preview   # 빌드 결과 미리보기
```

테스트 프레임워크는 없음.

## Architecture

**React 19 + Vite SPA.** 라우팅은 `react-router-dom v7`, 상태관리 라이브러리 없음.

### 라우트 구조

| 경로 | 컴포넌트 | 설명 |
|------|----------|------|
| `/` | `Home` | 랜딩/시작 화면 |
| `/login` | `Login` | 로그인 |
| `/signup` | `Signup` | 회원가입 1단계 (전화번호·이름·학번·단과대·학과·학생증) |
| `/signup2` | `Signup2` | 회원가입 2단계 |
| `/main` | `Main` | 메인 대시보드 |

### 스타일링 규칙

- **CSS Modules 아님** — 각 페이지/컴포넌트마다 동명의 `.css` 파일을 직접 import (`Main.jsx` → `Main.css`)
- **단위: `cqw`** — Figma 원본 프레임 너비 1378px 기준으로 설계됨. 변환 공식: `값px × (100 / 1378) = Ncqw`
- **Container Query** — `.main`에 `container-type: inline-size` 적용. max-width 430px 모바일 레이아웃
- **BEM 네이밍** — `.page__block`, `.page__block--modifier` 패턴 사용
- `aspect-ratio`를 페이지 루트에 쓰면 콘텐츠가 길어질 때 배경이 잘려 하단이 검게 보이므로 사용 금지

### 공유 데이터

`src/data/academicData.js` — 단과대(`colleges`)·학과(`departments`) 고정 목록. API 연동 시 이 파일을 대체 예정. `department.collegeId`로 단과대와 학과를 연결.

### 컴포넌트

`src/components/AlertModal.jsx` — `{ title, desc, onClose }` props를 받는 범용 경고 모달. 오버레이 클릭으로 닫힘.

### 에셋 구조

- `src/assets/icon/` — SVG 아이콘, PNG
- `src/assets/image/` — 배경·일러스트 SVG/PNG (한글 파일명 포함)
- `src/assets/fonts/` — 온글잎 박다현체 TTF (`index.css`에서 `@font-face` 등록)

Figma에서 내보낸 차트 SVG(`chart-group1~3.svg`)는 `width="100%" height="100%"` 속성이 있어 `<img>` 태그 사용 시 반드시 CSS로 명시적 `height`를 지정해야 렌더링됨.

### ESLint

`no-unused-vars` 규칙에서 대문자·언더스코어로 시작하는 변수는 허용 (`varsIgnorePattern: '^[A-Z_]'`).

### 퍼블리싱
- figma-desktop mcp 서버 사용하여 프레임대로 퍼블리싱
- 이미지 파일은 recheck-fe/src/assets 파일에서 찾기

## API 연동
- swagger url : https://api.reajoucheck.site/swagger-ui/index.html#
- bacjend server url : api.reajoucheck.site

## 🪴 Branch Convention (GitHub Flow)

- `main`: 배포 가능한 브랜치, 항상 배포 가능한 상태를 유지
- `develop`: default branch로 변경 (code space), 수정 완료된 코드를 합치는 브랜치
- `page/명칭/#이슈번호`: 화면 UI구성 및 퍼블리싱 작업
- `api/명칭/#이슈번호`: 통신, api연동, 비즈니스 로직 구현 작업
- 브랜치 공유 X → 특수한 경우 팀원들에게 알리기
- 팀원이 짠 코드 리뷰 없이 수정 X → 수정 시 PR 남기고 리뷰 필수
- pr, issue 생성시 .github 파일에 있는 템플릿 형식에 알맞게 생성

## 데이터 추적(GA/GTM) 기술 요구사항
### **1. GTM 스크립트 설치**

- **이유**: 마케터가 개발 도움 없이 버튼 클릭 추적 등을 직접 설정하기 위한 필수 하드웨어 작업입니다.
- **설치 위치**: 모든 페이지의 **`<head>` 최상단**과 **`<body>` 바로 아래**에 각각 GTM 코드 뭉치를 삽입해 주세요.
- **스크립트**
    
    <head>
    
    <!-- Google Tag Manager -->
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    '[https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f)](https://www.googletagmanager.com/gtm.js?id=%27+i+dl;f.parentNode.insertBefore(j,f));
    })(window,document,'script','dataLayer','GTM-PMK9TW4T');</script>
    <!-- End Google Tag Manager -->
    
    <body>
    
    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PMK9TW4T"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->
    

### **2. 버튼별 고유 ID 부여**

- **이유**: GTM이 웹사이트 수많은 버튼 중 "어떤 버튼"이 클릭되었는지 인식하기 위한 이름표(ID)입니다.
- **실행 사항**: 아래 명세서의 `버튼 id`를 해당 HTML `<button>` 태그에 `id` 속성으로 정확히 기입해 주세요.

| **버튼 구분** | **부여할 HTML id 값**  |
| --- | --- |
| 메인화면 회원가입 버튼 | `id="btn-go-signup"` |
| 정보입력 다음 버튼 | `id="btn-signup-step1"` |
| 계정설정 완료 버튼 | `id="btn-signup-finish"` |
| 메인화면 참여하기 버튼 | `id="btn-go-challenge"` |
| 영수증 사진등록 버튼 | `id="btn-upload-receipt"` |
| 영수증 사진 입력하기 버튼 | `id="btn-upload-finish"` |

### **3. User ID 연동**

- **이유**: 가입만 하고 도망가는 유저와, 실제로 영수증을 올려 챌린지에 참여하는 유저를 구분하여 분석하기 위해 필수입니다.
- **실행 사항**: 회원가입 완료 및 로그인 **성공** 시점에 아래 스크립트를 호출해 주세요. (개인정보가 아닌 DB 고유 ID값 전송부탁드립니다) > key값(event, user_id)은 아래랑 똑같이 작성해주세요

```jsx
// 가입/로그인 성공 시점에 실행
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  'event': 'user_auth_success',
  'user_id': '유저_고유_ID'   // 예: DB Index 숫자 '405'
});
```