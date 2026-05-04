import { useNavigate } from 'react-router-dom'
import './Stores.css'
import imgSarangjip  from '../assets/image/store/ChatGPT Image 2026년 5월 1일 오후 09_29_41 1.svg'
import imgUjok       from '../assets/image/store/ChatGPT Image 2026년 5월 1일 오후 09_29_41 3.svg'
import imgDongtteok  from '../assets/image/store/ChatGPT Image 2026년 5월 1일 오후 09_29_41 2.svg'
import imgAppatteng  from '../assets/image/store/ChatGPT Image 2026년 5월 1일 오후 09_29_41 4.svg'
import imgPopuri1    from '../assets/image/store/ChatGPT Image 2026년 5월 1일 오후 09_29_41 6.svg'
import imgPopuri2    from '../assets/image/store/ChatGPT Image 2026년 5월 1일 오후 09_29_41 5.svg'
import imgVector     from '../assets/image/store/Vector.svg'

export default function Stores() {
  const navigate = useNavigate()

  return (
    <div className="stores">

      {/* ── 헤더 ── */}
      <div className="stores__header">
        <div>
          <p className="stores__title">RE : AJOU CHECK</p>
          <p className="stores__subtitle">캠퍼스 챌린지</p>
        </div>
        <button className="stores__back-btn" onClick={() => navigate('/main')}>
          뒤로가기
        </button>
      </div>

      <hr className="stores__divider" />

      {/* ── 페이지 타이틀 ── */}
      <p className="stores__page-title">제휴매장<br />모아보기</p>

      {/* ── 1주차 (5월 11~17일) ── */}
      <div className="stores__week-badge stores__week-badge--yellow">5월 11~17일</div>

      <div className="stores__grid stores__grid--3col">
        <div className="stores__card">
          <img src={imgSarangjip} className="stores__card-img" alt="" />
          <p className="stores__card-desc">돼지김치구이 맛집</p>
          <p className="stores__card-name stores__card-name--yellow">사랑집</p>
        </div>
        <div className="stores__card">
          <img src={imgUjok} className="stores__card-img" alt="" />
          <p className="stores__card-desc">아주대 최고 족발집</p>
          <p className="stores__card-name stores__card-name--yellow">우만동 족발집</p>
        </div>
        <div className="stores__card">
          <img src={imgDongtteok} className="stores__card-img" alt="" />
          <p className="stores__card-desc">쯔양도 인정한 즉떡</p>
          <p className="stores__card-name stores__card-name--yellow">동떡이</p>
        </div>
      </div>

      {/* ── 2주차 (5월 18~24일) ── */}
      <div className="stores__week-badge stores__week-badge--red">5월 18~24일</div>

      <div className="stores__grid stores__grid--2col">
        <div className="stores__card">
          <img src={imgAppatteng} className="stores__card-img" alt="" />
          <p className="stores__card-desc">잠봉뵈르와 아메가 맛있는</p>
          <p className="stores__card-name stores__card-name--red">아빠땡</p>
        </div>
        <div className="stores__card">
          <div className="stores__card-img-group">
            <img src={imgPopuri1} alt="" />
            <img src={imgPopuri2} alt="" />
          </div>
          <p className="stores__card-desc">케이크와 에이드가 맛있는</p>
          <p className="stores__card-name stores__card-name--red">포푸리</p>
        </div>
      </div>

      {/* ── 벡터 데코 ── */}
      <img src={imgVector} className="stores__vector" alt="" />

      {/* ── 안내 박스 ── */}
      <div className="stores__info-box">
        <p className="stores__info-text">
          5월 10일 캠퍼스 챌린지 종료 후<br />
          제휴업체와 함께 단과대별 대전(11~17일),<br />
          학년별 대전(18~24일)이 진행됩니다!
        </p>
        <p className="stores__reward-text">우승 팀에는 제휴업체 리워드가 제공되니 많관부!!</p>
      </div>

    </div>
  )
}
