"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { wedding } from "@/config/wedding";
import { OPEN_EVENT } from "./EnvelopeHero";

// Minimal typings for the YouTube IFrame API (only what this component uses).
type YTPlayer = {
  playVideo(): void;
  pauseVideo(): void;
  nextVideo(): void;
  cuePlaylist(opts: { playlist: string[]; index?: number }): void;
  destroy(): void;
  setVolume(volume: number): void;
  setLoop(loop: boolean): void;
  unMute(): void;
  getVideoData(): { video_id?: string; title?: string };
};
type YTNamespace = {
  Player: new (
    el: HTMLElement,
    opts: {
      videoId: string;
      width?: number;
      height?: number;
      playerVars?: Record<string, string | number>;
      events?: {
        onReady?: () => void;
        onStateChange?: (e: { data: number }) => void;
        onError?: (e: { data: number }) => void;
      };
    },
  ) => YTPlayer;
  PlayerState: { PLAYING: number; PAUSED: number; ENDED: number; CUED: number };
};
declare global {
  interface Window {
    YT?: YTNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

type Song = { id: string; title: string };

function loadYouTubeApi(): Promise<YTNamespace> {
  return new Promise((resolve) => {
    if (window.YT?.Player) return resolve(window.YT);
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prev?.();
      resolve(window.YT!);
    };
    if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
      const s = document.createElement("script");
      s.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(s);
    }
  });
}

function shuffled<T>(list: T[]) {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function MusicToggle() {
  const { playlist, shuffle } = wedding.music;
  const mount = useRef<HTMLDivElement>(null);
  const player = useRef<YTPlayer | null>(null);
  const songs = useRef<Song[]>(playlist);
  const ready = useRef(false);
  const userPaused = useRef(false);
  const wantPlay = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [title, setTitle] = useState("");
  const playingRef = useRef(false);
  playingRef.current = playing;

  useEffect(() => {
    if (!playlist.length || !mount.current) return;
    let cancelled = false;
    songs.current = shuffle ? shuffled(playlist) : playlist;
    const ids = songs.current.map((s) => s.id);
    const el = document.createElement("div");
    mount.current.appendChild(el);

    const currentTitle = () => {
      const data = player.current?.getVideoData();
      return songs.current.find((s) => s.id === data?.video_id)?.title ?? data?.title ?? "";
    };

    loadYouTubeApi().then((YT) => {
      if (cancelled) return;
      player.current = new YT.Player(el, {
        videoId: ids[0],
        width: 200,
        height: 200,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          playsinline: 1,
          rel: 0,
        },
        events: {
          onReady: () => {
            // Load the exact song list (starting at song 1); the `playlist` URL option can start on song 2.
            player.current?.setVolume(60);
            player.current?.cuePlaylist({ playlist: ids, index: 0 });
          },
          onStateChange: (e) => {
            if (e.data === YT.PlayerState.CUED && !ready.current) {
              ready.current = true;
              player.current?.setLoop(true); // repeat the whole list forever
              // The guest already tapped while the player was still loading: start now.
              // (Browsers keep allowing sound once the visitor has interacted with the page.)
              if (wantPlay.current && !userPaused.current) {
                player.current?.unMute();
                player.current?.playVideo();
              }
            } else if (e.data === YT.PlayerState.PLAYING) {
              setPlaying(true);
              setTitle(currentTitle());
            } else if (e.data === YT.PlayerState.PAUSED) {
              setPlaying(false);
            }
          },
          // A song that can't be embedded (removed, region-blocked…) is skipped instead of stopping the music.
          onError: () => player.current?.nextVideo(),
        },
      });
    });

    // Browsers only allow sound after a tap/click/key, so start on the envelope opening or the first interaction.
    const tryPlay = () => {
      if (userPaused.current || playingRef.current) return;
      wantPlay.current = true;
      if (!ready.current) return; // played as soon as the player is ready (see CUED above)
      player.current?.unMute();
      player.current?.playVideo();
    };
    window.addEventListener(OPEN_EVENT, tryPlay);
    window.addEventListener("pointerdown", tryPlay);
    window.addEventListener("touchend", tryPlay);
    window.addEventListener("keydown", tryPlay);

    return () => {
      cancelled = true;
      window.removeEventListener(OPEN_EVENT, tryPlay);
      window.removeEventListener("pointerdown", tryPlay);
      window.removeEventListener("touchend", tryPlay);
      window.removeEventListener("keydown", tryPlay);
      // YouTube swaps `el` for its own iframe, so destroy the player itself; otherwise a remount
      // (e.g. a dev hot-reload) leaves the old iframe playing underneath the new one.
      player.current?.destroy();
      player.current = null;
      ready.current = false;
      el.remove();
    };
  }, [playlist, shuffle]);

  if (!playlist.length) return null;

  const toggle = (ev: React.MouseEvent) => {
    ev.stopPropagation();
    const p = player.current;
    if (!p || !ready.current) return;
    if (playing) {
      userPaused.current = true;
      p.pauseVideo();
    } else {
      userPaused.current = false;
      p.unMute();
      p.playVideo();
    }
  };

  const next = (ev: React.MouseEvent) => {
    ev.stopPropagation();
    userPaused.current = false;
    player.current?.nextVideo();
  };

  return (
    <>
      {/* Hidden YouTube player (kept in the DOM but off-screen; display:none would stop playback) */}
      <div ref={mount} aria-hidden className="pointer-events-none fixed -left-[400px] top-0 h-px w-px overflow-hidden opacity-0" />

      <div className="fixed right-4 bottom-4 z-40 flex items-center gap-2">
        <AnimatePresence>
          {playing && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.8 }}
              className="flex items-center gap-2 rounded-full bg-white/90 py-1.5 pr-1.5 pl-3 text-xs font-medium text-plum shadow-lg"
            >
              <span className="flex h-3 items-end gap-0.5" aria-hidden>
                {[0, 1, 2, 3].map((i) => (
                  <motion.span
                    key={i}
                    className="w-0.5 rounded-full bg-magenta"
                    animate={{ height: ["30%", "100%", "50%", "90%", "30%"] }}
                    transition={{ duration: 1 + i * 0.2, repeat: Infinity, ease: "easeInOut" }}
                  />
                ))}
              </span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={title}
                  className="max-w-[8.5rem] truncate sm:max-w-[13rem]"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3 }}
                >
                  {title}
                </motion.span>
              </AnimatePresence>
              {playlist.length > 1 && (
                <button
                  type="button"
                  onClick={next}
                  aria-label="Next song"
                  className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-blush/60 text-plum transition active:scale-90 sm:hover:bg-blush"
                >
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden>
                    <path d="M5 5.5v13a1 1 0 001.5.86L16 13.7V18a1 1 0 002 0V6a1 1 0 00-2 0v4.3L6.5 4.64A1 1 0 005 5.5z" />
                  </svg>
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Pause music" : "Play music"}
          className="relative flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-gradient-to-br from-mauve to-plum text-2xl text-white shadow-xl ring-4 ring-white/70"
          initial={{ scale: 0 }}
          animate={{ scale: 1, rotate: playing ? 360 : 0 }}
          transition={playing ? { rotate: { duration: 6, repeat: Infinity, ease: "linear" } } : { type: "spring" }}
          whileTap={{ scale: 0.9 }}
        >
          {!playing && (
            <motion.span
              className="absolute inset-0 rounded-full bg-magenta/40"
              animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            />
          )}
          <span className="relative">{playing ? "♫" : "▶"}</span>
        </motion.button>
      </div>
    </>
  );
}
