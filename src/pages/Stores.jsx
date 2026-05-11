import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Stores.css'
import StoreInfoModal from '../components/StoreInfoModal'
import imgAppatteng     from '../assets/image/store/ChatGPT Image 2026년 5월 1일 오후 09_29_41 4.svg'
import imgPopuri1       from '../assets/image/store/ChatGPT Image 2026년 5월 1일 오후 09_29_41 6.svg'
import imgPopuri2       from '../assets/image/store/ChatGPT Image 2026년 5월 1일 오후 09_29_41 5.svg'
import imgChoehytak1    from '../assets/image/store/ChatGPT Image 2026년 5월 10일 오후 10_46_12 1.svg'
import imgChoehytak2    from '../assets/image/store/ChatGPT Image 2026년 5월 10일 오후 10_46_12 2.svg'
import imgSarangjip     from '../assets/image/store/ChatGPT Image 2026년 5월 1일 오후 09_29_41 1.svg'
import imgSomunna       from '../assets/image/store/ChatGPT Image 2026년 5월 10일 오후 10_38_48 1.svg'
import imgVector        from '../assets/image/store/Vector.svg'
import ImgAppatteng1    from '../assets/image/store/아빠땡1.svg'
import ImgAppatteng2    from '../assets/image/store/아빠땡2.svg'
import ImgPopuri1       from '../assets/image/store/포푸리1.svg'
import ImgPopuri2       from '../assets/image/store/포푸리2.svg'
import ImgChoehytak1    from '../assets/image/store/조희탁1.svg'
import ImgChoehytak3    from '../assets/image/store/조희탁3.svg'
import ImgSarangjip     from '../assets/image/store/사랑집.svg'
import ImgSodaemak1     from '../assets/image/store/소대막1.svg'
import ImgSodaemak2     from '../assets/image/store/소대막2.svg'

const STORE_INFOS = {
  아빠땡: {
    storeName:   '아빠땡',
    badgeName:   '아빠땡',
    images:      [ImgAppatteng1, ImgAppatteng2],
    imageRatios: [576, 418],
    color:       '#fdbd28',
    address:     '경기 수원시 영통구 월드컵로 193번길 15 2층',
    hours:       '매일 8:00~22:00 / 매주 일요일 휴무',
    phone:       '0507-1373-7260',
    desc:        '순공시간 2시간 확보되는 잠봉뵈르 맛집 카페',
  },
  포푸리: {
    storeName:   '포푸리',
    badgeName:   '포푸리',
    images:      [ImgPopuri1, ImgPopuri2],
    imageRatios: [615, 360],
    color:       '#ff5252',
    address:     '경기 수원시 영통구 월드컵로 179번길 32-3',
    hours:       '매일 11:00~23:00 / 매주 일요일 휴무',
    phone:       '010-3012-3856',
    desc:        '들어가자마자 에겐되는 케이크가 맛있는 예카',
  },
  조희탁: {
    storeName:   '조희탁커피',
    badgeName:   '조희탁',
    images:      [ImgChoehytak1, ImgChoehytak3],
    imageRatios: [573, 466],
    color:       '#0ca214',
    address:     '경기 수원시 팔달구 아주로47번길 12 1층',
    hours:       '매일 11:00~22:00',
    phone:       '0507-1410-8867',
    desc:        '레전드 버터떡이 있는 카공 맛집',
  },
  사랑집: {
    storeName:   '사랑집',
    badgeName:   '사랑집',
    images:      [ImgSarangjip],
    color:       '#fdbd28',
    address:     '경기 수원시 팔달구 아주로39번길 18-7 1층',
    hours:       '매일 11:00~22:00 / 브레이크타임 14:30~16:30',
    phone:       '0507-1349-9209',
    desc:        '눈 뜨면 없어져 있는 돼지김치구이 맛집',
  },
  소문난대구막창: {
    storeName:   '소문난대구막창',
    badgeName:   '소문난대구막창',
    images:      [ImgSodaemak1, ImgSodaemak2],
    imageRatios: [467, 578],
    color:       '#ff5252',
    address:     '경기 수원시 영통구 월드컵로193번길 77',
    hours:       '매일 15:30~26:00',
    phone:       '031-212-2213',
    desc:        '아주대 최고 가성비 고기집',
  },
}

export default function Stores() {
  const navigate = useNavigate()
  const [modalInfo, setModalInfo] = useState(null)

  return (
    <div className="stores">

      {/* ── 헤더 ── */}
      <div className="stores__header">
        <button className="stores__back-btn" onClick={() => navigate(-1)} aria-label="뒤로가기">
          <svg width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.5 1.5L1.5 10L9.5 18.5" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <p className="stores__title">RE : AJOU CHECK</p>
        <p className="stores__subtitle">캠퍼스 챌린지</p>
      </div>

      <hr className="stores__divider" />

      {/* ── 페이지 타이틀 ── */}
      <p className="stores__page-title">제휴매장<br />모아보기</p>

      {/* ── 1주차 (5월 11~17일) ── */}
      <div className="stores__week-badge stores__week-badge--yellow">5월 11~17일</div>

      <div className="stores__grid stores__grid--3col">
        <div className="stores__card" onClick={() => setModalInfo(STORE_INFOS.아빠땡)}>
          <img src={imgAppatteng} className="stores__card-img stores__card-img--appatteng" alt="" />
          <p className="stores__card-desc">잠봉뵈르와 아메가 맛있는</p>
          <p className="stores__card-name stores__card-name--red">아빠땡</p>
        </div>
        <div className="stores__card" onClick={() => setModalInfo(STORE_INFOS.포푸리)}>
          <div className="stores__card-img-group">
            <img src={imgPopuri1} alt="" />
            <img src={imgPopuri2} alt="" />
          </div>
          <p className="stores__card-desc">케이크와 에이드가 맛있는</p>
          <p className="stores__card-name stores__card-name--red">포푸리</p>
        </div>
        <div className="stores__card" onClick={() => setModalInfo(STORE_INFOS.조희탁)}>
          <div className="stores__card-img-group stores__card-img-group--choehytak">
            <img src={imgChoehytak1} alt="" />
            <img src={imgChoehytak2} alt="" />
          </div>
          <p className="stores__card-desc">버터떡과 라떼가 맛잇는</p>
          <p className="stores__card-name stores__card-name--red">조희탁</p>
        </div>
      </div>

      {/* ── 2주차 (5월 18~24일) ── */}
      <div className="stores__week-badge stores__week-badge--red">5월 18~24일</div>

      <div className="stores__grid stores__grid--2col">
        <div className="stores__card" onClick={() => setModalInfo(STORE_INFOS.사랑집)}>
          <img src={imgSarangjip} className="stores__card-img" alt="" />
          <p className="stores__card-desc">돼지김치구이 맛집</p>
          <p className="stores__card-name stores__card-name--yellow">사랑집</p>
        </div>
        <div className="stores__card" onClick={() => setModalInfo(STORE_INFOS.소문난대구막창)}>
          <img src={imgSomunna} className="stores__card-img stores__card-img--somunna" alt="" />
          <p className="stores__card-desc">가성비 고기집</p>
          <p className="stores__card-name stores__card-name--yellow">소문난대구막창</p>
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

      {modalInfo && (
        <StoreInfoModal storeInfo={modalInfo} onClose={() => setModalInfo(null)} />
      )}

    </div>
  )
}
