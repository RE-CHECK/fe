import './Main.css'
import asset21    from '../assets/image/자산 21@4x 1.svg'
import mascotImg  from '../assets/image/자산 11@4x 1.svg'
import group110   from '../assets/icon/Group110.svg'
import group114   from '../assets/icon/Group114.svg'
import ellipse189 from '../assets/icon/Ellipse 189.svg'
import chartG1    from '../assets/image/chart-group1.svg'
import chartG2    from '../assets/image/chart-group2.svg'
import chartG3    from '../assets/image/chart-group3.svg'

// TODO: API 연동 시 props 또는 전역 상태로 교체
const USER = { name: '김아주', college: '경영대', spent: '230,000원' }

const DAYS   = ['월', '화', '수', '목', '금', '토', '일']
const LEGEND = [
  { label: '공과대', color: '#635cff' },
  { label: '경영대', color: '#c7a800' },
  { label: '사과대', color: '#ec5a89' },
  { label: '첨아융', color: '#0ca214' },
]

export default function Main() {
  return (
    <div className="main">

      {/* ── 헤더 ── */}
      <div className="main__header">
        <p className="main__title">RE : AJOU CHECK</p>
        <p className="main__subtitle">캠퍼스 챌린지</p>
      </div>

      {/* 별 장식 — .main 기준 absolute (카드 상단 오버랩) */}
      <div className="main__star main__star--r"><img src={group110} alt="" /></div>
      <div className="main__star main__star--m"><img src={group114} alt="" /></div>

      <hr className="main__divider" />

      {/* ── 유저 카드 ── */}
      <div className="main__card">
        <img className="main__card-asset" src={asset21} alt="" />
        <div className="main__card-mascot"><img src={mascotImg} alt="" /></div>
        <p className="main__card-name">{USER.name}</p>
        <p className="main__card-college">{USER.college}</p>
        <p className="main__card-label">지금까지 얼마 썼나요?</p>
        <p className="main__card-amount">{USER.spent}</p>
      </div>

      {/* ── 통계 ── */}
      <div className="main__stat-block">
        <div className="main__pill main__pill--yellow">총 누적 참여 횟수</div>
        <p className="main__stat-num">
          7,191,475<span className="main__stat-unit">명</span>
        </p>
      </div>

      <div className="main__stat-block">
        <div className="main__pill main__pill--red">총 누적 소비 금액</div>
        <p className="main__stat-num">
          27,191,475<span className="main__stat-unit">원</span>
        </p>
      </div>

      <div className="main__stat-block main__stat-block--last">
        <div className="main__pill main__pill--green">
          총 {USER.college} 누적 소비 금액
        </div>
        <p className="main__stat-num">
          91,475<span className="main__stat-unit">원</span>
        </p>
      </div>

      {/* ── 차트 섹션 ── */}
      <div className="main__chart-section">

        <div className="main__chart-title-wrap">
          <div className="main__chart-pill">이번 주 단과대 소비 현황</div>
        </div>
        <p className="main__chart-update">업데이트 일시 : 00:00</p>

        {/* 차트 영역 (API 연동 예정) */}
        <div className="main__chart-area">
          {/* 차트 라인 이미지 — 동일 좌상단 기준 절대 배치 */}
          {/* 세로 점선 — 요일 중앙 정렬 */}
          {DAYS.map((_, i) => (
            <div
              key={i}
              className="main__chart-vline"
              style={{ left: `calc(${i} / 6 * (100% - 8.87cqw) + 4.435cqw)` }}
            />
          ))}
          <div className="main__chart-graphs">
            <img src={chartG2} className="main__chart-g main__chart-g2" alt="" />
            <img src={chartG1} className="main__chart-g main__chart-g1" alt="" />
            <img src={chartG3} className="main__chart-g main__chart-g3" alt="" />
          </div>
          {/* 범례: 흰색 pill + 색상 텍스트 */}
          <div className="main__legend">
            {LEGEND.map(({ label, color }) => (
              <div key={label} className="main__legend-item">
                <span className="main__legend-label" style={{ color }}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        <hr className="main__chart-divider" />

        {/* 요일 행 */}
        <div className="main__weekdays">
          {DAYS.map(day => (
            <div key={day} className="main__weekday">
              <img src={ellipse189} className="main__weekday-dot" alt="" />
              <span>{day}</span>
            </div>
          ))}
        </div>

      </div>

      {/* ── 하단 카드 ── */}
      <div className="main__bottom">
        <div className="main__bottom-card main__bottom-card--dark">
          <p className="main__bottom-big">RANK</p>
          <button className="main__bottom-btn main__bottom-btn--white">대결현황</button>
        </div>
        <div className="main__bottom-card main__bottom-card--light">
          <p className="main__bottom-big main__bottom-big--blue">GO!</p>
          <button className="main__bottom-btn main__bottom-btn--blue">참여하기</button>
        </div>
      </div>

    </div>
  ) 
}
