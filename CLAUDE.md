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
- 단과대별 마스코트는 전부 다름
  - 경영대학 : 하늘색 
  - 공과대학 : 회색
  - 소프트웨어융합대학 : 남색
  - 첨단ICT융합대학, 인문대학, 자연과학대학, 다산학부(학과) : 남색
  - 약학대학, 첨단바이오융합대학 : 하늘색
  - 사회과학대학 : 베이지
  - 간호대학 : 핑크
  - 의과대학 : 검정

# API 연동
# ReCheck API 명세서

> **docs/API.md 참고**

> **Base URL**: `https://api.reajoucheck.site` 
> **Content-Type**: `application/json` (파일 업로드 제외)
> **인증**: `Authorization: Bearer {accessToken}` 헤더 사용

---

## 공통 응답 형식

모든 API는 아래 형식으로 응답합니다.

```json
{
  "success": true,
  "code": 200,
  "message": "요청이 성공적으로 처리되었습니다.",
  "data": { }
}
```

### 에러 응답

```json
{
  "success": false,
  "code": 401,
  "message": "에러 메시지",
  "data": null
}
```

| HTTP 상태 | 상황 |
|-----------|------|
| `400` | 요청값 검증 실패 |
| `401` | 인증 토큰 없음 / 만료 / 유효하지 않음 |
| `404` | 리소스 없음 |
| `409` | 중복 데이터 |
| `500` | 서버 오류 |

---

## 인증 (Auth)

### 로그인

**POST** `/api/auth/login`

**Request Body**
```json
{
  "username": "user123",
  "password": "password123"
}
```

**Response**
```json
{
  "success": true,
  "code": 200,
  "message": "요청이 성공적으로 처리되었습니다.",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiJ9..."
  }
}
```

**에러 케이스**
| 상태 | 메시지 |
|------|--------|
| `401` | 아이디 또는 비밀번호가 올바르지 않습니다. |

---

### 회원가입

**POST** `/api/auth/register`

> `Content-Type: multipart/form-data`

**Request (multipart/form-data)**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `request` | JSON (application/json part) | O | 아래 JSON 형식 |
| `studentCardImage` | File | O | 학생증 이미지 (.jpg, .jpeg, .png, .gif, .webp / 최대 5MB) |

`request` JSON 형식:
```json
{
  "username": "user123",
  "password": "password123",
  "passwordConfirm": "password123",
  "name": "홍길동",
  "phoneNumber": "010-1234-5678",
  "studentNumber": 2023301001,
  "departmentId": 3
}
```

**Response**
```json
{
  "success": true,
  "code": 200,
  "message": "요청이 성공적으로 처리되었습니다.",
  "data": null
}
```

**에러 케이스**
| 상태 | 메시지 |
|------|--------|
| `400` | 비밀번호가 일치하지 않습니다. |
| `409` | 이미 사용 중인 아이디입니다. |

---

### 아이디 중복 확인

**GET** `/api/auth/check-username?username={username}`

**Query Parameter**

| 파라미터 | 타입 | 필수 | 설명 |
|----------|------|------|------|
| `username` | String | O | 중복 확인할 아이디 |

**Response**
```json
{
  "success": true,
  "code": 200,
  "message": "요청이 성공적으로 처리되었습니다.",
  "data": null
}
```

> 사용 가능한 아이디면 `200`, 중복이면 `409` 반환

**에러 케이스**
| 상태 | 메시지 |
|------|--------|
| `409` | 이미 사용 중인 아이디입니다. |

---

## 단과대 / 학과 (Colleges)

### 단과대 목록 조회

**GET** `/api/colleges`

**Response**
```json
{
  "success": true,
  "code": 200,
  "message": "요청이 성공적으로 처리되었습니다.",
  "data": [
    { "id": 1, "name": "공과대학" },
    { "id": 2, "name": "소프트웨어융합대학" },
    { "id": 3, "name": "경영대학" }
  ]
}
```

---

### 학과 목록 조회

**GET** `/api/colleges/{collegeId}/departments`

**Path Parameter**

| 파라미터 | 타입 | 설명 |
|----------|------|------|
| `collegeId` | Long | 단과대 ID |

**Response**
```json
{
  "success": true,
  "code": 200,
  "message": "요청이 성공적으로 처리되었습니다.",
  "data": [
    { "id": 1, "name": "컴퓨터공학과" },
    { "id": 2, "name": "전자공학과" }
  ]
}
```

---

## 영수증 (Receipts)

### 영수증 OCR 분석

**POST** `/api/receipts/analyze` `🔒 인증 필요`

> `Content-Type: multipart/form-data`

영수증 이미지를 OCR로 분석하여 결제 정보를 반환합니다. S3 업로드 및 DB 저장은 하지 않습니다.
사용자가 OCR 결과를 확인한 뒤 `/confirm`을 호출해야 최종 저장됩니다.

**Request (multipart/form-data)**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `image` | File | O | 영수증 이미지 (.jpg, .jpeg, .png, .gif, .webp / 최대 5MB) |

**Response**
```json
{
  "success": true,
  "code": 200,
  "message": "요청이 성공적으로 처리되었습니다.",
  "data": {
    "storeName": "사랑집4",
    "paymentAmount": 15000,
    "cardCompany": "국민카드",
    "confirmNum": "12345678"
  }
}
```

**에러 케이스**
| 상태 | 메시지 |
|------|--------|
| `400` | 지원하지 않는 카드사 입니다. (국민카드만 허용) |
| `409` | 이미 등록된 영수증입니다. |

---

### 영수증 업로드 확정

**POST** `/api/receipts/confirm` `🔒 인증 필요`

> `Content-Type: multipart/form-data`

OCR 분석 결과를 사용자가 확인한 후 호출합니다. 이미지를 S3에 업로드하고 DB에 저장합니다.

**Request (multipart/form-data)**

| 필드 | 타입 | Content-Type | 필수 | 설명 |
|------|------|--------------|------|------|
| `image` | File | - | O | 영수증 이미지 (.jpg, .jpeg, .png, .gif, .webp / 최대 5MB) |
| `data` | JSON | `application/json` | O | `/analyze` 응답의 OCR 결과 |

`data` JSON 형식:
```json
{
  "storeName": "사랑집4",
  "paymentAmount": 15000,
  "cardCompany": "국민카드",
  "confirmNum": "12345678"
}
```

**Response**
```json
{
  "success": true,
  "code": 200,
  "message": "요청이 성공적으로 처리되었습니다.",
  "data": {
    "imageUrl": "https://recheck-bucket.s3.ap-northeast-2.amazonaws.com/receipt/...",
    "storeName": "사랑집4",
    "paymentAmount": 15000,
    "cardCompany": "국민카드",
    "confirmNum": "12345678"
  }
}
```

**에러 케이스**
| 상태 | 메시지 |
|------|--------|
| `400` | 지원하지 않는 카드사 입니다. (국민카드만 허용) |
| `409` | 이미 등록된 영수증입니다. |

---

### 전체 누적 참여 횟수 조회

**GET** `/api/receipts/total-participation`

**Response**
```json
{
  "success": true,
  "code": 200,
  "message": "요청이 성공적으로 처리되었습니다.",
  "data": {
    "totalParticipationCount": 342
  }
}
```

---

### 전체 누적 소비금액 조회

**GET** `/api/receipts/total-all-payment`

**Response**
```json
{
  "success": true,
  "code": 200,
  "message": "요청이 성공적으로 처리되었습니다.",
  "data": {
    "totalAllPaymentAmount": 5120000
  }
}
```

---

### 내 단과대 누적 소비금액 조회

**GET** `/api/receipts/college-total-payment` `🔒 인증 필요`

**Response**
```json
{
  "success": true,
  "code": 200,
  "message": "요청이 성공적으로 처리되었습니다.",
  "data": {
    "collegeId": 1,
    "collegeName": "공과대학",
    "totalPaymentAmount": 980000
  }
}
```

---

### 2주차 대진별 랭킹 조회

**GET** `/api/receipts/week2-ranking`

**Response**
```json
{
  "success": true,
  "code": 200,
  "message": "요청이 성공적으로 처리되었습니다.",
  "data": [
    {
      "storeName": "사랑집1",
      "rankings": [
        { "rank": 1, "collegeName": "소프트웨어융합대학", "totalPaymentAmount": 320000 },
        { "rank": 2, "collegeName": "공과대학", "totalPaymentAmount": 210000 },
        { "rank": 3, "collegeName": "첨단바이오융합대학", "totalPaymentAmount": 180000 },
        { "rank": 4, "collegeName": "인문대학", "totalPaymentAmount": 90000 }
      ]
    },
    {
      "storeName": "사랑집3",
      "rankings": [
        { "rank": 1, "collegeName": "사회과학대학", "totalPaymentAmount": 270000 },
        { "rank": 2, "collegeName": "국방디지털융합학과", "totalPaymentAmount": 150000 }
      ]
    },
    {
      "storeName": "사랑집2",
      "rankings": [
        { "rank": 1, "collegeName": "경영대학", "totalPaymentAmount": 400000 },
        { "rank": 2, "collegeName": "메디컬", "totalPaymentAmount": 310000 }
      ]
    }
  ]
}
```

---

### 3주차 학번 대결 현황 조회

**GET** `/api/receipts/week3-challenge`

**Response (승패 있음)**
```json
{
  "success": true,
  "code": 200,
  "message": "요청이 성공적으로 처리되었습니다.",
  "data": [
    {
      "matchup": "23학번vs24학번",
      "win": "23학번",
      "lose": "24학번",
      "isDraw": false,
      "year1Total": 150000,
      "year2Total": 120000
    },
    {
      "matchup": "25학번vs26학번",
      "win": "26학번",
      "lose": "25학번",
      "isDraw": false,
      "year1Total": 80000,
      "year2Total": 95000
    }
  ]
}
```

**Response (무승부)**
```json
{
  "success": true,
  "code": 200,
  "message": "요청이 성공적으로 처리되었습니다.",
  "data": [
    {
      "matchup": "23학번vs24학번",
      "win": null,
      "lose": null,
      "isDraw": true,
      "year1Total": 100000,
      "year2Total": 100000
    }
  ]
}
```

> - `year1Total`: 첫 번째 학번 그룹(23학번 / 25학번) 합산 금액
> - `year2Total`: 두 번째 학번 그룹(24학번 / 26학번) 합산 금액
> - 무승부 시 `win`, `lose`는 `null`

---

## 사용자 (Users)

### 내 대시보드 조회

**GET** `/api/users/me/dashboard` `🔒 인증 필요`

**Response**
```json
{
  "success": true,
  "code": 200,
  "message": "요청이 성공적으로 처리되었습니다.",
  "data": {
    "name": "홍길동",
    "collegeName": "공과대학",
    "totalPaymentAmount": 45000
  }
}
```

---

## 관리자 (Admin)

> 모든 관리자 API는 `🔒 관리자 계정 인증 필요`

### 가입자 수 통계 조회

**GET** `/api/admin/users/stats`

**Response**
```json
{
  "success": true,
  "code": 200,
  "message": "요청이 성공적으로 처리되었습니다.",
  "data": {
    "todayCount": 5,
    "totalCount": 120
  }
}
```

---

### 유저 가입 정보 CSV 다운로드

**GET** `/api/admin/users/csv`

> 파일 다운로드 응답 (`Content-Type: text/csv`)
> 컬럼: `가입일시, 유저ID, 단과대, 학과`

---

### 단과대별 소비금액 CSV 다운로드

**GET** `/api/admin/receipts/csv`

> 파일 다운로드 응답 (`Content-Type: text/csv`)
> 컬럼: `일자, 단과대명, 소비금액합계`

---

### 현재 활성화 주차 조회

**GET** `/api/admin/weeks/current`

**Response**
```json
{
  "success": true,
  "code": 200,
  "message": "요청이 성공적으로 처리되었습니다.",
  "data": {
    "weekNumber": 3
  }
}
```

> `weekNumber`가 `null`이면 테스트 기간

---

### 주차 활성화

**PATCH** `/api/admin/weeks/{weekNumber}/activate`

**Path Parameter**

| 파라미터 | 타입 | 설명 |
|----------|------|------|
| `weekNumber` | int | 활성화할 주차 (1, 2, 3) |

**Response**
```json
{
  "success": true,
  "code": 200,
  "message": "요청이 성공적으로 처리되었습니다.",
  "data": {
    "weekNumber": 2
  }
}
```

---

### 주차 비활성화

**PATCH** `/api/admin/weeks/deactivate`

**Response**
```json
{
  "success": true,
  "code": 200,
  "message": "요청이 성공적으로 처리되었습니다.",
  "data": {
    "weekNumber": null
  }
}
```

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