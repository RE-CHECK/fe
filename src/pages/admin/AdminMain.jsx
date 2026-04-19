import { useNavigate } from 'react-router-dom'
import './AdminMain.css'

const MENU_ITEMS = [
  { label: '주차별 활성화 기능',     path: '/admin/weekly-activation' },
  { label: '전체 팝업 공지 사항 기능', path: null },
  { label: '참여하기  활성화 기능',   path: null },
  { label: '유저 대시보드',          path: '/admin/user-dashboard' },
  { label: '단과대별 소비금액',       path: '/admin/college-spending' },
]

export default function AdminMain() {
  const navigate = useNavigate()

  return (
    <div className="admin-main">

      {/* ── 헤더 영역 ── */}
      <div className="admin-main__header">
        <button className="admin-main__back" onClick={() => navigate(-1)} aria-label="뒤로가기">
          <svg width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.5 1.5L1.5 10L9.5 18.5" stroke="#33363F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      <hr className="admin-main__divider" />

      {/* ── 타이틀 ── */}
      <p className="admin-main__title">admin!!</p>

      {/* ── 메뉴 버튼 목록 ── */}
      <div className="admin-main__menu">
        {MENU_ITEMS.map(({ label, path }) => (
          <button
            key={label}
            className="admin-main__menu-btn"
            onClick={() => path && navigate(path)}
            disabled={!path}
          >
            {label}
          </button>
        ))}
      </div>

    </div>
  )
}
