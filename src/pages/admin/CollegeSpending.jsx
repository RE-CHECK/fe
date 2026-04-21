import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AlertModal from '../../components/AlertModal'
import { downloadReceiptsCsv } from '../../api/admin'
import './CollegeSpending.css'

export default function CollegeSpending() {
  const navigate = useNavigate()
  const [errorMsg, setErrorMsg] = useState('')

  async function handleCsvDownload() {
    try {
      await downloadReceiptsCsv()
    } catch (e) {
      setErrorMsg(e.message)
    }
  }

  return (
    <div className="college-spending">

      {errorMsg && (
        <AlertModal title="오류" desc={errorMsg} onClose={() => setErrorMsg('')} />
      )}

      {/* ── 헤더 ── */}
      <div className="college-spending__header">
        <button className="college-spending__back" onClick={() => navigate(-1)} aria-label="뒤로가기">
          <svg width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.5 1.5L1.5 10L9.5 18.5" stroke="#33363F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      <hr className="college-spending__divider" />

      <p className="college-spending__title">단과대 소비금액</p>

      <div className="college-spending__csv-wrap">
        <button className="college-spending__csv-btn" onClick={handleCsvDownload}>
          CSV 다운
        </button>
      </div>

    </div>
  )
}
