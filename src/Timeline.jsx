import { useState } from 'react'
import './Timeline.css'

function Timeline() {
  const [expanded, setExpanded] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState({})

  const milestones = [
    {
      id: 1,
      date: '21 de Dezembro de 2025',
      title: '💕 "Nosso Primeiro Encontro!"',
      description: 'O dia que tudo começou. Aquele momento especial quando nossos olhos se encontraram e soube que algo mágico estava começando.',
      images: []
    },
    {
      id: 2,
      date: '11 de Janeiro de 2026',
      title: '💕 Nossa primeira foto juntos!!',
      description: 'Um beijo que selou tudo. Naquele momento, soube que você era diferente, era especial.',
      images: ['public/primeirafoto.jpeg']
    },
    {
      id: 3,
      date: '24 de Janeiro de 2026',
      title: '💍 O dia em que começamos a namorar!!',
      description: 'Aquele dia em que decidimos dar um passo adiante. Foi o início de uma jornada incrível, cheia de amor e descobertas.',
      images: []
    },
    {
      id: 4,
      date: '25 de Janeiro de 2026',
      title: '💋 Nosso primeiro beijo!',
      description: 'Esse momento foi tão mágico que parecia que o tempo parou. Foi o início de uma história de amor que só cresce a cada dia.',
      images: ['public/primeirobeijo.jpeg']
    },
    {
      id: 5,
      date: '24 de Fevereiro de 2026',
      title: '🎉 Nosso primeiro mês de namoro!',
      description: 'Celebramos nosso primeiro mês juntos, e cada dia tem sido uma aventura maravilhosa. Mal posso esperar para ver o que o futuro nos reserva!',
      images: []
    },
    {
      id: 6,
      date: '27 de Fevereiro de 2026',
      title: '🎂 Seu Aniversário',
      description: 'Celebrar seu aniversário foi tão especial. Ver seu sorriso e compartilhar esse dia com você foi um dos momentos mais felizes da minha vida.',
      images: ['public/aniversario.jpeg']
    }
  ]

  const handlePrevImage = (e, milestoneId) => {
    e.stopPropagation()
    setCurrentImageIndex(prev => ({
      ...prev,
      [milestoneId]: (prev[milestoneId] || 0) - 1
    }))
  }

  const handleNextImage = (e, milestoneId, totalImages) => {
    e.stopPropagation()
    setCurrentImageIndex(prev => ({
      ...prev,
      [milestoneId]: ((prev[milestoneId] || 0) + 1) % totalImages
    }))
  }

  return (
    <div className="timeline-container">
      <h1 className="timeline-title">Nossa História ❤️</h1>
      <p className="timeline-subtitle">Clique em qualquer marco para ver a história completa</p>
      
      <div className="timeline">
        {milestones.map((milestone, index) => (
          <div key={milestone.id} className="timeline-item">
            <div className="timeline-marker">
              <div className="marker-dot"></div>
            </div>
            
            <div className={`timeline-content ${index % 2 === 0 ? 'left' : 'right'}`}>
              <div
                className={`timeline-card ${expanded === milestone.id ? 'expanded' : ''}`}
                onClick={() => setExpanded(expanded === milestone.id ? null : milestone.id)}
              >
                {milestone.images && milestone.images.length > 0 && expanded === milestone.id && (
                  <div className="image-gallery">
                    <img 
                      src={milestone.images[currentImageIndex[milestone.id] || 0]} 
                      alt={`Foto ${(currentImageIndex[milestone.id] || 0) + 1}`}
                      className="gallery-image"
                    />
                    {milestone.images.length > 1 && (
                      <>
                        <button 
                          className="gallery-btn prev-btn"
                          onClick={(e) => handlePrevImage(e, milestone.id)}
                          aria-label="Foto anterior"
                        >
                          ‹
                        </button>
                        <button 
                          className="gallery-btn next-btn"
                          onClick={(e) => handleNextImage(e, milestone.id, milestone.images.length)}
                          aria-label="Próxima foto"
                        >
                          ›
                        </button>
                        <div className="image-counter">
                          {(currentImageIndex[milestone.id] || 0) + 1} / {milestone.images.length}
                        </div>
                      </>
                    )}
                  </div>
                )}
                <div className="card-date">{milestone.date}</div>
                <div className="card-title">{milestone.title}</div>
                {expanded === milestone.id && (
                  <div className="card-description">{milestone.description}</div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Timeline
