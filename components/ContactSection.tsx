'use client'

import { useState } from 'react'

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', enquiry: '', message: '' })

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // TODO: submit logic
  }

  return (
    <section className="contactSection">
      <div className="inner">
        {/* LEFT: Form */}
        <div className="leftCol">
          <div className="headingBlock">
            <h1 className="heading">
              Get in <span className="headingGold">Touch</span>
            </h1>
            <p className="subtitle">
              Whether you are looking to sponsor, register your team, or simply learn more, we are
              ready to talk.
            </p>
          </div>

          <form className="form" onSubmit={handleSubmit}>
            <div className="row">
              <input
                className="field"
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
              />
              <input
                className="field"
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
              />
              <select
                className="field select"
                name="enquiry"
                value={form.enquiry}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Enquiry Type
                </option>
                <option value="sponsorship">Sponsorship</option>
                <option value="registration">Team Registration</option>
                <option value="media">Media</option>
                <option value="general">General</option>
              </select>
            </div>

            <textarea
              className="field textarea"
              name="message"
              placeholder="Message"
              value={form.message}
              onChange={handleChange}
            />

            <button type="submit" className="submitBtn" aria-label="Send Enquiry">
              <span className="submitLabel">Send Enquiry</span>
            </button>
          </form>
        </div>

        {/* RIGHT: Contact Info */}
        <div className="rightCol">
          {/* Direct Contact */}
          <div className="infoBlock">
            <div className="accentBar" />
            <div className="infoContent">
              <h3 className="infoTitle">DIRECT CONTACT</h3>
              <div className="contactItems">
                <div className="contactItem">
                  <div className="iconBox">
                    <img src="/images/icon-phone.svg" alt="" width={24} height={24} />
                  </div>
                  <div className="contactMeta">
                    <p className="contactLabel">CALL US</p>
                    <p className="contactValue">+(555)-89473623</p>
                  </div>
                </div>

                <div className="contactItem">
                  <div className="iconBox">
                    <img src="/images/icon-email.svg" alt="" width={24} height={24} />
                  </div>
                  <div className="contactMeta">
                    <p className="contactLabel">EMAIL US</p>
                    <p className="contactValue">info@goldcup.ca</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Follow the Legacy */}
          <div className="infoBlock">
            <div className="accentBar accentBarShort" />
            <div className="infoContent">
              <h3 className="infoTitle">FOLLOW THE LEGACY</h3>
              <div className="socialRow">
                <a href="#" className="socialBtn" aria-label="Instagram">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <rect
                      x="2"
                      y="2"
                      width="20"
                      height="20"
                      rx="5"
                      stroke="white"
                      strokeWidth="1.8"
                      strokeOpacity=".85"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="4.5"
                      stroke="white"
                      strokeWidth="1.8"
                      strokeOpacity=".85"
                    />
                    <circle cx="17.5" cy="6.5" r="1" fill="white" fillOpacity=".85" />
                  </svg>
                </a>

                <a href="#" className="socialBtn" aria-label="Facebook">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"
                      stroke="white"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeOpacity=".85"
                    />
                  </svg>
                </a>

                <a href="#" className="socialBtn" aria-label="Twitter / X">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M4 4l16 16M20 4L4 20"
                      stroke="white"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeOpacity=".85"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .contactSection {
          background: var(--bg);
          padding: 150px 0 80px;
        }

        .inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 60px;
          display: flex;
          gap: 50px;
          align-items: flex-start;
        }

        /* LEFT */
        .leftCol {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        .headingBlock {
          display: flex;
          flex-direction: column;
          gap: 10px;
          max-width: 493px;
        }

        .heading {
          display: inline-block;
          font-family: var(--font-coluna), 'Barlow Condensed', sans-serif;
          font-size: 90px;
          font-style: normal;
          font-weight: 700;
          line-height: 1;
          letter-spacing: -1.8px;
          margin: 0;
          background: linear-gradient(182.5deg, #fffbf2 53.3%, #999691 135%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
        }

        .headingGold {
          background: linear-gradient(180deg, #8d5c18 20.6%, #f8e5ac 39.4%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .subtitle {
          font-family: var(--font-manrope), sans-serif;
          font-size: 18px;
          color: #fffbf2;
          line-height: 1.5;
          letter-spacing: -0.18px;
          margin: 0;
        }

        /* FORM */
        .form {
          display: flex;
          flex-direction: column;
          gap: 8px;
          width: 100%;
        }

        .row {
          display: flex;
          gap: 8px;
        }

        .field {
          flex: 1;
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 5px;
          padding: 15px 17px;
          font-family: var(--font-manrope), sans-serif;
          font-size: 16px;
          color: #fffbf2;
          line-height: 1.5;
          letter-spacing: -0.16px;
          outline: none;
          transition: border-color 0.2s;
        }

        .field::placeholder {
          color: rgba(255, 251, 242, 0.5);
        }

        .field:focus {
          border-color: rgba(201, 168, 76, 0.6);
        }

        .select {
          appearance: none;
          -webkit-appearance: none;
          cursor: pointer;
          background-image: url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='rgba(255,251,242,0.5)' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 16px center;
          padding-right: 36px;
        }

        .select option {
          background: #111;
          color: #fffbf2;
        }

        .textarea {
          flex: none;
          height: 96px;
          resize: none;
          width: 100%;
          box-sizing: border-box;
          align-items: flex-start;
        }

        /* SUBMIT BUTTON */
        .submitBtn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          align-self: flex-start;
          width: 145px;
          height: 44px;
          border: none;
          padding: 0;
          cursor: pointer;
          background-image: url('/images/send-enquiry-btn.svg');
          background-repeat: no-repeat;
          background-position: center;
          background-size: 100% 100%;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .submitBtn:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 24px rgba(0, 0, 0, 0.28);
        }

        .submitLabel {
          font-family: var(--font-manrope), sans-serif;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: -0.14px;
          color: #000;
          white-space: nowrap;
        }

        /* RIGHT */
        .rightCol {
          width: 261px;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          gap: 36px;
        }

        .infoBlock {
          display: flex;
          gap: 20px;
          align-items: flex-start;
        }

        .accentBar {
          width: 5px;
          height: 188px;
          flex-shrink: 0;
          border-radius: 1px;
          background: linear-gradient(200.66deg, #8d5c18 20.6%, #f8e5ac 99.5%);
        }

        .accentBarShort {
          height: 102px;
        }

        .infoContent {
          display: flex;
          flex-direction: column;
          gap: 14px;
          flex: 1;
        }

        .infoTitle {
          display: inline-block;
          font-family: var(--font-coluna), 'Barlow Condensed', sans-serif;
          font-size: 36px;
          font-style: normal;
          font-weight: 700;
          line-height: 1;
          background: linear-gradient(180.09deg, #8d5c18 20.65%, #f8e5ac 99.5%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
          margin: 0;
        }

        .contactItems {
          display: flex;
          flex-direction: column;
          gap: 25px;
        }

        .contactItem {
          display: flex;
          gap: 14px;
          align-items: center;
        }

        .iconBox {
          width: 54px;
          height: 54px;
          flex-shrink: 0;
          background: rgba(255, 255, 255, 0.14);
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .contactMeta {
          display: flex;
          flex-direction: column;
          gap: 12px;
          min-width: 0;
        }

        .contactLabel {
          font-family: var(--font-manrope), sans-serif;
          font-size: 12px;
          letter-spacing: 2.4px;
          background: linear-gradient(180.03deg, #8d5c18 20.6%, #f8e5ac 99.5%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
          margin: 0;
          white-space: nowrap;
        }

        .contactValue {
          font-family: var(--font-coluna), 'Barlow Condensed', sans-serif;
          font-size: 32px;
          font-style: normal;
          font-weight: 700;
          color: white;
          line-height: 1;
          letter-spacing: -0.4px;
          margin: 0;
          white-space: nowrap;
        }

        /* SOCIAL */
        .socialRow {
          display: flex;
          gap: 17px;
          align-items: center;
        }

        .socialBtn {
          width: 54px;
          height: 54px;
          background: rgba(255, 255, 255, 0.14);
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          transition: background 0.2s;
        }

        .socialBtn:hover {
          background: rgba(255, 255, 255, 0.22);
        }

        @media (max-width: 639px) {
          .contactSection {
            padding: 100px 0 48px;
          }

          .inner {
            flex-direction: column;
            padding: 0 18px;
            gap: 40px;
          }

          .headingBlock {
            max-width: 100%;
          }

          .heading {
            font-size: 52px;
            letter-spacing: -0.8px;
            line-height: 1;
          }

          .subtitle {
            font-size: 15px;
            letter-spacing: -0.09px;
          }

          .row {
            flex-direction: column;
          }

          .textarea {
            height: 100px;
          }

          .rightCol {
            width: 100%;
            flex-direction: column;
            gap: 28px;
          }

          .accentBar {
            height: 120px;
          }

          .accentBarShort {
            height: 80px;
          }

          .infoTitle {
            font-size: 22px;
            letter-spacing: -0.25px;
          }

          .contactValue {
            white-space: normal;
            font-size: 22px;
            letter-spacing: -0.1px;
          }
        }

        @media (min-width: 640px) and (max-width: 900px) {
          .contactSection {
            padding: 120px 0 60px;
          }

          .inner {
            flex-direction: column;
            padding: 0 40px;
            gap: 48px;
          }

          .headingBlock {
            max-width: 100%;
          }

          .heading {
            font-size: 64px;
            letter-spacing: -1.0px;
            line-height: 0.92;
          }

          .row {
            flex-wrap: wrap;
          }

          .field {
            min-width: 200px;
          }

          .rightCol {
            width: 100%;
            flex-direction: row;
            flex-wrap: wrap;
            gap: 24px;
          }

          .infoBlock {
            flex: 1;
            min-width: 220px;
          }

          .accentBar {
            height: 140px;
          }

          .accentBarShort {
            height: 100px;
          }

          .infoTitle {
            font-size: 28px;
            letter-spacing: -0.3px;
          }

          .contactValue {
            white-space: normal;
            font-size: 26px;
            letter-spacing: -0.2px;
          }
        }
      `}</style>
    </section>
  )
}