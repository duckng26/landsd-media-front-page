import Navbar from "../ui/news/navbar/navbar"
import Sidebar from "../ui/news/sidebar/sidebar"
import styles from "../ui/news/news.module.css"
import Footer from "../ui/news/footer/footer"

const Layout = ({children}) => {
  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <Sidebar/>
      </div>
      <div className={styles.content}>
        <Navbar/>
        {children}
        <Footer/>
      </div>
    </div>
  )
}

export default Layout