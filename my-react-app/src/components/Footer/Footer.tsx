import styles from './Footer.module.scss'
import {FaGithub, FaLinkedin, FaTelegram} from "react-icons/fa"

const Footer = () => {
  return (
    <div className={styles.footer__container}>

      <div className={styles.footer__icons}>
        <a className={styles.footer__icon} href="https://t.me/AlexdeveloperJSS" target="_blank"><FaTelegram/></a>
        <a className={styles.footer__icon} href="https://linkedin.com/in/alex-developerfs" target="_blank"><FaLinkedin/></a>
        <a className={styles.footer__icon} href="https://github.com/Alex-DeveloperFS" target="_blank"><FaGithub/></a>
      </div>

      <p className={styles.footer__text}>© 2024 AlexDeveloperJS</p>
    </div>
  )
}

export default Footer