import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import './Home.css'

import img244X1    from '../assets/image/자산 24@4x 1.svg'
import img114X1    from '../assets/image/자산 11@4x 1.svg'
import racingFlag  from '../assets/image/racing-flag 1.svg'
import mascotImg   from '../assets/image/ChatGPT Image 2026년 4월 9일 오후 03_08_24 1.svg'
import kbLogo      from '../assets/image/image 72.svg'
import group110    from '../assets/icon/Group110.svg'
import group114    from '../assets/icon/Group114.svg'

export default function Home() {
  const navigate = useNavigate()
  const homeRef = useRef(null)

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      navigate('/main', { replace: true })
    }
  }, [navigate])

  useEffect(() => {
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    return () => {
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
    }
  }, [])

  useEffect(() => {
    const outer = homeRef.current?.parentElement
    const update = () => {
      const el = homeRef.current
      if (!el) return
      const h  = window.visualViewport?.height ?? window.innerHeight
      const vw = document.documentElement.clientWidth
      if (outer) outer.style.height = h + 'px'
      const mw      = el.offsetWidth
      const contentH = mw * (3250 / 1378)
      const scale   = Math.min(1, h / contentH)
      el.style.setProperty('--home-scale', String(scale))
      el.style.setProperty('--track-outer-width', `${vw / scale}px`)
      el.style.setProperty('--track-outer-left',  `${mw / 2 - vw / (2 * scale)}px`)
    }
    update()
    window.visualViewport?.addEventListener('resize', update)
    window.addEventListener('resize', update)
    return () => {
      window.visualViewport?.removeEventListener('resize', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <div className="home-outer">
    <div className="home" ref={homeRef}>

      {/* 외곽 트랙 배경 */}
      <div className="home__asset home__track-outer">
        <img src={img244X1} alt="" />
      </div>

      {/* 내부 트랙 + 마스코트 */}
      <div className="home__asset home__track-inner">
        <img src={img114X1} alt="" />
      </div>

      {/* 레이싱 깃발 */}
      <div className="home__flag-wrap">
        <div className="home__flag-rotate">
          <img src={racingFlag} alt="" />
        </div>
      </div>

      {/* 좌측 장식 그룹 (Group114) */}
      <div className="home__group home__group--left">
        <img src={group114} alt="" />
      </div>

      {/* 우측 장식 그룹 (Group110) */}
      <div className="home__group home__group--right">
        <img src={group110} alt="" />
      </div>

      {/* START! 버튼 배경 */}
      <button className="home__btn-bg home__btn-bg--start" onClick={() => navigate('/login')} />
      <p className="home__btn-text home__btn-text--start" onClick={() => navigate('/login')}>START!</p>

      {/* 회원가입 버튼 배경 */}
      <button id="btn-go-signup" className="home__btn-bg home__btn-bg--signup" onClick={() => navigate('/signup')} />
      <p className="home__btn-text home__btn-text--signup" onClick={() => navigate('/signup')}>회원가입</p>

      {/* 캠퍼스 챌린지란? 버튼 */}
      <button className="home__btn-bg home__btn-bg--landing" onClick={() => navigate('/landing')} />
      <p className="home__btn-text home__btn-text--landing" onClick={() => navigate('/landing')}>캠퍼스 챌린지란?</p>

      {/* RE:AJOU CHECK 마스코트 이미지 */}
      <div className="home__mascot-wrap">
        <img src={mascotImg} alt="RE:AJOU CHECK" />
      </div>

      {/* 캠퍼스 챌린지 */}
      <p className="home__campus">캠퍼스 챌린지</p>

      {/* 과 함께하는 */}
      <p className="home__pretitle">과 함께하는</p>

      {/* KB 국민은행 로고 */}
      <div className="home__asset home__kb-logo">
        <img src={kbLogo} alt="KB 국민은행" />
      </div>

    </div>
    </div>
  )
}
