import { useEffect, useMemo, useRef, useState } from 'react'
import Particles from './components/Particles'
import ScheduleIcon from './components/ScheduleIcons'
import useCountdown from './hooks/useCountdown'
import useScrollReveal from './hooks/useScrollReveal'
import {
  wedding,
  copy,
  formatWeddingDate,
  formatWeddingDateTime,
} from './data/content'
import { applySeo } from './seo'
import './App.css'

function pad(n) {
  return String(n).padStart(2, '0')
}

export default function App() {
  const [lang, setLang] = useState('en')
  const [opened, setOpened] = useState(false)
  const [musicOn, setMusicOn] = useState(false)
  const [copied, setCopied] = useState(false)
  const [activeStory, setActiveStory] = useState(0)
  const videoRef = useRef(null)
  const scrollRef = useRef(null)
  const t = copy[lang]
  const countdown = useCountdown(wedding.dateISO)
  useScrollReveal(scrollRef, opened)

  const dateLabel = useMemo(
    () => formatWeddingDate(wedding.dateISO, lang),
    [lang],
  )
  const dateTimeLabel = useMemo(
    () => formatWeddingDateTime(wedding.dateISO, lang),
    [lang],
  )

  const groomDisplay =
    lang === 'km' ? wedding.groom.fullNameKm : wedding.groom.fullName
  const brideDisplay =
    lang === 'km' ? wedding.bride.fullNameKm : wedding.bride.fullName
  const coupleTitle = `${groomDisplay} & ${brideDisplay}`

  useEffect(() => {
    applySeo(lang)
  }, [lang])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.muted = !musicOn
    if (opened && musicOn) {
      video.play().catch(() => {})
    }
  }, [musicOn, opened])

  useEffect(() => {
    if (!opened) return undefined
    const id = setInterval(() => {
      setActiveStory((i) => (i + 1) % wedding.story.length)
    }, 4500)
    return () => clearInterval(id)
  }, [opened])

  function openInvitation() {
    setOpened(true)
    setMusicOn(true)
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      /* ignore */
    }
  }

  function shareTelegram() {
    const url = encodeURIComponent(window.location.href)
    const text = encodeURIComponent(
      `${coupleTitle} — ${t.weddingOf}`,
    )
    window.open(`https://t.me/share/url?url=${url}&text=${text}`, '_blank')
  }

  return (
    <div className="shell">
      <Particles />
      <div className={`phone lang-${lang}`}>
        <header className="topbar">
          <div className="lang" role="group" aria-label="Language">
            <button
              type="button"
              className={lang === 'en' ? 'is-active' : ''}
              onClick={() => setLang('en')}
            >
              ENG
            </button>
            <button
              type="button"
              className={lang === 'km' ? 'is-active' : ''}
              onClick={() => setLang('km')}
            >
              ខ្មែរ
            </button>
          </div>
          <button
            type="button"
            className={`music-btn ${musicOn ? 'is-on' : ''}`}
            onClick={() => setMusicOn((v) => !v)}
            aria-label={musicOn ? 'Mute' : 'Unmute'}
          >
            {musicOn ? '♪' : '🔇'}
          </button>
        </header>

        {!opened && (
          <section className="cover">
            <div
              className="cover__bg"
              style={{ backgroundImage: `url(${wedding.coverPhoto})` }}
            />
            <div className="cover__veil" />
            <div className="cover__content">
              <p className="eyebrow">{t.weddingOf}</p>
              <h1 className="names script names--stack">
                <span>{groomDisplay}</span>
                <span className="names__amp">&</span>
                <span>{brideDisplay}</span>
              </h1>
              <p className="cover__date">{dateLabel}</p>
              <button type="button" className="cta" onClick={openInvitation}>
                {t.openInvite} 💌
              </button>
              <p className="hint">{t.soundHint} 🎶</p>
            </div>
          </section>
        )}

        {opened && (
          <main className="scroll" ref={scrollRef}>
            <section className="welcome">
              <div
                className="welcome__hero"
                style={{ backgroundImage: `url(${wedding.coverPhoto})` }}
                data-reveal="zoom"
              >
                <p className="welcome__label script">{t.welcomeTitle}</p>
              </div>

              <div className="media-card" data-reveal style={{ '--reveal-delay': '80ms' }}>
                <video
                  ref={videoRef}
                  className="media-card__video"
                  src={wedding.video}
                  poster={wedding.welcomePhoto}
                  playsInline
                  loop
                  muted={!musicOn}
                  autoPlay
                />
                <p className="media-card__caption">{t.meetingLuck}</p>
              </div>

              <p className="body-copy" data-reveal style={{ '--reveal-delay': '140ms' }}>
                {t.thankJoin}
              </p>
            </section>

            <section className="section parents">
              <div className="parents__grid">
                <div className="parents__side" data-reveal="left">
                  <p className="parents__label">{t.parentsOfGroom}</p>
                  <p className="parents__names">
                    {wedding.parents.groom[lang]
                      .split(/\s*(?:&|និង)\s*/)
                      .map((name) => (
                        <span key={name} className="parents__name-line">
                          {name}
                        </span>
                      ))}
                  </p>
                </div>
                <div
                  className="parents__side"
                  data-reveal="right"
                  style={{ '--reveal-delay': '100ms' }}
                >
                  <p className="parents__label">{t.parentsOfBride}</p>
                  <p className="parents__names">
                    {wedding.parents.bride[lang]
                      .split(/\s*(?:&|និង)\s*/)
                      .map((name) => (
                        <span key={name} className="parents__name-line">
                          {name}
                        </span>
                      ))}
                  </p>
                </div>
              </div>
              <p
                className="script parents__couple names--stack"
                data-reveal
                style={{ '--reveal-delay': '120ms' }}
              >
                <span>{groomDisplay}</span>
                <span className="names__amp">&</span>
                <span>{brideDisplay}</span>
              </p>
            </section>

            <section className="section couple">
              <p className="section__kicker" data-reveal>
                {t.introducing}
              </p>

              <article className="person person--bride" data-reveal="left">
                <div className="person__photo-wrap">
                  <img src={wedding.bride.photo} alt={wedding.bride.fullName} />
                </div>
                <div className="person__meta">
                  <p className="person__role">{t.bride}</p>
                  <h2 className="person__name script">
                    {lang === 'km'
                      ? wedding.bride.fullNameKm
                      : wedding.bride.fullName}
                  </h2>
                  <p className="person__quote">{wedding.bride.quote[lang]}</p>
                  {wedding.bride.phone ? (
                    <a className="ghost-btn" href={`tel:${wedding.bride.phone}`}>
                      ☎ {t.bride}
                    </a>
                  ) : null}
                </div>
              </article>

              <article
                className="person person--groom"
                data-reveal="right"
                style={{ '--reveal-delay': '100ms' }}
              >
                <div className="person__meta">
                  <p className="person__role">{t.groom}</p>
                  <h2 className="person__name script">
                    {lang === 'km'
                      ? wedding.groom.fullNameKm
                      : wedding.groom.fullName}
                  </h2>
                  <p className="person__quote">{wedding.groom.quote[lang]}</p>
                  {wedding.groom.phone ? (
                    <a className="ghost-btn" href={`tel:${wedding.groom.phone}`}>
                      ☎ {t.groom}
                    </a>
                  ) : null}
                </div>
                <div className="person__photo-wrap">
                  <img src={wedding.groom.photo} alt={wedding.groom.fullName} />
                </div>
              </article>
            </section>

            <section className="section story">
              <h2 className="section__title script" data-reveal>
                {t.ourStory}
              </h2>
              <p className="body-copy" data-reveal style={{ '--reveal-delay': '80ms' }}>
                {t.storyIntro}
              </p>

              <div className="story-stage" data-reveal="zoom">
                <img
                  key={wedding.story[activeStory].image}
                  src={wedding.story[activeStory].image}
                  alt=""
                  className="story-stage__img"
                />
              </div>

              <div className="story-dots" data-reveal>
                {wedding.story.map((s, i) => (
                  <button
                    key={s.year}
                    type="button"
                    className={i === activeStory ? 'is-active' : ''}
                    onClick={() => setActiveStory(i)}
                    aria-label={s.year}
                  />
                ))}
              </div>

              <h3 className="story-title" data-reveal>
                {wedding.story[activeStory].title[lang]}
              </h3>
              <p className="body-copy" data-reveal>
                {wedding.story[activeStory].text[lang]}
              </p>

              <div className="love-block" data-reveal>
                <p className="script love-block__lead">{t.loveLine1}</p>
                <p>{t.loveLine2}</p>
                <p>{t.loveLine3}</p>
                <p className="love-block__end">{t.loveLine4}</p>
              </div>
            </section>

            <section className="section date-sec">
              <h2 className="section__title script" data-reveal>
                {t.weddingDate}
              </h2>
              <p className="date-sec__when" data-reveal>
                {dateTimeLabel}
              </p>
              <p className="date-sec__label" data-reveal>
                {t.ourWeddingDay}
              </p>
              <p className="script date-sec__ring" data-reveal>
                {t.weAreMarried} 💍
              </p>
              <p className="body-copy" data-reveal>
                {t.thankSpecial}
              </p>

              <div className="countdown" data-reveal>
                {[
                  [countdown.days, t.days],
                  [countdown.hours, t.hours],
                  [countdown.mins, t.mins],
                  [countdown.secs, t.secs],
                ].map(([value, label]) => (
                  <div key={label} className="countdown__cell">
                    <span className="countdown__num">{pad(value)}</span>
                    <span className="countdown__label">{label}</span>
                  </div>
                ))}
              </div>
              <p className="date-sec__next" data-reveal>
                {t.nextChapter}
              </p>

              <div className="location" data-reveal>
                <p className="location__label">{t.location}</p>
                <div className="location__map">
                  <iframe
                    title={wedding.venue.name[lang]}
                    src={wedding.venue.mapsEmbedUrl}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>
                <p className="location__name">{wedding.venue.name[lang]}</p>
                <p className="location__address">{wedding.venue[lang]}</p>
                <a
                  className="ghost-btn"
                  href={wedding.venue.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  {t.openMaps} ↗
                </a>
                <p className="body-copy location__note">{t.lifeDays}</p>
              </div>
            </section>

            <section className="section schedule">
              <h2 className="section__title script" data-reveal>
                {t.schedule}
              </h2>
              <p className="body-copy" data-reveal>
                {t.scheduleIntro} ✨
              </p>
              {wedding.scheduleDays.map((day) => (
                <div key={day.day.en} className="schedule-day">
                  <h3 className="schedule-day__title" data-reveal>
                    {day.day[lang]}
                  </h3>
                  <ol className="timeline">
                    {day.items.map((item, index) => (
                      <li
                        key={`${day.day.en}-${item.time.en}`}
                        data-reveal
                        style={{ '--reveal-delay': `${index * 55}ms` }}
                      >
                        <span className="timeline__icon" aria-hidden="true">
                          <ScheduleIcon name={item.icon} />
                        </span>
                        <div className="timeline__body">
                          <span className="timeline__time">{item.time[lang]}</span>
                          <span className="timeline__title">{item.title[lang]}</span>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </section>

            <section className="section gallery">
              <div className="gallery__grid">
                {wedding.gallery.map((src, index) => (
                  <img
                    key={src}
                    src={src}
                    alt=""
                    loading="lazy"
                    data-reveal="zoom"
                    style={{ '--reveal-delay': `${(index % 4) * 70}ms` }}
                  />
                ))}
              </div>
            </section>

            <section className="section thanks">
              <h2 className="section__title" data-reveal>
                {t.thanksTitle}
              </h2>
              <p className="body-copy" data-reveal>
                {t.thanksBody}
              </p>
              <p className="thanks__sign" data-reveal>
                {t.withLove}
              </p>
              <p className="script thanks__names names--stack" data-reveal>
                <span>{groomDisplay}</span>
                <span className="names__amp">&</span>
                <span>
                  {brideDisplay} 💙
                </span>
              </p>
            </section>

            <section className="section share" data-reveal>
              <p className="share__label">{t.share} ✨</p>
              <div className="btn-row">
                <button type="button" className="ghost-btn" onClick={shareTelegram}>
                  📨 {t.telegram}
                </button>
                <button type="button" className="ghost-btn" onClick={copyLink}>
                  🔗 {copied ? t.copied : t.copyLink}
                </button>
              </div>
              <footer className="footer">
                {wedding.groom.shortName} & {wedding.bride.shortName}
              </footer>
            </section>
          </main>
        )}
      </div>
    </div>
  )
}
