import { useEffect, useRef } from 'react'
import './CameraOverlay.css'

export default function CameraOverlay({ onCapture, onClose, onGallery }) {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    let stream
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: { ideal: 'environment' } }, audio: false })
      .then(s => {
        stream = s
        if (videoRef.current) {
          videoRef.current.srcObject = s
        }
      })
      .catch(() => {
        // 카메라 권한 거부 또는 미지원 → 갤러리로 fallback
        onGallery()
      })

    return () => stream?.getTracks().forEach(t => t.stop())
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  function capture() {
    const canvas = canvasRef.current
    const video = videoRef.current
    if (!video || !video.videoWidth) return

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    canvas.getContext('2d').drawImage(video, 0, 0)
    canvas.toBlob(blob => {
      if (!blob) return
      const file = new File([blob], 'student-card.jpg', { type: 'image/jpeg' })
      onCapture(file)
    }, 'image/jpeg', 0.92)
  }

  return (
    <div className="camov">
      <video
        ref={videoRef}
        className="camov__video"
        autoPlay
        playsInline
        muted
      />

      {/* 반투명 오버레이 + 카드 가이드 */}
      <div className="camov__mask">
        <div className="camov__card">
          <span className="camov__corner camov__corner--tl" />
          <span className="camov__corner camov__corner--tr" />
          <span className="camov__corner camov__corner--bl" />
          <span className="camov__corner camov__corner--br" />
        </div>
        <p className="camov__hint">학생증을 안에 맞춰주세요</p>
      </div>

      {/* 닫기 버튼 */}
      <button className="camov__close" onClick={onClose} aria-label="닫기">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* 하단 UI */}
      <div className="camov__ui">
        <button className="camov__gallery-btn" onClick={onGallery}>
          갤러리
        </button>
        <button className="camov__shutter" onClick={capture} aria-label="촬영">
          <span className="camov__shutter-inner" />
        </button>
        <div className="camov__ui-spacer" />
      </div>

      <canvas ref={canvasRef} className="camov__canvas" />
    </div>
  )
}
