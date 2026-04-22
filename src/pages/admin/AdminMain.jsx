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
        <button
          className="admin-main__logout"
          onClick={() => {
            localStorage.removeItem('accessToken')
            navigate('/')
          }}
        >
          로그아웃
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
