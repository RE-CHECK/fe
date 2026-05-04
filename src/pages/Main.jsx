import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer,
} from 'recharts'
import './Main.css'
import AlertModal from '../components/AlertModal'
import WeekStartModal from '../components/WeekStartModal'
import asset21       from '../assets/image/자산 21@4x 1.svg'
import floatCircle  from '../assets/icon/float-btn-circle.svg'
import floatBubble  from '../assets/icon/float-btn-bubble.svg'
import mascotHaneul  from '../assets/image/mascot/하늘색-2.svg'
import mascotHoesek  from '../assets/image/mascot/회색-2.svg'
import mascotNamsek  from '../assets/image/mascot/남색-2.svg'
import mascotBeige   from '../assets/image/mascot/베이지-2.svg'
import mascotPink    from '../assets/image/mascot/분홍색-2.svg'
import mascotBlack   from '../assets/image/mascot/검정색-2.svg'
import { getMyDashboard } from '../api/users'
import {
  getTotalParticipation, getTotalAllPayment,
  getCollegeTotalPayment, getWeeklyCollegeRanking,
} from '../api/receipts'
import { getCurrentWeek } from '../api/weeks'

const COLLEGE_MASCOT = {
  '경영대학':         mascotHaneul,
  '공과대학':         mascotHoesek,
  '소프트웨어융합대학': mascotNamsek,
  '첨단ICT융합대학':  mascotNamsek,
  '인문대학':         mascotNamsek,
  '자연과학대학':     mascotNamsek,
  '다산학부':         mascotNamsek,
  '약학대학':         mascotHaneul,
  '첨단바이오융합대학': mascotHaneul,
  '사회과학대학':     mascotBeige,
  '간호대학':         mascotPink,
  '의과대학':         mascotBlack,
}

const DAYS = ['월', '화', '수', '목', '금', '토', '일']

const CHART_COLORS = ['#635cff', '#c7a800', '#ec5a89', '#0ca214']

const COLLEGE_SHORT = {
  '공과대학':         '공과대',
  '경영대학':         '경영대',
  '소프트웨어융합대학': '소융대',
  '첨단ICT융합대학':  '첨아융',
  '인문대학':         '인문대',
  '자연과학대학':     '자과대',
  '다산학부대학':         '다산대',
  '약학대학':         '약학대',
  '첨단바이오융합대학': '첨바융',
  '사회과학대학':     '사과대',
  '간호대학':         '간호대',
  '의과대학':         '의과대',
}
const shortenCollegeName = name => COLLEGE_SHORT[name] ?? name.slice(0, 3)

function formatUpdateTime(date) {
  const month  = date.getMonth() + 1
  const day    = date.getDate()
  const hour24 = date.getHours()
  const period = hour24 < 12 ? '오전' : '오후'
  const hour12 = hour24 % 12 || 12
  const min = String(date.getMinutes()).padStart(2, '0')
  const sec = String(date.getSeconds()).padStart(2, '0')
  return `${month}월 ${day}일 ${period} ${hour12}시 ${min}분 ${sec}초`
}

function CustomDayTick({ x, y, payload }) {
  const R = 15
  return (
    <g transform={`translate(${x},${y + R + 2})`}>
      <circle cx={0} cy={0} r={R} fill="rgba(255,255,255,0.25)" />
      <text
        x={0} y={0}
        textAnchor="middle"
        dominantBaseline="central"
        fill="white"
        fontFamily="'온글잎 박다현체', sans-serif"
        fontSize={13}
      >
        {payload.value}
      </text>
    </g>
  )
}

export default function Main() {
  const navigate = useNavigate()
  const [showBattleModal, setShowBattleModal] = useState(false)
  const [showStoresModal, setShowStoresModal] = useState(false)
  const [showWeekModal, setShowWeekModal]     = useState(false)
  const [currentWeek, setCurrentWeek]         = useState(null)
  const [user, setUser]                       = useState({ name: '', college: '', spent: '' })
  const [totalParticipation, setTotalParticipation] = useState('')
  const [totalAllPayment, setTotalAllPayment]       = useState('')
  const [collegeTotalPayment, setCollegeTotalPayment] = useState('')
  const [rankingData, setRankingData]         = useState([])
  const [updateTime, setUpdateTime]           = useState('')

  useEffect(() => {
    getCurrentWeek()
      .then(data => {
        const week = data.weekNumber
        console.log('[WeekModal] API 응답 weekNumber:', week)
        setCurrentWeek(week)

        const prevWeek = localStorage.getItem('prevActiveWeek')
        const weekKey  = week === null ? 'null' : String(week)
        console.log('[WeekModal] prevActiveWeek:', prevWeek, '→', weekKey, '/ weekModalSeen:', localStorage.getItem('weekModalSeen'))

        if (week === 2 || week === 3) {
          if (prevWeek !== weekKey) {
            localStorage.removeItem('weekModalSeen')
            console.log('[WeekModal] 주차 변경 감지 → weekModalSeen 초기화')
          }
          if (!localStorage.getItem('weekModalSeen')) {
            console.log('[WeekModal] 모달 표시')
            setShowWeekModal(true)
          }
        }

        localStorage.setItem('prevActiveWeek', weekKey)
        return getWeeklyCollegeRanking(week)
      })
      .then(data => {
        setRankingData(data.rankings || [])
        setUpdateTime(formatUpdateTime(new Date()))
      })
      .catch(err => console.error('[WeekModal] getCurrentWeek 실패:', err))

    getMyDashboard()
      .then(data => setUser({
        name:    data.name,
        college: data.collegeName,
        spent:   `${data.totalPaymentAmount.toLocaleString()}원`,
      }))
      .catch(() => {})

    getTotalParticipation()
      .then(data => setTotalParticipation(data.totalParticipationCount.toLocaleString()))
      .catch(() => {})

    getTotalAllPayment()
      .then(data => setTotalAllPayment(data.totalAllPaymentAmount.toLocaleString()))
      .catch(() => {})

    getCollegeTotalPayment()
      .then(data => setCollegeTotalPayment(data.totalPaymentAmount.toLocaleString()))
      .catch(() => {})
  }, [])

  const chartData = DAYS.map(day => {
    const entry = { day }
    rankingData.forEach((college, i) => {
      const found = college.dailyAmounts?.find(d => d.day === day)
      entry[`c${i}`] = found?.amount ?? 0
    })
    return entry
  })

  function handleWeekModalClose() {
    localStorage.setItem('weekModalSeen', '1')
    setShowWeekModal(false)
  }

  return (
    <div className="main">

      {/* 트랙 배경 이미지 */}
      <div className="main__track-bg">
        <img src={asset21} alt="" />
      </div>

      {/* ── 헤더 ── */}
      <div className="main__header">
        <div>
          <p className="main__title">RE : AJOU CHECK</p>
          <p className="main__subtitle">캠퍼스 챌린지</p>
        </div>
        <button
          className="main__logout-btn"
          onClick={() => {
            localStorage.removeItem('accessToken')
            navigate('/')
          }}
        >
          로그아웃
        </button>
      </div>

      <hr className="main__divider" />

      {/* ── 유저 카드 ── */}
      <div className="main__card">
        <div className="main__card-mascot"><img src={COLLEGE_MASCOT[user.college] ?? mascotNamsek} alt="" /></div>
        <p className="main__card-name">{user.name}</p>
        <p className="main__card-college">{user.college}</p>
        <p className="main__card-label">지금까지 얼마 썼나요?</p>
        <p className="main__card-amount">{user.spent}</p>
      </div>

      {/* ── 제휴매장 버튼 ── */}
      <button className="main__store-btn" onClick={() => setShowStoresModal(true)}>
        제휴매장 한 눈에 보기
      </button>

      {/* ── 통계 ── */}
      <div className="main__stat-block">
        <div className="main__pill main__pill--yellow">총 누적 참여 횟수</div>
        <p className="main__stat-num">
          {totalParticipation}<span className="main__stat-unit">회</span>
        </p>
      </div>

      <div className="main__stat-block">
        <div className="main__pill main__pill--red">총 누적 소비 금액</div>
        <p className="main__stat-num">
          {totalAllPayment}<span className="main__stat-unit">원</span>
        </p>
      </div>

      <div className="main__stat-block main__stat-block--last">
        <div className="main__pill main__pill--green">
          {user.college} 총 누적 소비 금액
        </div>
        <p className="main__stat-num">
          {collegeTotalPayment}<span className="main__stat-unit">원</span>
        </p>
      </div>

      {/* ── 차트 섹션 ── */}
      <div className="main__chart-section">

        <div className="main__chart-title-wrap">
          <div className="main__chart-legend-mini">
            {rankingData.map((college, i) => (
              <div key={college.collegeName} className="main__chart-legend-mini-item">
                <span className="main__chart-legend-mini-dot" style={{ background: CHART_COLORS[i] }} />
                <span className="main__chart-legend-mini-name" style={{ color: CHART_COLORS[i] }}>
                  {shortenCollegeName(college.collegeName)}
                </span>
              </div>
            ))}
          </div>
          <div className="main__chart-pill">이번 주 단과대 소비 현황</div>
        </div>
        <p className="main__chart-update">업데이트 일시 : {updateTime || '--'}</p>

        <div className="main__chart-area">
          <div className="main__chart-rechart">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 8, right: 20, bottom: 4, left: 20 }}>
                <CartesianGrid
                  vertical={true}
                  horizontal={false}
                  stroke="rgba(255,255,255,0.45)"
                  strokeDasharray="4 4"
                />
                <XAxis
                  dataKey="day"
                  tick={<CustomDayTick />}
                  tickLine={false}
                  axisLine={{ stroke: 'rgba(255,255,255,0.5)' }}
                  interval={0}
                  height={36}
                />
                <YAxis
                  hide
                  width={0}
                  domain={[0, dataMax => Math.max(dataMax, 1)]}
                />
                {rankingData.map((college, i) => (
                  <Line
                    key={college.collegeName}
                    type="monotone"
                    dataKey={`c${i}`}
                    stroke={CHART_COLORS[i]}
                    strokeWidth={2}
                    dot={{ r: 3, fill: CHART_COLORS[i], strokeWidth: 0 }}
                    activeDot={{ r: 4 }}
                    connectNulls
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>

        </div>

      </div>

      {/* ── 하단 카드 ── */}
      <div className="main__bottom">
        <div className="main__bottom-card main__bottom-card--dark">
          <p className="main__bottom-big">RANK</p>
          <button className="main__bottom-btn main__bottom-btn--white" onClick={() => {
            if (currentWeek === 2) navigate('/battle/week2')
            else if (currentWeek === 3) navigate('/battle/week3')
            else setShowBattleModal(true)
          }}>대결현황</button>
        </div>
        <div className="main__bottom-card main__bottom-card--light">
          <p className="main__bottom-big main__bottom-big--blue">GO!</p>
          <button id="btn-go-challenge" className="main__bottom-btn main__bottom-btn--blue" onClick={() => navigate('/receipt-upload')}>참여하기</button>
        </div>
      </div>

      {showWeekModal && (
        <WeekStartModal week={currentWeek} onClose={handleWeekModalClose} />
      )}

      {showStoresModal && (
        <AlertModal
          title="추후 오픈 예정!"
          desc="조금만 기다려주세요"
          btnVariant="yellow"
          onClose={() => setShowStoresModal(false)}
        />
      )}

      {showBattleModal && (
        <AlertModal
          title="추후 오픈 예정!"
          desc="조금만 기다려주세요"
          btnVariant="yellow"
          onClose={() => setShowBattleModal(false)}
        />
      )}

      <a
        className="main__float-btn"
        href="http://pf.kakao.com/_GxdvZX"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="main__float-btn-inner">
          <img src={floatCircle} className="main__float-btn-circle" alt="" />
          <div className="main__float-btn-content">
            <div className="main__float-btn-icon-wrap">
              <img src={floatBubble} className="main__float-btn-bubble" alt="" />
              <svg className="main__float-btn-lines" viewBox="0 0 124 124" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M30 50L94 50" stroke="#222222" strokeWidth="9" strokeLinecap="round"/>
                <path d="M30 74L94 74" stroke="#222222" strokeWidth="9" strokeLinecap="round"/>
              </svg>
            </div>
            <p className="main__float-btn-text">문의하기</p>
          </div>
        </div>
      </a>
    </div>
  )
}
