import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './BattleWeek3.css'
import { getWeek3Challenge } from '../api/receipts'

import char1 from '../assets/image/3주차_1.svg'
import char2 from '../assets/image/3주차_2.svg'
import charDraw from '../assets/image/3주차_무승부.svg'

const MATCHUPS_CONFIG = [
  {
    storeName: '사랑집4',
    storeColor: '#fdbd28',
    year1Label: '23학번',
    year2Label: '24학번',
    badge1: '팀23',
    badge2: '팀24',
  },
  {
    storeName: '사랑집5',
    storeColor: '#0ca214',
    year1Label: '25학번',
    year2Label: '26학번',
    badge1: '팀25',
    badge2: '팀26',
  },
]

// ── 승/패 슬롯 ───────────────────────────────────────────────
function BattleSlot({ charSrc, badge, result, amount }) {
  const resultText = result === 'win' ? 'WIN' : 'LOSE'

  return (
    <div className={`bw3__slot bw3__slot--${result}`}>
      <img src={charSrc} className="bw3__char" alt="" />
      <div className={`bw3__card bw3__card--${result}`}>
        <span className="bw3__badge">{badge}</span>
        <div className="bw3__card-content">
          <p className={`bw3__result-text bw3__result-text--${result}`}>{resultText}</p>
          <p className={`bw3__amount bw3__amount--${result}`}>
            {amount.toLocaleString('ko-KR')}<span className="bw3__won">원</span>
          </p>
        </div>
      </div>
    </div>
  )
}

// ── 무승부 레이아웃 ──────────────────────────────────────────
function DrawSection({ config, data }) {
  return (
    <div className="bw3__matchup">
      <div className="bw3__slot bw3__slot--draw">
        <img src={charDraw} className="bw3__char" alt="" />
        <div className="bw3__card bw3__card--draw">
          <span className="bw3__badge">{config.badge1}</span>
          <div className="bw3__card-content">
            <p className="bw3__result-text bw3__result-text--draw">DRAW</p>
            <p className="bw3__amount bw3__amount--draw">
              {data.year1Total.toLocaleString('ko-KR')}<span className="bw3__won">원</span>
            </p>
          </div>
        </div>
      </div>
      <div className="bw3__slot bw3__slot--draw">
        <img src={charDraw} className="bw3__char" alt="" />
        <div className="bw3__card bw3__card--draw">
          <span className="bw3__badge">{config.badge2}</span>
          <div className="bw3__card-content">
            <p className="bw3__result-text bw3__result-text--draw">DRAW</p>
            <p className="bw3__amount bw3__amount--draw">
              {data.year2Total.toLocaleString('ko-KR')}<span className="bw3__won">원</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── 대진 섹션 ────────────────────────────────────────────────
function MatchupSection({ config, data }) {
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

  const isDraw = data.draw
  const year1Result = data.year1Total >= data.year2Total ? 'win' : 'lose'
  const year2Result = data.year2Total > data.year1Total ? 'win' : 'lose'

  return (
    <section className="bw3__section">
      <div className="bw3__store-badge" style={{ background: config.storeColor }}>
        {config.storeName} 대결
      </div>
      <div className="bw3__standings">
        <span className="bw3__year-name">{config.year1Label}</span>
        <span className="bw3__vs">vs</span>
        <span className="bw3__year-name">{config.year2Label}</span>
      </div>

      {isDraw ? (
        <DrawSection config={config} data={data} />
      ) : (
        <div className="bw3__matchup">
          <BattleSlot
            charSrc={char1}
            badge={config.badge1}
            result={year1Result}
            amount={data.year1Total}
          />
          <BattleSlot
            charSrc={char2}
            badge={config.badge2}
            result={year2Result}
            amount={data.year2Total}
          />
        </div>
      )}
    </section>
  )
}

// ── 메인 페이지 ─────────────────────────────────────────────
export default function BattleWeek3() {
  const navigate = useNavigate()
  const [matchups, setMatchups] = useState([])

  useEffect(() => {
    getWeek3Challenge()
      .then(data => {
        if (Array.isArray(data)) {
          setMatchups(data)
        }
      })
      .catch(() => {})
  }, [])

  return (
    <div className="bw3">

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
