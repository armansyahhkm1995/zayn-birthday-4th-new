export type SoundName = "splash" | "interaction" | "wrong" | "correct";

const soundSources: Record<SoundName, string> = {
  splash: "/assets/audio/splash-screen-sound.mp3",
  interaction: "/assets/audio/interaction-sound.mp3",
  wrong: "/assets/audio/wrong-answer-sound.mp3",
  correct: "/assets/audio/correct-answer-sound.mp3",
};

const soundVolumes: Record<SoundName, number> = {
  splash: 0.7,
  interaction: 0.35,
  wrong: 0.5,
  correct: 0.55,
};

const audioCache = new Map<SoundName, HTMLAudioElement>();

function getAudio(name: SoundName) {
  if (typeof window === "undefined") {
    return null;
  }

  const cachedAudio = audioCache.get(name);

  if (cachedAudio) {
    return cachedAudio;
  }

  const audio = new Audio(soundSources[name]);

  audio.preload = "auto";
  audio.volume = soundVolumes[name];

  audioCache.set(name, audio);

  return audio;
}

export function preloadSounds() {
  const sounds: SoundName[] = ["splash", "interaction", "wrong", "correct"];

  sounds.forEach((sound) => {
    getAudio(sound)?.load();
  });
}

export function playSound(name: SoundName) {
  const audio = getAudio(name);

  if (!audio) return;

  try {
    audio.pause();
    audio.currentTime = 0;
    audio.loop = false;

    const playPromise = audio.play();

    if (playPromise) {
      void playPromise.catch(() => {
        // Audio tidak boleh merusak permainan.
      });
    }
  } catch {
    // Audio tidak boleh merusak permainan.
  }
}

export async function playLoopingSound(name: SoundName) {
  const audio = getAudio(name);

  if (!audio) return false;

  try {
    audio.pause();
    audio.currentTime = 0;
    audio.loop = true;

    await audio.play();

    return true;
  } catch {
    return false;
  }
}

export function stopSound(name: SoundName) {
  const audio = getAudio(name);

  if (!audio) return;

  audio.pause();
  audio.currentTime = 0;
  audio.loop = false;
}
