import { useRef, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './SpecialMatch.css'
import { getSpecialMatchRanking } from '../api/receipts'

// ── 왕관 이미지 (4.svg=1등, 2.svg=2등, 5.svg=3등, 6.svg=4등)
import crown1 from '../assets/image/ChatGPT Image 2026년 4월 7일 오후 09_44_19 4.svg'
import crown2 from '../assets/image/ChatGPT Image 2026년 4월 7일 오후 09_44_19 2.svg'
import crown3 from '../assets/image/ChatGPT Image 2026년 4월 7일 오후 09_44_19 5.svg'
import crown4 from '../assets/image/ChatGPT Image 2026년 4월 7일 오후 09_44_19 6.svg'

// ── 리스 이미지 (1등 전용)
import wreathL from '../assets/image/1등장식-왼쪽.svg'
import wreathR from '../assets/image/1등장식-오른쪽.svg'

// ── 마스코트 (스페셜 매치는 단일 마스코트 - 남색)
import specialMascot from '../assets/image/mascot/남색.svg'

// ── 고정 데이터 ─────────────────────────────────────────────
const MATCH_TITLE = '경영인텔리빨사이에낀SPAGHETTL'
const YEAR_LABELS = ['23학번', '24학번', '25학번', '26학번']

const CROWNS = [null, crown1, crown2, crown3, crown4]
const BADGE_BG = ['', '#fca506', '#646d80', '#e08f14', '#646d80']

// ── 빈 카드 (집계 전 / 조회 실패) ────────────────────────────
function EmptyCard({ rank }) {
  return (
    <div className="sm__card-wrapper">
      <img src={CROWNS[rank]} className="sm__crown sm__crown--dim" alt="" />
      <div className="sm__card sm__card--empty">
        <div className="sm__card-top">
          <span className="sm__empty-q">?</span>
        </div>
        <div className="sm__card-foot">
          <span className="sm__badge" style={{ background: '#b0b8c8' }}>미정</span>
          <p className="sm__amount sm__amount--dim">집계 중</p>
        </div>
      </div>
    </div>
  )
}

// ── 순위 카드 ───────────────────────────────────────────────
function RankCard({ rank, entry }) {
  const amount  = entry.totalPaymentAmount.toLocaleString('ko-KR')
  const isFirst = rank === 1

  return (
    <div className="sm__card-wrapper">
      <img src={CROWNS[rank]} className="sm__crown" alt={`${rank}등 왕관`} />
      <div className="sm__card">
        <div className="sm__card-top">
          <div className="sm__mascot-wrap">
            {isFirst && <img src={wreathL} className="sm__wreath sm__wreath--l" alt="" />}
            {isFirst && <img src={wreathR} className="sm__wreath sm__wreath--r" alt="" />}
            <img src={specialMascot} className="sm__mascot" alt={entry.studentYear} />
          </div>
        </div>
        <div className="sm__card-foot">
          <span className="sm__badge" style={{ background: BADGE_BG[rank] }}>
            {entry.studentYear}
          </span>
          <p className="sm__amount">
            {amount}<span className="sm__won">원</span>
          </p>
        </div>
      </div>
    </div>
  )
}

// ── 캐러셀 ───────────────────────────────────────────────────
function RankCarousel({ rankings }) {
  const trackRef      = useRef(null)
  const rafRef        = useRef(null)
  const activeIdxRef  = useRef(0)

  function updateActive() {
    const track = trackRef.current
    if (!track) return
    const center = track.scrollLeft + track.clientWidth / 2
    const slots  = track.querySelectorAll('.sm__slot')
    let nearest = 0, minDist = Infinity
    slots.forEach((el, i) => {
      const dist = Math.abs(el.offsetLeft + el.offsetWidth / 2 - center)
      if (dist < minDist) { minDist = dist; nearest = i }
    })
    if (nearest !== activeIdxRef.current) {
      slots[activeIdxRef.current]?.classList.remove('sm__slot--active')
      slots[nearest]?.classList.add('sm__slot--active')
      activeIdxRef.current = nearest
    }
  }

  function onScroll() {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(updateActive)
  }

  useEffect(() => {
    const slots = trackRef.current?.querySelectorAll('.sm__slot')
    slots?.[0]?.classList.add('sm__slot--active')
    return () => rafRef.current && cancelAnimationFrame(rafRef.current)
  }, [])

  return (
    <div className="sm__carousel" ref={trackRef} onScroll={onScroll}>
      {Array.from({ length: 4 }, (_, i) => {
        const rank  = i + 1
        const entry = rankings.find(r => r.rank === rank)
        return (
          <div key={rank} className="sm__slot">
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

// ── 메인 페이지 ─────────────────────────────────────────────
export default function SpecialMatch() {
  const navigate = useNavigate()
  const [rankings, setRankings] = useState([])

  useEffect(() => {
    getSpecialMatchRanking()
      .then(data => {
        if (Array.isArray(data)) setRankings(data)
      })
      .catch(() => {
        // 조회 실패 시 빈 배열 유지 → EmptyCard 4장 노출
      })
  }, [])

  return (
    <div className="sm">

      {/* ── 헤더 ── */}
      <header className="sm__header">
        <button className="sm__back" onClick={() => navigate(-1)} aria-label="뒤로가기">
          <svg width="11" height="20" viewBox="0 0 11 20" fill="none">
            <path d="M9.5 1.5L1.5 10L9.5 18.5"
              stroke="#fff" strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round"
            />
          </svg>
        </button>
        <p className="sm__title">RE : AJOU CHECK</p>
        <p className="sm__subtitle">캠퍼스 챌린지</p>
        <hr className="sm__divider" />
      </header>

      {/* ── 스페셜 매치 섹션 ── */}
      <section className="sm__section">
        <div className="sm__match-title">{MATCH_TITLE}</div>

        <div className="sm__standings">
          {YEAR_LABELS.map((label, i) => (
            <span key={i} className="sm__standings-item">
              <span className="sm__year-name">{label}</span>
              {i < YEAR_LABELS.length - 1 && (
                <span className="sm__vs">vs</span>
              )}
            </span>
          ))}
        </div>

        <RankCarousel rankings={rankings} />
      </section>

    </div>
  )
}
