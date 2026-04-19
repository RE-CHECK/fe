import './ConfirmModal.css'

export default function ConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <div className="confirm-overlay" onClick={onCancel}>
      <div className="confirm-modal" onClick={e => e.stopPropagation()}>

        {/* ── 닫기(X) 버튼 ── */}
        <button className="confirm-modal__close" onClick={onCancel} aria-label="닫기">
          X
        </button>

        {/* ── 메시지 ── */}
        <p className="confirm-modal__message">{message}</p>

        {/* ── 하단 버튼 영역 ── */}
        <div className="confirm-modal__footer">
          <button className="confirm-modal__btn" onClick={onConfirm}>네</button>
          <div className="confirm-modal__divider" />
          <button className="confirm-modal__btn" onClick={onCancel}>아니오</button>
        </div>

      </div>
    </div>
  )
}
