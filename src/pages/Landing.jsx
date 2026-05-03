import { useNavigate } from 'react-router-dom'
import './Landing.css'
import imgPhoto      from '../assets/landing/Gemini_Generated_Image_rjah9arjah9arjah 6.svg'
import imgCardLogo   from '../assets/landing/image 33.svg'
import imgWeek1Circ  from '../assets/landing/Ellipse 241.svg'
import imgWeek2Circ  from '../assets/landing/Ellipse 242.svg'
import imgWeek3Circ  from '../assets/landing/Ellipse 243.svg'
import imgEllipse180 from '../assets/landing/Ellipse 180.svg'

export default function Landing() {
  const navigate = useNavigate()

  const handleCta = () => {
    navigate('/')
  }

  return (
    <div className="lp">

      {/* ── HERO ── */}
      <div className="lp__badge-bg" />
      <p className="lp__badge-text">RE : AJOU CHECK · 캠퍼스 챌린지</p>
      <p className="lp__hero-title">
        {'쓸수록 바뀌는 '}
        <br />
        <span className="lp__hero-title--yellow">아주대 학생증 체크카드!</span>
      </p>
      <p className="lp__hero-sub">CAMPUS CHALLENGE 2026</p>

      <div className="lp__photo">
        <img src={imgPhoto} alt="" />
      </div>

      {/* Student card – outer wrapper centering the rotated portrait card */}
      <div className="lp__card-outer">
        <div className="lp__card-rot">
          <div className="lp__card">
            <div className="lp__card-row lp__card-row--num">
              <div className="lp__card-unrot"><p className="lp__card-num">5022 3386 9820 1246</p></div>
            </div>
            <div className="lp__card-row lp__card-row--id">
              <div className="lp__card-unrot"><p className="lp__card-id">STUDENT ID</p></div>
            </div>
            <div className="lp__card-row lp__card-row--name">
              <div className="lp__card-unrot"><p className="lp__card-name">LEE AJOU</p></div>
            </div>
            <div className="lp__card-row lp__card-row--logo">
              <div className="lp__card-unrot">
                <img src={imgCardLogo} alt="" className="lp__card-logo" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lp__arrow" />

      {/* ── PROBLEM ── */}
      <p className="lp__problem">
        <span className="lp__w700 lp__white">새 학생증 디자인, 왜 아직 안 나올까요?</span>
        <br />
        <span className="lp__w800 lp__yellow">기존 재고가 소진되어야</span>
        {' '}
        <span className="lp__w700 lp__white">리뉴얼이 시작됩니다.</span>
        <br />
        <span className="lp__w700 lp__white">우리가 함께 쓰면, 함께 바꿀 수 있어요!</span>
      </p>

      {/* ── WHY ── */}
      <p className="lp__label lp__label--why">WHY · 왜 하나요?</p>
      <p className="lp__section-head lp__section-head--why">
        커피 한 잔이<br />학생증을 바꿔요
      </p>

      <div className="lp__info-card lp__info-card--1">
        <div className="lp__info-icon"><p className="lp__info-emoji">📦</p></div>
        <p className="lp__info-title">기존 재고 소진 필요</p>
        <p className="lp__info-body">현재 학생증 체크카드 재고가 남아 있는 한<br />신규 디자인 출시가 불가능해요.</p>
      </div>

      <div className="lp__info-card lp__info-card--2">
        <div className="lp__info-icon"><p className="lp__info-emoji">💳</p></div>
        <p className="lp__info-title">KB 학생증 체크카드로 결제</p>
        <p className="lp__info-body">일상 속 소비를 내 학생증 체크카드로!<br />영수증만 찍으면 단과대 점수가 쌓여요.</p>
      </div>

      <div className="lp__info-card lp__info-card--3">
        <div className="lp__info-icon"><p className="lp__info-emoji">✨</p></div>
        <p className="lp__info-title">리뉴얼 앞당기기</p>
        <p className="lp__info-body">아주대생이 함께 쓸수록,<br />새로운 디자인의 학생증이 더 빨리 나와요.</p>
      </div>

      {/* ── SCHEDULE ── */}
      <p className="lp__label lp__label--schedule">SCHEDULE · 단계별 대항전</p>
      <p className="lp__section-head lp__section-head--schedule">
        단계별로<br />더 치열해져요!
      </p>

      <img src={imgWeek1Circ} alt="" className="lp__week-circ lp__week-circ--1" />
      <p className="lp__week-num lp__week-num--1">1</p>
      <p className="lp__week-date lp__week-date--1">WEEK 1 · ~5월 10일</p>
      <p className="lp__week-name lp__week-name--1">전체 화력 측정전</p>
      <p className="lp__week-desc lp__week-desc--1">
        12개 단과대 소비 총액 실시간 비교.<br />우리 단과대, 지금 몇 위일까요?
      </p>

      <img src={imgWeek2Circ} alt="" className="lp__week-circ lp__week-circ--2" />
      <p className="lp__week-num lp__week-num--2">2</p>
      <p className="lp__week-date lp__week-date--2">WEEK 2 · 5월 11~17일</p>
      <p className="lp__week-name lp__week-name--2">가맹점 점령전 4파전</p>
      <p className="lp__week-desc lp__week-desc--2">
        제휴 가맹점에서 가장 많이 쓴 단과대는?<br />4개 단과대가 맞붙는 본격 배틀!
      </p>

      <img src={imgWeek3Circ} alt="" className="lp__week-circ lp__week-circ--3" />
      <p className="lp__week-num lp__week-num--3">3</p>
      <p className="lp__week-date lp__week-date--3">WEEK 3 · 5월 18~24일</p>
      <p className="lp__week-name lp__week-name--3">학번 1:1 대항전</p>
      <p className="lp__week-desc lp__week-desc--3">
        23학번 vs 24학번, 25학번 vs 26학번.<br />진짜 주인공은 누구인지 가립니다.
      </p>

      {/* ── HOW ── */}
      <p className="lp__label lp__label--how">HOW · 참여 방법</p>
      <p className="lp__section-head lp__section-head--how">
        영수증만 찍으면<br />참여 완료
      </p>

      <div className="lp__step lp__step--1">
        <div className="lp__step-num-bg"><p className="lp__step-num">1</p></div>
        <p className="lp__step-title">KB 학생증 체크카드로 결제</p>
        <p className="lp__step-desc">반드시 학생증 체크카드여야 점수 반영!</p>
      </div>

      <div className="lp__step lp__step--2">
        <div className="lp__step-num-bg"><p className="lp__step-num">2</p></div>
        <p className="lp__step-title">영수증 사진 촬영</p>
        <p className="lp__step-desc">영수증에 국민은행이 찍혀있는지 꼭 확인하세요</p>
      </div>

      <div className="lp__step lp__step--3">
        <div className="lp__step-num-bg"><p className="lp__step-num">3</p></div>
        <p className="lp__step-title">챌린지 페이지에 업로드</p>
        <p className="lp__step-desc">OCR이 금액·업종 자동 인식, 점수 반영!</p>
      </div>

      {/* ── REWARD ── */}
      <p className="lp__label lp__label--reward">REWARD · 리워드</p>
      <p className="lp__section-head lp__section-head--reward">
        이기면<br />확실히 드릴게요~
      </p>

      <div className="lp__reward-card lp__reward-card--coupon">
        <p className="lp__reward-emoji">🎁</p>
        <p className="lp__reward-title">제휴 가맹점 쿠폰</p>
        <p className="lp__reward-desc">이긴 단과대 참여자 중 랜덤 추첨 지급</p>
      </div>

      <div className="lp__reward-card lp__reward-card--honor">
        <p className="lp__reward-emoji">🏆</p>
        <p className="lp__reward-title">단과대 명예</p>
        <p className="lp__reward-desc">랭킹 TOP 단과대 공식 인증</p>
      </div>

      <div className="lp__reward-card lp__reward-card--lucky">
        <p className="lp__reward-emoji-big">🎰</p>
        <p className="lp__reward-title-big">실시간 사다리타기 추첨</p>
        <p className="lp__reward-desc-big">
          누가 당첨될지 아무도 모른다!<br />
          이긴 팀에서 실시간 사다리타기로 당첨자를 공개합니다.
        </p>
      </div>

      {/* ── CTA SECTION ── */}
      <div className="lp__ellipse180">
        <img src={imgEllipse180} alt="" />
      </div>

      <div className="lp__cta-wrap-1">
        <div className="lp__cta-card-1" />
        <p className="lp__cta-hl-1">공대 vs 소융대</p>
      </div>

      <div className="lp__cta-wrap-2">
        <div className="lp__cta-card-2" />
        <p className="lp__cta-hl-2">어느 쪽 화력이 강할까?</p>
      </div>

      <p className="lp__cta-intro">아주대생들의 진짜 화력을 보여줄 시간!</p>

      <div className="lp__cta-bar" />
      <button id="btn-go-challenge" className="lp__cta-btn" onClick={handleCta}>
        캠퍼스 챌린지 참여하러 가기
      </button>

    </div>
  )
}
