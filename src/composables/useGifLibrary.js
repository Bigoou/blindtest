import { ref } from 'vue'

// État global partagé entre tous les composants
const currentGif = ref(null)
const currentCatchphrase = ref(null)
const isGifVisible = ref(false)
const recentlyUsedGifs = ref([])
let currentTimeout = null

// Audio pour les GIFs
let audioInstance = null

// Bibliothèque de sons aléatoires (fichiers locaux)
const SOUND_LIBRARY = [
  '/src/assets/sounds/Effet sonore fart.mp3',
  '/src/assets/sounds/Vine Boom Sound.mp3',
  '/src/assets/sounds/Frank LeBoeuf effet sonore.mp3',
  '/src/assets/sounds/Son de révélation de rôle Among Us.mp3',
  '/src/assets/sounds/Tonton H effet sonore.mp3',
  '/src/assets/sounds/Anime Ahh Sound Effect.mp3',
  '/src/assets/sounds/Ringtone Italian Brainrot.mp3',
  '/src/assets/sounds/Arabe effet sonore.mp3',
  '/src/assets/sounds/Goofy Car Horn Sound Effect.mp3',
  '/src/assets/sounds/Oui je suis raciste.mp3',
  "/src/assets/sounds/T'es en caleçon ta la barre.mp3",
  '/src/assets/sounds/TK78 effet sonore.mp3',
  '/src/assets/sounds/excuse-moi-taurais-pas-un-zob-dans-lcul.mp3'
]

// Fonction pour obtenir un son aléatoire
function getRandomSound() {
  return SOUND_LIBRARY[Math.floor(Math.random() * SOUND_LIBRARY.length)]
}

export function useGifLibrary() {

  // Bibliothèque de GIFs avec leurs catchphrases personnalisées - une seule liste
  const gifLibrary = {
    all: [
      {
        url: 'https://i.makeagif.com/media/2-19-2023/7JB36c.gif',
        catchphrase: "Excuse-moi, ton père serait pas camionneur ? Parce que je veux bien être ton MAN pouet pouet 🚛"
      },
      {
        url: 'https://media1.tenor.com/m/h31MaizyP6UAAAAd/norman-thavaud-youtuber.gif',
        catchphrase: "Rendez-vous au rayon enfant 😼"
      },
      {
        url: 'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZHVzaXdvMXN5am4zZDRiMzI4aHZ3ZnhuZzV5aWd1bHIzd3pocGlyYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/fB938PbR1ulsA/giphy.gif',
        catchphrase: "POV: vous après avoir perdu ce point x’)"
      },
      {
        url: 'https://kinobody.info/wp-content/uploads/2024/06/Snapinsta.app_video_429172898_416787877963954_4462616224231494073_n-ezgif.com-crop.gif',
        catchphrase: "ok garmin tabasse l’équipe adverse 💃"
      },
      {
        url: 'https://i.giphy.com/FaovRTAVndmIXzdihz.webp',
        catchphrase: "Hardcore, comme deux pédés qui s’embrassent en plein Paris"
      },
      {
        url: 'https://media1.tenor.com/m/YtDDZoEnTnEAAAAd/antoine-droyer.gif',
        catchphrase: "Antoine baise avec Aubin 🫣"
      },
      {
        url: 'https://media1.tenor.com/m/E15X1t7OvSgAAAAd/cryyy.gif',
        catchphrase: "POV: T'as pris la fessée."
      },
      {
        url: 'https://media.tenor.com/ffJSGK5Q3r8AAAAj/johan-couche-kirby54.gif',
        catchphrase: "Ta mère renifle mon derrière, Thomas renifle celui de mon papa"
      },
      {
        url: 'https://media1.tenor.com/m/QOu2ZgdTVDkAAAAd/hump-day-happy-meeting.gif',
        catchphrase: "Coup de Zappy ! 🤠"
      },
      {
        url: 'https://media3.giphy.com/media/v1.Y2lkPTZjMDliOTUyNHU1YXZpaHYyNnE4YnJpc2U1ZnFrODJrY28waGdwaTA4emEyNXdoOSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/fQt8h2UH2cJ04mTwMN/giphy.webp',
        catchphrase: "Si je sors la AK ils feront tous caca"
      },
      {
        url: 'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExdXE3bjlucWFibDdzbXdjaXlpbHAxY2xmN2tzMHhhODZ5ZzE3ODlvOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/17RaL7HOgI1CE/giphy.gif',
        catchphrase: "T'as trop la rage ;)"
      },
      {
        url: 'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExd3Q3ejA2eXV4eG5rZ3BrcnVjdnEyeWM3aXlibXJyc3BkazF1bTMyZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/22CEvbj04nLLq/giphy.gif',
        catchphrase: "LA CHATTE LA CHAAAAATTE"
      },
      {
        url: 'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExOTVma2pka251NHZ6dWI4Z29sazE4djBqcDIzM2dtbHRzNGQ5dTE0ayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/vHcCevWbWkzwk/giphy.gif',
        catchphrase: "BLEHH BLABLOU *PROUT* GRRRRAA BLEEEEE"
      },
      {
        url: 'https://cdn.discordapp.com/attachments/767817082850377739/1410699955559071907/vHK-C-Wx28llvnpcqe-H3CHbjxywA347arliw31bBSM.png?ex=68b1f836&is=68b0a6b6&hm=3193458d0b049dc04b5658c924ecbc75fcc543e517f368d8aaaf849d0002e84c&',
        catchphrase: ""
      },
      // {
      //   url: 'https://media.giphy.com/media/3o7abAHdYvZdBNnGZq/giphy.gif',
      //   catchphrase: "INCROYABLE ! T'as la science infuse ! 🧬"
      // },
      // {
      //   url: 'https://media.giphy.com/media/l0HlMSVVw9zqmClLq/giphy.gif',
      //   catchphrase: "LÉGENDAIRE ! Tu rentre dans l'histoire ! 📚"
      // },
      // {
      //   url: 'https://media.giphy.com/media/3o7abBphHJngINCHio/giphy.gif',
      //   catchphrase: "DÉPASSEMENT ! Comme sur l'autoroute ! 🏎️"
      // },
      // {
      //   url: 'https://media.giphy.com/media/26BRzQS5HXcEWM7du/giphy.gif',
      //   catchphrase: "RENVERSEMENT ! Plot twist du siècle ! 🌪️"
      // },
      // {
      //   url: 'https://media.giphy.com/media/l0HlR2Q9Ko7902ADu/giphy.gif',
      //   catchphrase: "PRISE DE POUVOIR ! Vive la révolution ! 👑"
      // },
      // {
      //   url: 'https://media.giphy.com/media/26u4kr1xhaTiTOdzi/giphy.gif',
      //   catchphrase: "VICTOIRE ! T'es le boss maintenant ! 😎"
      // },
      // {
      //   url: 'https://media.giphy.com/media/l0MYGb8oIDKEOzd8c/giphy.gif',
      //   catchphrase: "MATCH SERRÉ ! C'est du 50/50 ! ⚖️"
      // },
      // {
      //   url: 'https://media.giphy.com/media/26BRQp8Y8YN8k5EAw/giphy.gif',
      //   catchphrase: "COUDE À COUDE ! Ça va être chaud ! 🥵"
      // },
      // {
      //   url: 'https://media.giphy.com/media/l0HlUNj5BRuYDLxFm/giphy.gif',
      //   catchphrase: "HIGH FIVE ! Tu assures grave ! 🙏"
      // }
    ]
  }

  // Fonction pour sélectionner un GIF aléatoire d'une catégorie
  function getRandomGif(category) {
    const gifs = gifLibrary[category]
    if (!gifs || gifs.length === 0) return null

    // Si on a peu de GIFs (moins de 4), on fait du pur random sans anti-répétition
    if (gifs.length <= 3) {
      return gifs[Math.floor(Math.random() * gifs.length)]
    }

    // Filtrer les GIFs récemment utilisés
    const maxRecentGifs = Math.min(3, Math.floor(gifs.length / 2))
    const availableGifs = gifs.filter(gif =>
      !recentlyUsedGifs.value.some(recent => recent.url === gif.url)
    )

    // Si tous les GIFs ont été récemment utilisés, réinitialiser la liste
    if (availableGifs.length === 0) {
      recentlyUsedGifs.value = []
      return gifs[Math.floor(Math.random() * gifs.length)]
    }

    // Sélectionner un GIF non récent
    const selectedGif = availableGifs[Math.floor(Math.random() * availableGifs.length)]

    // Ajouter à la liste des récents
    recentlyUsedGifs.value.push(selectedGif)

    // Limiter la taille de la liste des récents
    if (recentlyUsedGifs.value.length > maxRecentGifs) {
      recentlyUsedGifs.value.shift()
    }

    return selectedGif
  }

  // Fonction pour sélectionner un GIF - toujours aléatoire depuis la liste unique
  function selectGif(score, isLeadChange = false, isTie = false) {
    return getRandomGif('all')
  }

  // Fonction pour jouer le son
  function playSound(soundUrl = null) {
    // Si pas d'URL fournie, utiliser un son aléatoire de la bibliothèque
    if (!soundUrl) {
      soundUrl = getRandomSound()
      console.log('🎵 Playing random sound:', soundUrl)
    }

    try {
      // Arrêter le son précédent s'il existe
      if (audioInstance) {
        audioInstance.pause()
        audioInstance = null
      }

      // Créer et jouer le nouveau son
      audioInstance = new Audio(soundUrl)
      audioInstance.volume = 0.5 // Volume à 50%
      audioInstance.play().catch(err => {
        console.warn('Failed to play sound:', err)
        // Essayer avec un autre son aléatoire en cas d'échec
        const fallbackSound = getRandomSound()
        if (fallbackSound !== soundUrl) {
          console.log('🔄 Trying fallback sound:', fallbackSound)
          audioInstance = new Audio(fallbackSound)
          audioInstance.volume = 0.5
          audioInstance.play().catch(e => console.error('Fallback also failed:', e))
        }
      })
    } catch (error) {
      console.error('Error playing sound:', error)
    }
  }

  // Fonction pour arrêter le son
  function stopSound() {
    if (audioInstance) {
      audioInstance.pause()
      audioInstance.currentTime = 0
      audioInstance = null
    }
  }

  // Fonction pour afficher un GIF avec sa catchphrase
  function showGif(gifData, duration = 4000) {
    if (!gifData) return

    // Gérer les anciens appels avec juste l'URL
    if (typeof gifData === 'string') {
      gifData = { url: gifData, catchphrase: '' }
    }

    console.log('🎭 Showing GIF:', gifData)

    // Si un GIF est déjà visible, ignorer la nouvelle demande pour éviter le clignotement
    if (isGifVisible.value) {
      console.log('🎭 GIF already visible, ignoring new request')
      return
    }

    // Annuler le timeout précédent s'il existe
    if (currentTimeout) {
      clearTimeout(currentTimeout)
      console.log('🎭 Previous timeout cancelled')
    }

    currentGif.value = gifData.url
    currentCatchphrase.value = gifData.catchphrase || ''
    isGifVisible.value = true

    // Jouer le son quand le GIF apparaît
    playSound(gifData.soundUrl)

    console.log('🎭 Current state after:', { currentGif: currentGif.value, catchphrase: currentCatchphrase.value, isVisible: isGifVisible.value })

    currentTimeout = setTimeout(() => {
      isGifVisible.value = false
      currentGif.value = null
      currentCatchphrase.value = null
      currentTimeout = null
      stopSound() // Arrêter le son quand le GIF disparaît
      console.log('🎭 GIF hidden after timeout')
    }, duration)
  }

  // Fonction principale pour déclencher un GIF selon la situation
  function triggerGif({ score, isLeadChange = false, isTie = false, duration = 4000 }) {
    console.log('🎬 Triggering GIF:', { score, isLeadChange, isTie })
    const selectedGif = selectGif(score, isLeadChange, isTie)
    console.log('🎥 Selected GIF:', selectedGif)
    if (selectedGif) {
      showGif(selectedGif, duration)
    } else {
      console.warn('⚠️ No GIF selected for:', { score, isLeadChange, isTie })
    }
  }

  return {
    currentGif,
    currentCatchphrase,
    isGifVisible,
    triggerGif,
    showGif,
    gifLibrary,
    stopSound
  }
}