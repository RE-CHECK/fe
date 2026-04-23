import './WeekStartModal.css'
import silhouette  from '../assets/image/character_silhouette 1.svg'
import crown1      from '../assets/image/ChatGPT Image 2026년 4월 7일 오후 09_44_19 4.svg'
import crown2      from '../assets/image/ChatGPT Image 2026년 4월 7일 오후 09_44_19 2.svg'
import crown3      from '../assets/image/ChatGPT Image 2026년 4월 7일 오후 09_44_19 5.svg'
import crown4      from '../assets/image/ChatGPT Image 2026년 4월 7일 오후 09_44_19 6.svg'
import wreathLeft  from '../assets/image/1등장식-왼쪽.svg'
import wreathRight from '../assets/image/1등장식-오른쪽.svg'
import char3win    from '../assets/image/3주차_1.svg'
import char3lose   from '../assets/image/3주차_2.svg'

const RANKS = [
  { bg: '#fcfad6',                crown: crown1, hasWreath: true },
  { bg: 'rgba(208,213,220,0.64)', crown: crown2  },
  { bg: 'rgba(216,136,21,0.34)',  crown: crown3  },
  { bg: 'rgba(194,93,34,0.42)',   crown: crown4  },
]

export default function WeekStartModal({ week, onClose }) {
  return (
    <div className="wm__overlay">
      <div className="wm">

        {week === 3 ? (
          <div className="wm__battle">
            <div className="wm__battle-slot wm__battle-slot--win">
              <img src={char3win} className="wm__char" alt="" />
              <div className="wm__box wm__box--win">
                <span className="wm__box-text">WIN</span>
              </div>
            </div>
            <div className="wm__battle-slot wm__battle-slot--lose">
              <img src={char3lose} className="wm__char" alt="" />
              <div className="wm__box wm__box--lose">
                <span className="wm__box-text">LOSE</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="wm__grid">
            {RANKS.map((rank, i) => (
              <div key={i} className="wm__slot">
                <img src={rank.crown} className="wm__crown" alt="" />
                <div className="wm__card" style={{ background: rank.bg }}>
                  <img src={silhouette} className="wm__silhouette" alt="" />
                  {rank.hasWreath && (
                    <>
                      <img src={wreathLeft}  className="wm__wreath wm__wreath--left"  alt="" />
                      <img src={wreathRight} className="wm__wreath wm__wreath--right" alt="" />
                    </>
                  )}
                  <span className="wm__question">?</span>
                </div>
              </div>
            ))}
          </div>
        )}

        <p className="wm__title">
          <span className="wm__title--blue">{week}주차 캠퍼스 챌린지</span>{' 시작!'}
        </p>
        <p className="wm__desc">대결현황에서 확인해볼까요?</p>
        <button className="wm__btn" onClick={onClose}>확인</button>

      </div>
    </div>
  )
}
