import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './BattleWeek3.css'
import { getWeek3Challenge } from '../api/receipts'

import char1 from '../assets/image/3주차_1.svg'
import char2 from '../assets/image/3주차_2.svg'
import charDraw from '../assets/image/3주차_무승부.svg'

// ── 하드코딩 대진표 (3주차 고정) ────────────────────────────
// API는 matchup 인덱스 순서대로 응답 (0: 23vs24, 1: 25vs26)
const MATCHUPS_CONFIG = [
  {
    storeName: '사랑집4',
    storeColor: '#fdbd28',
    matchupLabel: '23학번 vs 24학번',
    year1Label: '23학번',
    year2Label: '24학번',
  },
  {
    storeName: '사랑집5',
    storeColor: '#0ca214',
    matchupLabel: '25학번 vs 26학번',
    year1Label: '25학번',
    year2Label: '26학번',
  },
]

// ── 한 대진 카드 슬롯 (캐릭터 + 컬러박스) ────────────────────
// result: 'win' | 'lose' | 'draw'
function BattleSlot({ charSrc, label, result, amount }) {
  const resultText = result === 'win' ? 'WIN' : result === 'lose' ? 'LOSE' : 'DRAW'

  return (
    <div className={`bw3__slot bw3__slot--${result}`}>
      <img src={charSrc} className="bw3__char" alt="" />
      <div className={`bw3__card bw3__card--${result}`}>
        <span className="bw3__badge">{label}</span>
        <p className={`bw3__result-text bw3__result-text--${result}`}>{resultText}</p>
        <p className="bw3__amount">
          {amount.toLocaleString('ko-KR')}<span className="bw3__won">원</span>
        </p>
      </div>
    </div>
  )
}

// ── 대진 섹션 ────────────────────────────────────────────────
function MatchupSection({ config, data }) {
  // API가 항상 데이터를 반환 (집계 없으면 0 반환 → isDraw=true로 처리됨)
  if (!data) return (
    <section className="bw3__section">
      <div className="bw3__store-badge" style={{ background: config.storeColor }}>
        {config.storeName} 대결
      </div>
      <div className="bw3__standings">
        <span className="bw3__year-name">{config.year1Label}</span>
        <span className="bw3__vs">vs</span>
        <span className="bw3__year-name">{config.year2Label}</span>
      </div>
    </section>
  )

  const isDraw = data.isDraw
  const year1Result = isDraw ? 'draw' : (data.year1Total >= data.year2Total ? 'win' : 'lose')
  const year2Result = isDraw ? 'draw' : (data.year2Total > data.year1Total ? 'win' : 'lose')
  const year1Char = isDraw ? charDraw : char1
  const year2Char = isDraw ? charDraw : char2

  return (
    <section className="bw3__section">
      {/* 가게 배지 */}
      <div className="bw3__store-badge" style={{ background: config.storeColor }}>
        {config.storeName} 대결
      </div>

      {/* 대진 현황 */}
      <div className="bw3__standings">
        <span className="bw3__year-name">{config.year1Label}</span>
        <span className="bw3__vs">vs</span>
        <span className="bw3__year-name">{config.year2Label}</span>
      </div>

      {/* 카드 대결 */}
      <div className="bw3__matchup">
        <BattleSlot
          charSrc={year1Char}
          label={config.year1Label}
          result={year1Result}
          amount={data.year1Total}
        />
        <BattleSlot
          charSrc={year2Char}
          label={config.year2Label}
          result={year2Result}
          amount={data.year2Total}
        />
      </div>
    </section>
  )
}

// ── 메인 페이지 ─────────────────────────────────────────────
export default function BattleWeek3() {
  const navigate = useNavigate()
  const [matchups, setMatchups] = useState([])

  useEffect(() => {
    getWeek3Challenge()
      .then(res => {
        if (res?.success && Array.isArray(res.data)) {
          setMatchups(res.data)
        }
      })
      .catch(() => {})
  }, [])

  return (
    <div className="bw3">

      {/* ── 헤더 ── */}
      <header className="bw3__header">
        <button className="bw3__back" onClick={() => navigate(-1)} aria-label="뒤로가기">
          <svg width="11" height="20" viewBox="0 0 11 20" fill="none">
            <path d="M9.5 1.5L1.5 10L9.5 18.5"
              stroke="#fff" strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round"
            />
          </svg>
        </button>
        <p className="bw3__title">RE : AJOU CHECK</p>
        <p className="bw3__subtitle">캠퍼스 챌린지</p>
        <hr className="bw3__divider" />
      </header>

      {/* ── 대진 섹션 ── */}
      {MATCHUPS_CONFIG.map((config, i) => (
        <MatchupSection
          key={config.storeName}
          config={config}
          data={matchups[i] ?? null}
        />
      ))}

    </div>
  )
}
