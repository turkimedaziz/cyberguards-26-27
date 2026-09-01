import Header from './components/Header';
import Hero from './components/Hero';
import Axes from './components/Axes';
import Values from './components/Values';
import Activities from './components/Activities';
import Gallery from './components/Gallery';
import Board from './components/Board';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const teamMembers = [
    { name: 'Anis Boubakar', role: 'President', image: '/Anis Boubaker.png' },
    { name: 'Thamer Laabidi', role: 'General Secretary', image: '/Thamer Laabidi.jpg' },
    { name: 'Amal Bouden', role: 'Treasurer', image: '/Amal Bouden.png' },
    { name: 'Anas Jmili', role: 'HR Manager', image: '/Anas Jmili.jpg' },
    { name: 'Amir Abdaoui', role: 'Trainings & Events Manager', image: '/Amir Abdaoui.png' },
    { name: 'Chiheb Eddine Chiboub', role: 'Media Manager', image: '/Chiheb Eddine Chiboub.jpg' },
  ];

  return (
    <div className="min-h-screen text-white bg-cyber-dark">
      <Header />
      <Hero />
      <Axes />
      <Values />
      <Activities />
      <Gallery />
      <Board teamMembers={teamMembers} />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
