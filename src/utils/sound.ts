class SoundLoader {
  private cache: Record<string, AudioBuffer>;
  private context: AudioContext | null;

  constructor() {
    this.cache = {};
    this.context = null;
    try {
      // @ts-expect-error Might as well keep the old webkitAudioContext fallback.
      this.context = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
      console.error("Sounds will not work in this browser: ", e);
    }
  }

  async load(name: string, url: string): Promise<void> {
    if (!this.context || this.loaded(name)) return;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch sound from ${url}: ${response.statusText}`);
      }

      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await this.context.decodeAudioData(arrayBuffer);

      this.cache[name] = audioBuffer;
    } catch (e) {
      console.error("Failed to load sound: ", e);
    }
  }

  play(name: string, callback?: () => void): void {
    if (this.loaded(name)) {
      try {
        const source = this.context!.createBufferSource();
        source.buffer = this.cache[name];
        source.connect(this.context!.destination);

        if (callback) {
          setTimeout(callback, source.buffer.duration * 1000);
        }

        source.start(0, 0, source.buffer.duration);
      } catch (e) {
        console.error("Failed to play sound: ", e);
      }
    } else {
      console.error(`Sound "${name}" not loaded!`);
    }
  }

  loaded(name: string): boolean {
    return this.cache.hasOwnProperty(name);
  }
}

export const useSounds = (urls: Record<string, string> = {}) => {
  const sounds = new SoundLoader();
  for (const [id, url] of Object.entries(urls)) sounds.load(id, url);
  return sounds;
};

export default SoundLoader;
