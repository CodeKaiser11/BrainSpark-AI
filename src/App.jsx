import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Stats from './components/Stats'
import HowItWorks from './components/HowItWorks'
import CTA from './components/CTA'
import Footer from './components/Footer'

function App() {
  return (
    <div style={styles.shell}>

      {/* Left — Sidebar (fixed) */}
      <Sidebar />

      {/* Right — Main content */}
      <main style={styles.main}>
        <Navbar />
        <Hero />
        <Stats />
        <HowItWorks />
        <CTA />
        <Footer />
      </main>

    </div>
  )
}

const styles = {
  shell: {
    display: "flex",
    minHeight: "100vh",
    background: "#faf7f2",
    fontFamily: "'Bricolage Grotesque', sans-serif",
  },
  main: {
    marginLeft: "256px",
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
}

export default App