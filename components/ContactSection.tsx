'use client'

import { useEffect, useRef, useState } from 'react'

export default function ContactSection() {
  const heroRef = useRef<HTMLDivElement | null>(null)
  const formRef = useRef<HTMLDivElement | null>(null)
  const sidebarRef = useRef<HTMLDivElement | null>(null)

  const [heroVisible, setHeroVisible] = useState(false)
  const [formVisible, setFormVisible] = useState(false)
  const [sidebarVisible, setSidebarVisible] = useState(false)

  useEffect(() => {
    const entries = [
      { ref: heroRef, setter: setHeroVisible },
      { ref: formRef, setter: setFormVisible },
      { ref: sidebarRef, setter: setSidebarVisible },
    ]
    const observers = entries.map(({ ref, setter }) => {
      const node = ref.current
      if (!node) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) { setter(true); obs.disconnect() } },
        { threshold: 0.1 }
      )
      obs.observe(node)
      return obs
    })
    return () => observers.forEach(obs => obs?.disconnect())
  }, [])

  return (
    <section className="contactSection">
      <div className="inner">

        {/* ── Left Column ── */}
        <div className="leftCol">

          {/* Heading */}
          <div ref={heroRef} className={`headingBlock ${heroVisible ? 'visible' : ''}`}>
            <h1 className="heading">
              <span className="headingWhite">Get in </span>
              <span className="headingGold">Touch</span>
            </h1>
            <p className="subheading">
              Whether you are looking to sponsor, register your team, or simply learn more, we are ready to talk.
            </p>
          </div>

          {/* Form */}
          <div ref={formRef} className={`formBlock ${formVisible ? 'visible' : ''}`}>
            <div className="inputRow">
              <input
                className="input"
                type="text"
                placeholder="Full Name"
                autoComplete="name"
              />
              <input
                className="input"
                type="email"
                placeholder="Email Address"
                autoComplete="email"
              />
              <input
                className="input"
                type="text"
                placeholder="Enquiry Type"
              />
            </div>
            <textarea
              className="textarea"
              placeholder="Message"
              rows={4}
            />
            <div className="btnWrap">
              <button className="sendBtn" type="submit">
                <span className="sendBtnLabel">Send Enquiry</span>
              </button>
            </div>
          </div>
        </div>

        {/* ── Right Column (Sidebar) ── */}
        <div ref={sidebarRef} className={`rightCol ${sidebarVisible ? 'visible' : ''}`}>

          {/* Direct Contact */}
          <div className="sidebarBlock">
            <div className="sideBar" />
            <div className="sidebarContent">
              <p className="sidebarTitle">Direct Contact</p>
              <div className="contactRows">
                <div className="contactRow">
                  <div className="iconTile">
                    <img src="/images/icon-phone.svg" alt="Phone" width={24} height={24} />
                  </div>
                  <div className="contactText">
                    <span className="contactLabel">Call Us</span>
                    <span className="contactValue">+(91)-89473623</span>
                  </div>
                </div>
                <div className="contactRow">
                  <div className="iconTile">
                    <img src="/images/icon-email.svg" alt="Email" width={24} height={24} />
                  </div>
                  <div className="contactText">
                    <span className="contactLabel">Email Us</span>
                    <span className="contactValue">goldcupteam@uttarakhandgoldcup.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Follow the Legacy */}
          <div className="sidebarBlock">
            <div className="sideBarShort" />
            <div className="sidebarContent">
              <p className="sidebarTitle">Follow the Legacy</p>
              <div className="socialRow">
                <div className="iconTile">
                  <img src="/images/icon-signal.svg" alt="Instagram" width={24} height={24} />
                </div>
                <div className="iconTile">
                  <img src="/images/icon-email.svg" alt="Twitter" width={24} height={24} />
                </div>
                <div className="iconTile">
                  <img src="/images/icon-phone.svg" alt="Facebook" width={24} height={24} />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <style jsx>{`
        .contactSection {
          background: #000;
          color: #fffbf2;
          padding: 150px 98px 80px;
        }

        .inner {
          display: flex;
          gap: 60px;
          align-items: flex-start;
          max-width: 1084px;
          margin: 0 auto;
        }

        /* ── Left ── */
        .leftCol {
          flex: 0 0 763px;
          max-width: 763px;
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        /* Heading block */
        .headingBlock {
          display: flex;
          flex-direction: column;
          gap: 10px;
          max-width: 493px;
          opacity: 0;
          transform: translateY(36px);
          transition: opacity 0.85s cubic-bezier(0.22, 1, 0.36, 1),
                      transform 0.85s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .headingBlock.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .heading {
          font-family: var(--font-coluna), 'Coluna', sans-serif;
          font-size: clamp(52px, 7vw, 90px);
          font-style: normal;
          font-weight: 700;
          line-height: 1;
          letter-spacing: -0.01em;
          margin: 0;
        }
        .headingWhite {
          background: linear-gradient(183deg, #fffbf2 53%, #999691 135%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .headingGold {
          background: linear-gradient(181deg, #8D5C18 -20.65%, #F8E5AC 39.43%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .subheading {
          font-family: var(--font-manrope), 'Manrope', sans-serif;
          font-size: 18px;
          font-weight: 400;
          line-height: 1.5;
          letter-spacing: -0.01em;
          color: #fffbf2;
          margin: 0;
        }

        /* Form block */
        .formBlock {
          display: flex;
          flex-direction: column;
          gap: 8px;
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.85s cubic-bezier(0.22, 1, 0.36, 1) 0.1s,
                      transform 0.85s cubic-bezier(0.22, 1, 0.36, 1) 0.1s;
        }
        .formBlock.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .inputRow {
          display: flex;
          gap: 8px;
        }
        .input {
          flex: 1 1 0;
          min-width: 0;
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 5px;
          padding: 15px 17px;
          font-family: var(--font-manrope), 'Manrope', sans-serif;
          font-size: 16px;
          font-weight: 400;
          line-height: 1.5;
          letter-spacing: -0.01em;
          color: #fffbf2;
          outline: none;
          transition: border-color 0.2s ease;
        }
        .input::placeholder {
          color: rgba(255, 251, 242, 0.5);
        }
        .input:focus {
          border-color: rgba(162, 120, 54, 0.7);
        }
        .textarea {
          width: 100%;
          box-sizing: border-box;
          height: 96px;
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 5px;
          padding: 15px 17px;
          font-family: var(--font-manrope), 'Manrope', sans-serif;
          font-size: 16px;
          font-weight: 400;
          line-height: 1.5;
          letter-spacing: -0.01em;
          color: #fffbf2;
          resize: none;
          outline: none;
          transition: border-color 0.2s ease;
        }
        .textarea::placeholder {
          color: rgba(255, 251, 242, 0.5);
        }
        .textarea:focus {
          border-color: rgba(162, 120, 54, 0.7);
        }
        .btnWrap {
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.7s ease 0.25s, transform 0.7s ease 0.25s;
        }
        .formBlock.visible .btnWrap {
          opacity: 1;
          transform: translateY(0);
        }
        .sendBtn {
          position: relative;
          width: 145px;
          height: 44px;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 0;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.25s ease, filter 0.25s ease;
        }
        .sendBtn::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url('/images/send-enquiry-btn.svg');
          background-repeat: no-repeat;
          background-size: 100% 100%;
          background-position: center;
          z-index: 0;
        }
        .sendBtn:hover {
          transform: translateY(-3px);
          filter: brightness(1.08);
        }
        .sendBtnLabel {
          position: relative;
          z-index: 1;
          font-family: var(--font-manrope), 'Manrope', sans-serif;
          font-size: 16px;
          font-weight: 700;
          letter-spacing: -0.01em;
          color: #000;
          white-space: nowrap;
        }

        /* ── Right / Sidebar ── */
        .rightCol {
          flex: 0 0 261px;
          max-width: 261px;
          display: flex;
          flex-direction: column;
          gap: 36px;
          opacity: 0;
          transform: translateX(32px);
          transition: opacity 0.85s cubic-bezier(0.22, 1, 0.36, 1) 0.2s,
                      transform 0.85s cubic-bezier(0.22, 1, 0.36, 1) 0.2s;
        }
        .rightCol.visible {
          opacity: 1;
          transform: translateX(0);
        }
        .sidebarBlock {
          display: flex;
          gap: 20px;
          align-items: flex-start;
        }
        .sideBar {
          flex-shrink: 0;
          width: 5px;
          height: 188px;
          border-radius: 1px;
          background: linear-gradient(201deg, #8d5c18 20%, #f8e5ac 99%);
        }
        .sideBarShort {
          flex-shrink: 0;
          width: 5px;
          height: 102px;
          border-radius: 1px;
          background: linear-gradient(192deg, #8d5c18 20%, #f8e5ac 99%);
        }
        .sidebarContent {
          display: flex;
          flex-direction: column;
          gap: 14px;
          flex: 1;
          min-width: 300px;
        }
        .sidebarTitle {
          font-family: var(--font-coluna), 'Coluna', sans-serif;
          font-size: 36px;
          font-style: normal;
          font-weight: 700;
          line-height: 1;
          letter-spacing: -0.01em;
          margin: 0;
          text-transform: uppercase;
          background: linear-gradient(181deg, #8D5C18 -20.65%, #F8E5AC 99.5%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .contactRows {
          display: flex;
          flex-direction: column;
          gap: 25px;
        }
        .contactRow {
          display: flex;
          gap: 14px;
          align-items: center;
        }
        .iconTile {
          flex-shrink: 0;
          width: 64px;
          height: 54px;
          background: rgba(255, 255, 255, 0.14);
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s ease;
          cursor: pointer;
        }
        .iconTile:hover {
          background: rgba(255, 255, 255, 0.22);
        }
        .iconTile img {
          width: 24px;
          height: 24px;
          object-fit: contain;
          flex-shrink: 0;
        }
        .contactText {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .contactLabel {
          font-family: var(--font-manrope), 'Manrope', sans-serif;
          font-size: 12px;
          font-weight: 400;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          background: linear-gradient(181deg, #8D5C18 -20.65%, #F8E5AC 99.5%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .contactValue {
          font-family: var(--font-coluna), 'Coluna', sans-serif;
          font-size: 28px;
          font-style: normal;
          font-weight: 700;
          line-height: 1;
          color: #fff;
          word-break: break-all;
        }
        .socialRow {
          display: flex;
          gap: 17px;
          align-items: center;
          flex-wrap: wrap;
        }

        /* ── Reduced Motion ── */
        @media (prefers-reduced-motion: reduce) {
          .headingBlock,
          .formBlock,
          .btnWrap,
          .rightCol {
            opacity: 1;
            transform: none;
            transition: none;
          }
        }

        /* ── Mobile (≤ 639px) ── */
        @media (max-width: 639px) {
          .contactSection {
            padding: 80px 16px 60px;
          }
          .inner {
            flex-direction: column;
            gap: 48px;
            max-width: 100%;
          }
          .leftCol {
            flex: none;
            max-width: 100%;
          }
          .heading {
            font-size: clamp(40px, 12vw, 60px);
          }
          .subheading {
            font-size: 15px;
          }
          .inputRow {
            flex-direction: column;
          }
          .rightCol {
            flex: none;
            max-width: 100%;
          }
          .sidebarTitle {
            font-size: 26px;
          }
          .contactValue {
            font-size: 22px;
          }
        }

        /* ── Tablet (640–1024px) ── */
        @media (min-width: 640px) and (max-width: 1024px) {
          .contactSection {
            padding: 80px 40px 60px;
          }
          .inner {
            flex-direction: column;
            gap: 48px;
            max-width: 100%;
          }
          .leftCol {
            flex: none;
            max-width: 100%;
          }
          .heading {
            font-size: clamp(52px, 8vw, 72px);
          }
          .rightCol {
            flex: none;
            max-width: 100%;
            flex-direction: row;
            gap: 40px;
          }
          .sidebarBlock {
            flex: 1;
          }
        }
      `}</style>
    </section>
  )
}
