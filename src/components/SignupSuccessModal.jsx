import { useNavigate } from 'react-router-dom'
import './SignupSuccessModal.css'
import successImg from '../assets/image/sginup-success.svg'

export default function SignupSuccessModal() {
  const navigate = useNavigate()

  function handleClose() {
    navigate('/login', { replace: true })
  }

  return (
    <div className="su-overlay" onClick={handleClose}>
      <div className="su-modal" onClick={e => e.stopPropagation()}>
        <img className="su-modal__img" src={successImg} alt="회원가입 완료" />
        <p className="su-modal__title">회원가입 완료!</p>
        <p className="su-modal__desc">RE:AJOU CHECK에 오신 것을 환영합니다</p>
        <button className="su-modal__btn" onClick={handleClose}>
          로그인 화면으로
        </button>
      </div>
    </div>
  )
}
