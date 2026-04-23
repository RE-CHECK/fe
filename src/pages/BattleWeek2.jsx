import { useRef, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './BattleWeek2.css'
import { getWeek2Ranking } from '../api/receipts'

// ── 왕관 이미지 (4.svg=1등, 2.svg=2등, 5.svg=3등, 6.svg=4등)
import crown1 from '../assets/image/ChatGPT Image 2026년 4월 7일 오후 09_44_19 4.svg'
import crown2 from '../assets/image/ChatGPT Image 2026년 4월 7일 오후 09_44_19 2.svg'
import crown3 from '../assets/image/ChatGPT Image 2026년 4월 7일 오후 09_44_19 5.svg'
import crown4 from '../assets/image/ChatGPT Image 2026년 4월 7일 오후 09_44_19 6.svg'

// ── 리스 이미지 (1등 전용)
import wreathL from '../assets/image/1등장식-왼쪽.svg'
import wreathR from '../assets/image/1등장식-오른쪽.svg'

// ── 마스코트 (색상별)
import mascotSky   from '../assets/image/mascot/하늘색.svg'
import mascotNavy  from '../assets/image/mascot/남색.svg'
import mascotBeige from '../assets/image/mascot/베이지.svg'
import mascotPink  from '../assets/image/mascot/분홍색.svg'
import mascotBlack from '../assets/image/mascot/검정색.svg'
import mascotGray  from '../assets/image/mascot/회색.svg'

// ── 하드코딩 대진표 (2주차 고정) ────────────────────────────
const STORES_CONFIG = [
  {
    storeName: '사랑집1',
    colleges: ['공과대학', '소프트웨어융합대학', '첨단ICT융합대학', '인문대학'],
  },
  {
    storeName: '사랑집2',
    colleges: ['자연과학대학', '경영대학', '메디컬', '경제정치사회융합학부'],
  },
  {
    storeName: '사랑집3',
    colleges: ['첨단바이오융합대학', '다산학부', '국방디지털융합학과', '사회과학대학'],
  },
]

// ── 데이터 매핑 ──────────────────────────────────────────────
const CROWNS = [null, crown1, crown2, crown3, crown4]

const MASCOTS = {
  하늘색: mascotSky,
  남색:   mascotNavy,
  베이지: mascotBeige,
  분홍색: mascotPink,
  검정색: mascotBlack,
  회색:   mascotGray,
}

const COLLEGE_INFO = {
  '경영대학':             { color: '하늘색', short: '경영대'   },
  '공과대학':             { color: '회색',   short: '공과대'   },
  '소프트웨어융합대학':   { color: '남색',   short: '소융대'   },
  '첨단ICT융합대학':      { color: '남색',   short: '첨아융'   },
  '인문대학':             { color: '남색',   short: '인문대'   },
  '자연과학대학':         { color: '남색',   short: '자과대'   },
  '다산학부대학':             { color: '남색',   short: '다산학부' },
  '약학대학':             { color: '하늘색', short: '약학대'   },
  '첨단바이오융합대학':   { color: '남색', short: '첨바융'   },
  '사회과학대학':         { color: '베이지', short: '사과대'   },
  '간호대학':             { color: '분홍색', short: '간호대'   },
  '의과대학':             { color: '검정색', short: '의대'     },
  '메디컬':               { color: '남색', short: '메디컬'   },
  '국방디지털융합학과':   { color: '남색',   short: '국디융'   },
  '경제정치사회융합학부': { color: '베이지', short: '경정사'   },
}

const STORE_COLORS = {
  '사랑집1': '#fdbd28',
  '사랑집2': '#ff5252',
  '사랑집3': '#0ca214',
}

const BADGE_BG = ['', '#fca506', '#646d80', '#646d80', '#646d80']

function getInfo(collegeName) {
  return COLLEGE_INFO[collegeName] ?? { color: '하늘색', short: collegeName }
}

// ── 빈 카드 (집계 전) ────────────────────────────────────────
function EmptyCard({ rank }) {
  return (
    <div className="bw2__card-wrapper">
      <img src={CROWNS[rank]} className="bw2__crown bw2__crown--dim" alt="" />
      <div className="bw2__card bw2__card--empty">
        <div className="bw2__card-top">
          <span className="bw2__empty-q">?</span>
        </div>
        <div className="bw2__card-foot">
          <span className="bw2__badge" style={{ background: '#b0b8c8' }}>미정</span>
          <p className="bw2__amount bw2__amount--dim">집계 중</p>
        </div>
      </div>
    </div>
  )
}

// ── 실제 순위 카드 ───────────────────────────────────────────
function RankCard({ rank, entry }) {
  const info    = getInfo(entry.collegeName)
  const mascot  = MASCOTS[info.color] ?? mascotSky
  const amount  = entry.totalPaymentAmount.toLocaleString('ko-KR')
  const isFirst = rank === 1

  return (
    <div className="bw2__card-wrapper">
      <img src={CROWNS[rank]} className="bw2__crown" alt={`${rank}등 왕관`} />
      <div className="bw2__card">
        <div className="bw2__card-top">
          <div className="bw2__mascot-wrap">
            {isFirst && <img src={wreathL} className="bw2__wreath bw2__wreath--l" alt="" />}
            {isFirst && <img src={wreathR} className="bw2__wreath bw2__wreath--r" alt="" />}
            <img src={mascot} className="bw2__mascot" alt={info.short} />
          </div>
        </div>
        <div className="bw2__card-foot">
          <span className="bw2__badge" style={{ background: BADGE_BG[rank] }}>
            {info.short}
          </span>
          <p className="bw2__amount">
            {amount}<span className="bw2__won">원</span>
          </p>
        </div>
      </div>
    </div>
  )
}

// ── 캐러셀 (랭킹 데이터 있을 때만 사용) ─────────────────────
function RankCarousel({ rankings }) {
  const trackRef      = useRef(null)
  const rafRef        = useRef(null)
  const activeIdxRef  = useRef(0)

  function updateActive() {
    const track = trackRef.current
    if (!track) return
    const center = track.scrollLeft + track.clientWidth / 2
    const slots  = track.querySelectorAll('.bw2__slot')
    let nearest = 0, minDist = Infinity
    slots.forEach((el, i) => {
      const dist = Math.abs(el.offsetLeft + el.offsetWidth / 2 - center)
      if (dist < minDist) { minDist = dist; nearest = i }
    })
    if (nearest !== activeIdxRef.current) {
      slots[activeIdxRef.current]?.classList.remove('bw2__slot--active')
      slots[nearest]?.classList.add('bw2__slot--active')
      activeIdxRef.current = nearest
    }
  }

  function onScroll() {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(updateActive)
  }

  useEffect(() => {
    const slots = trackRef.current?.querySelectorAll('.bw2__slot')
    slots?.[0]?.classList.add('bw2__slot--active')
    return () => rafRef.current && cancelAnimationFrame(rafRef.current)
  }, [])

  return (
    <div className="bw2__carousel" ref={trackRef} onScroll={onScroll}>
      {Array.from({ length: 4 }, (_, i) => {
        const rank  = i + 1
        const entry = rankings.find(r => r.rank === rank)
        return (
          <div key={rank} className="bw2__slot">
            {entry
              ? <RankCard rank={rank} entry={entry} />
              : <EmptyCard rank={rank} />
            }
          </div>
        )
      })}
    </div>
  )
}

// ── 사랑집 섹션 ─────────────────────────────────────────────
// config: STORES_CONFIG의 항목 (하드코딩)
// rankings: API에서 받아온 해당 가게의 랭킹 배열 (없으면 [])
function StoreSection({ config, rankings }) {
  const storeColor = STORE_COLORS[config.storeName] ?? '#fdbd28'
  const hasData    = rankings.length > 0
  const sorted     = hasData
    ? [...rankings].sort((a, b) => a.rank - b.rank)
    : []

  return (
    <section className="bw2__section">
      {/* 사랑집 배지 (하드코딩) */}
      <div className="bw2__store-badge" style={{ background: storeColor }}>
        {config.storeName} 대결
      </div>

      {/* 대진 현황 (하드코딩) */}
      <div className="bw2__standings">
        {config.colleges.map((collegeName, i) => (
          <span key={i} className="bw2__standings-item">
            <span className="bw2__college-name">
              {getInfo(collegeName).short}
            </span>
            {i < config.colleges.length - 1 && (
              <span className="bw2__vs">vs</span>
            )}
          </span>
        ))}
      </div>

      {/* 랭킹 카드 or 참여대학 없음 */}
      {hasData
        ? <RankCarousel rankings={sorted} />
        : <p className="bw2__no-data">참여대학 없음</p>
      }
    </section>
  )
}

// ── 메인 페이지 ─────────────────────────────────────────────
export default function BattleWeek2() {
  const navigate = useNavigate()
  // storeName → rankings 맵 (API 응답)
  const [rankingMap, setRankingMap] = useState({})

  useEffect(() => {
    getWeek2Ranking()
      .then(data => {
        if (Array.isArray(data)) {
          const map = {}
          data.forEach(store => {
            map[store.storeName] = Array.isArray(store.rankings) ? store.rankings : []
          })
          setRankingMap(map)
        }
      })
      .catch(() => {
        // 네트워크 오류 시 하드코딩 구조는 그대로 유지, 카드 영역만 '참여대학 없음'
      })
  }, [])

  return (
    <div className="bw2">

      {/* ── 헤더 ── */}
      <header className="bw2__header">
        <button className="bw2__back" onClick={() => navigate(-1)} aria-label="뒤로가기">
          <svg width="11" height="20" viewBox="0 0 11 20" fill="none">
            <path d="M9.5 1.5L1.5 10L9.5 18.5"
              stroke="#fff" strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round"
            />
          </svg>
        </button>
        <p className="bw2__title">RE : AJOU CHECK</p>
        <p className="bw2__subtitle">캠퍼스 챌린지</p>
        <hr className="bw2__divider" />
      </header>

      {/* ── 사랑집 섹션 (항상 3개 표시) ── */}
      {STORES_CONFIG.map(config => (
        <StoreSection
          key={config.storeName}
          config={config}
          rankings={rankingMap[config.storeName] ?? []}
        />
      ))}

    </div>
  )
}
