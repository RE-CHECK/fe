import { useNavigate } from 'react-router-dom'
import './CollegeSpending.css'

export default function CollegeSpending() {
  const navigate = useNavigate()

  function handleCsvDownload() {
    // TODO: API 연동 후 단과대별 소비금액 CSV 다운로드 구현
  }

  return (
    <div className="college-spending">

      {/* ── 헤더 ── */}
      <div className="college-spending__header">
        <button className="college-spending__back" onClick={() => navigate(-1)} aria-label="뒤로가기">
          <svg width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.5 1.5L1.5 10L9.5 18.5" stroke="#33363F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      <hr className="college-spending__divider" />

      {/* ── 타이틀 ── */}
      <p className="college-spending__title">단과대 소비금액</p>

      {/* ── CSV 다운로드 버튼 ── */}
      <div className="college-spending__csv-wrap">
        <button className="college-spending__csv-btn" onClick={handleCsvDownload}>
          CSV 다운
        </button>
      </div>

    </div>
  )
}
