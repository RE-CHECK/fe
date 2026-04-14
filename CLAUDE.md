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