import './StoreInfoModal.css'

export default function StoreInfoModal({ storeInfo, onClose }) {
  if (!storeInfo) return null

  const isPair = storeInfo.images.length > 1

  return (
    <div className="sinfo__overlay" onClick={onClose}>
      <div className="sinfo__card" onClick={e => e.stopPropagation()}>
        <div
          className={`sinfo__photos${isPair ? ' sinfo__photos--pair' : ''}`}
          style={isPair && storeInfo.imageHeight ? { height: `${storeInfo.imageHeight}cqw` } : undefined}
        >
          {storeInfo.images.map((src, i) => (
            <img
              key={i}
              src={src}
              className="sinfo__photo"
              style={storeInfo.imageRatios ? { flex: storeInfo.imageRatios[i] } : undefined}
              alt=""
            />
          ))}
        </div>

        <div className="sinfo__name-badge" style={{ background: storeInfo.color }}>
          {storeInfo.badgeName}
        </div>

        <div className="sinfo__rows">
          <div className="sinfo__row">
            <svg className="sinfo__icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            <a
              className="sinfo__address-link"
              href={`https://map.naver.com/v5/search/${encodeURIComponent(storeInfo.address)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {storeInfo.address}
            </a>
          </div>
          <div className="sinfo__row">
            <svg className="sinfo__icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/>
            </svg>
            <p>{storeInfo.hours}</p>
          </div>
          <div className="sinfo__row">
            <svg className="sinfo__icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57-.35-.11-.74-.03-1.02.24l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.59l2.2-2.21c.28-.26.36-.65.25-1C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1z"/>
            </svg>
            <a className="sinfo__address-link" href={`tel:${storeInfo.phone}`}>
              {storeInfo.phone}
            </a>
          </div>
          <div className="sinfo__row">
            <svg className="sinfo__icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z"/>
            </svg>
            <p>{storeInfo.desc}</p>
          </div>
        </div>

        <button className="sinfo__close" onClick={onClose}>
          닫기
        </button>
      </div>
    </div>
  )
}
