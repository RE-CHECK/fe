import './AlertModal.css'
import warningIcon from '../assets/icon/warning.png'

export default function AlertModal({ title, desc, onClose }) {
  return (
    <div className="alert-overlay" onClick={onClose}>
      <div className="alert-modal" onClick={e => e.stopPropagation()}>
        <img className="alert-modal__icon" src={warningIcon} alt="경고" />
        <p className="alert-modal__title">{title}</p>
        {desc && <p className="alert-modal__desc">{desc}</p>}
        <button className="alert-modal__btn" onClick={onClose}>확인</button>
      </div>
    </div>
  )
}
