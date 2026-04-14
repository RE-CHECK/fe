import { useRef, useState } from 'react'
import './ReceiptUpload.css'
import cameraImg    from '../assets/image/camera.png'
import spinnerImg   from '../assets/image/image 91.svg'
import bubbleLeft   from '../assets/icon/bubble-left.svg'
import bubbleRight  from '../assets/icon/bubble-right.svg'
import char1        from '../assets/image/3.서브 캐릭터 기본형1 1.svg'
import char2        from '../assets/image/4.서브 캐릭터 기본형2 1.svg'

export default function ReceiptUpload() {
  const fileInputRef = useRef(null)
  const [isLoading, setIsLoading] = useState(false)

  function handleFile(e) {
    const file = e.target.files[0]
    if (file) {
      setIsLoading(true)
      // TODO: API 연동 — 파일 업로드 처리
      console.log('선택된 파일:', file.name)
    }
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
        {isLoading ? (
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
          <>
            {/* 카메라 아이콘 */}
            <div className="upload__camera-wrap">
              <img src={cameraImg} className="upload__camera-img" alt="카메라" />
            </div>

            <p className="upload__card-title">영수증 촬영/업로드</p>
            <p className="upload__card-desc">카드번호와 이름은 자동으로 가려집니다</p>

            {/* 사진 등록 버튼 */}
            <button
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
