import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AlertModal from '../../components/AlertModal'
import { addBlacklist, removeBlacklist, downloadBlacklistCsv } from '../../api/admin'
import './AdminBlacklist.css'

function formatPhone(value) {
  const digits = value.replace(/\D/g, '').slice(0, 11)
  if (digits.length <= 3) return digits
  if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`
}

export default function AdminBlacklist() {
  const navigate = useNavigate()
  const [addPhone, setAddPhone] = useState('')
  const [removePhone, setRemovePhone] = useState('')
  const [isAdding, setIsAdding] = useState(false)
  const [isRemoving, setIsRemoving] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const [modal, setModal] = useState(null)

  async function handleAdd() {
    const raw = addPhone.replace(/-/g, '')
    if (raw.length !== 11 || isAdding) return
    setIsAdding(true)
    try {
      await addBlacklist(raw)
      setModal({ title: '차단 완료', desc: `${addPhone} 번호가 블랙리스트에 추가되었습니다.` })
      setAddPhone('')
    } catch (e) {
      setModal({ title: '차단 실패', desc: e.message || '오류가 발생했습니다.' })
    } finally {
      setIsAdding(false)
    }
  }

  async function handleRemove() {
    const raw = removePhone.replace(/-/g, '')
    if (raw.length !== 11 || isRemoving) return
    setIsRemoving(true)
    try {
      await removeBlacklist(raw)
      setModal({ title: '차단 해제 완료', desc: `${removePhone} 번호가 블랙리스트에서 해제되었습니다.` })
      setRemovePhone('')
    } catch (e) {
      setModal({ title: '차단 해제 실패', desc: e.message || '오류가 발생했습니다.' })
    } finally {
      setIsRemoving(false)
    }
  }

  async function handleCsvDownload() {
    if (isDownloading) return
    setIsDownloading(true)
    try {
      await downloadBlacklistCsv()
    } catch (e) {
      setModal({ title: 'CSV 다운로드 실패', desc: e.message || '오류가 발생했습니다.' })
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <div className="bl">
      {modal && (
        <AlertModal title={modal.title} desc={modal.desc} onClose={() => setModal(null)} />
      )}

      <div className="bl__header">
        <button className="bl__back" onClick={() => navigate(-1)} aria-label="뒤로가기">
          <svg width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.5 1.5L1.5 10L9.5 18.5" stroke="#33363F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      <hr className="bl__divider" />

      <p className="bl__title">블랙리스트</p>

      {/* 섹션 1: 블랙리스트 추가 */}
      <div className="bl__section">
        <input
          className="bl__input"
          type="tel"
          placeholder="010-1234-5678"
          value={addPhone}
          onChange={e => setAddPhone(formatPhone(e.target.value))}
        />
        <button
          className="bl__action-btn bl__action-btn--black"
          onClick={handleAdd}
          disabled={addPhone.replace(/-/g, '').length !== 11 || isAdding}
        >
          {isAdding ? '처리 중' : '차단하기'}
        </button>
      </div>

      <hr className="bl__section-divider" />

      {/* 섹션 2: 블랙리스트 차단 해제 */}
      <div className="bl__section">
        <input
          className="bl__input"
          type="tel"
          placeholder="010-1234-5678"
          value={removePhone}
          onChange={e => setRemovePhone(formatPhone(e.target.value))}
        />
        <button
          className="bl__action-btn bl__action-btn--black"
          onClick={handleRemove}
          disabled={removePhone.replace(/-/g, '').length !== 11 || isRemoving}
        >
          {isRemoving ? '처리 중' : '차단해제하기'}
        </button>
      </div>

      <div className="bl__csv-wrap">
        <button
          className="bl__csv-btn"
          onClick={handleCsvDownload}
          disabled={isDownloading}
        >
          {isDownloading ? '다운로드 중' : 'CSV 다운'}
        </button>
      </div>
    </div>
  )
}
