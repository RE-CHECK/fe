import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './ReceiptUpload.css'
import cameraImg    from '../assets/image/camera.png'
import spinnerImg   from '../assets/image/image 91.svg'
import bubbleLeft   from '../assets/icon/bubble-left.svg'
import bubbleRight  from '../assets/icon/bubble-right.svg'
import char1        from '../assets/image/3.서브 캐릭터 기본형1 1.svg'
import char2        from '../assets/image/4.서브 캐릭터 기본형2 1.svg'

export default function ReceiptUpload() {
  const navigate = useNavigate()
  const fileInputRef = useRef(null)
  const [isLoading, setIsLoading] = useState(false)
  const [receiptData, setReceiptData] = useState(null)
  const [isConfirmed, setIsConfirmed] = useState(false)

  function handleFile(e) {
    const file = e.target.files[0]
    if (file) {
      setIsLoading(true)
      // TODO: API 연동 — 아래 setTimeout을 실제 API 호출로 교체
      setTimeout(() => {
        setReceiptData({
          storeName: '사랑집',
          amount: '20,000원',
          cardCompany: '국민은행',
        })
        setIsLoading(false)
      }, 3000)
    }
  }

  function handleRetake() {
    setIsLoading(false)
    setReceiptData(null)
    setIsConfirmed(false)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return (
    <div className="upload">

      {/* ── 헤더 ── */}
      <div className="upload__header">
        <p className="upload__title">RE : AJOU CHECK</p>
        <p className="upload__subtitle">캠퍼스 챌린지 참여하기</p>
        <hr className="upload__divider" />
      </div>

      {/* ── 히어로 텍스트 ── */}
      <div className="upload__hero">
        <p className="upload__hero-title">영수증 업로드</p>
        <p className="upload__hero-desc">
          영수증을 업로드하면 결제금액 기반으로<br />
          캠퍼스 챌린지 참여가 가능해요
        </p>
      </div>

      {/* ── 캐릭터 + 말풍선 ── */}
      <div className="upload__scene">
        {/* 왼쪽 말풍선 */}
        <div className="upload__bubble upload__bubble--left">
          <img src={bubbleLeft} className="upload__bubble-bg" alt="" />
          <p className="upload__bubble-text">
            국민은행 체크카드로만<br />참여가능이야..?
          </p>
        </div>

        {/* 오른쪽 말풍선 (좌우 반전) */}
        <div className="upload__bubble upload__bubble--right">
          <img src={bubbleRight} className="upload__bubble-bg upload__bubble-bg--flip" alt="" />
          <p className="upload__bubble-text">응.....</p>
        </div>

        {/* 왼쪽 캐릭터 */}
        <img src={char1} className="upload__char upload__char--left" alt="" />

        {/* 오른쪽 캐릭터 */}
        <img src={char2} className="upload__char upload__char--right" alt="" />
      </div>

      {/* ── 흰색 카드 ── */}
      <div className="upload__card">
        {isConfirmed ? (
          /* ── 완료 상태: 업로드 완료 화면 ── */
          <>
            <div className="upload__camera-wrap">
              <img src={cameraImg} className="upload__camera-img" alt="카메라" />
            </div>

            <p className="upload__card-title">영수증 업로드 완료!</p>
            <p className="upload__card-desc">참여해주셔서 감사합니다</p>

            <button
              className="upload__btn upload__btn--blue"
              onClick={() => navigate('/main')}
            >
              소비 현황 확인하러 가기
            </button>
          </>
        ) : receiptData ? (
          /* ── 확인 상태: API 응답 후 영수증 정보 표시 ── */
          <>
            <div className="upload__camera-wrap">
              <img src={cameraImg} className="upload__camera-img" alt="카메라" />
            </div>

            <p className="upload__card-title">영수증 정보가 맞나요?</p>

            <div className="upload__receipt-rows">
              <div className="upload__receipt-row">
                <span className="upload__receipt-label upload__receipt-label--green">매장</span>
                <span className="upload__receipt-value upload__receipt-value--green">
                  {receiptData.storeName}
                </span>
              </div>
              <div className="upload__receipt-row">
                <span className="upload__receipt-label upload__receipt-label--orange">결제 금액</span>
                <span className="upload__receipt-value upload__receipt-value--orange">
                  {receiptData.amount}
                </span>
              </div>
              <div className="upload__receipt-row">
                <span className="upload__receipt-label upload__receipt-label--red">카드사</span>
                <span className="upload__receipt-value upload__receipt-value--red">
                  {receiptData.cardCompany}
                </span>
              </div>
            </div>

            <button
              className="upload__btn upload__btn--yellow"
              onClick={handleRetake}
            >
              다시 찍을래요
            </button>

            <button
              id="btn-upload-finish"
              className="upload__btn upload__btn--blue upload__btn--wide"
              onClick={() => setIsConfirmed(true)}
            >
              네, 맞아요
            </button>
          </>
        ) : isLoading ? (
          /* ── 로딩 상태: 스피너 ── */
          <>
            <div className="upload__spinner-wrap">
              <img src={spinnerImg} className="upload__spinner" alt="로딩중" />
            </div>
            <p className="upload__card-title">영수증을 확인하고 있어요</p>
            <p className="upload__card-desc">잠시만 기다려주세요!</p>
            <button className="upload__btn upload__btn--blue" disabled>
              업로드 중
            </button>
          </>
        ) : (
          /* ── 초기 상태: 업로드 폼 ── */
          <>
            <div className="upload__camera-wrap">
              <img src={cameraImg} className="upload__camera-img" alt="카메라" />
            </div>

            <p className="upload__card-title">영수증 촬영/업로드</p>
            <p className="upload__card-desc">카드번호와 이름은 자동으로 가려집니다</p>

            <button
              id="btn-upload-receipt"
              className="upload__btn upload__btn--blue"
              onClick={() => fileInputRef.current.click()}
            >
              사진 등록하기
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              style={{ display: 'none' }}
              onChange={handleFile}
            />
          </>
        )}
      </div>
    </div>
  )
}
