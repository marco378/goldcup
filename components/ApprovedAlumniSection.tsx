import { getApprovedAlumniSubmissions, type AlumniSubmission } from '@/lib/alumniSubmissions'
import styles from './ApprovedAlumniSection.module.css'

export default async function ApprovedAlumniSection() {
  let alumni: AlumniSubmission[] = []

  try {
    alumni = await getApprovedAlumniSubmissions()
  } catch (error) {
    console.error(error)
  }

  if (alumni.length === 0) {
    return null
  }

  return (
    <section className={styles.approvedAlumni}>
      <div className={styles.sectionHead}>
      {/*  <p className={styles.eyebrow}>Approved Alumni Stories</p>
        <h2 className={styles.title}>Submitted by the Players</h2>
        <p className={styles.intro}>
          Verified Gold Cup alumni profiles and media submitted through the official registration form.
        </p>*/}
      </div>

      <div className={styles.alumniGrid}>
        {alumni.map(player => (
          <article key={player.id} className={styles.playerCard}>
            <div className={styles.videoFrame}>
              <iframe
                src={player.videos[0]}
                title={`${player.name} submitted video`}
                allow="autoplay; encrypted-media"
                allowFullScreen
                loading="lazy"
              />
            </div>

            <div className={styles.cardBody}>
              <div className={styles.metaRow}>
                {player.year && <span>{player.year}</span>}
                {player.role && <span>{player.role}</span>}
              </div>
              <h3 className={styles.playerName}>{player.name}</h3>
              {player.bio && <p className={styles.bio}>{player.bio}</p>}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
