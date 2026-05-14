<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { publicAssetUrl } from '@/utils/resolveAssetUrl'

type Obstacle = {
  id: number
  x: number
  width: number
  height: number
}

const GAME_WIDTH = 820
const GROUND_HEIGHT = 52
const DINO_SIZE = 42
const DINO_X = 88
const BASE_SPEED = 300
const GRAVITY = 1800
const JUMP_VELOCITY = 670
const MIN_SPAWN_DELAY = 850
const MAX_SPAWN_DELAY = 1680
const gameboyBodySrc = publicAssetUrl('gameboy/body_gameboy.png')

const score = ref(0)
const bestScore = ref(0)
const isRunning = ref(false)
const isGameOver = ref(false)
const dinoY = ref(0)
const dinoVelocity = ref(0)
const obstacles = ref<Obstacle[]>([])
const obstacleId = ref(0)
const groundShift = ref(0)

let rafId: number | null = null
let lastFrameTime = 0
let spawnTimer = 0
let nextSpawnDelay = randomSpawnDelay()

const dinoBottom = computed(() => GROUND_HEIGHT + dinoY.value)
const scoreLabel = computed(() => Math.floor(score.value).toString().padStart(5, '0'))
const bestScoreLabel = computed(() => bestScore.value.toString().padStart(5, '0'))
const statusLabel = computed(() => {
  if (isGameOver.value) return 'Crash detected'
  if (isRunning.value) return 'Run active'
  return 'Ready to start'
})

function randomSpawnDelay() {
  return MIN_SPAWN_DELAY + Math.random() * (MAX_SPAWN_DELAY - MIN_SPAWN_DELAY)
}

function resetGame() {
  score.value = 0
  dinoY.value = 0
  dinoVelocity.value = 0
  obstacles.value = []
  obstacleId.value = 0
  groundShift.value = 0
  spawnTimer = 0
  nextSpawnDelay = randomSpawnDelay()
  isGameOver.value = false
}

function startGame() {
  resetGame()
  isRunning.value = true
  lastFrameTime = 0
  startLoop()
}

function stopGame() {
  isRunning.value = false
  if (rafId !== null) {
    cancelAnimationFrame(rafId)
    rafId = null
  }
}

function gameOver() {
  isGameOver.value = true
  isRunning.value = false
  bestScore.value = Math.max(bestScore.value, Math.floor(score.value))
  if (rafId !== null) {
    cancelAnimationFrame(rafId)
    rafId = null
  }
}

function jump() {
  if (!isRunning.value || isGameOver.value) {
    startGame()
    dinoVelocity.value = JUMP_VELOCITY
    return
  }

  if (dinoY.value > 0) return
  dinoVelocity.value = JUMP_VELOCITY
}

function spawnObstacle() {
  const height = 30 + Math.random() * 34
  const width = 14 + Math.random() * 20

  obstacles.value.push({
    id: obstacleId.value++,
    x: GAME_WIDTH + width,
    width,
    height,
  })
}

function checkCollision(obstacle: Obstacle) {
  const dinoLeft = DINO_X
  const dinoRight = DINO_X + DINO_SIZE
  const dinoTop = dinoBottom.value + DINO_SIZE
  const obstacleLeft = obstacle.x
  const obstacleRight = obstacle.x + obstacle.width
  const obstacleBottom = GROUND_HEIGHT
  const obstacleTop = obstacleBottom + obstacle.height

  return (
    dinoRight > obstacleLeft + 4 &&
    dinoLeft < obstacleRight - 2 &&
    dinoBottom.value < obstacleTop - 2 &&
    dinoTop > obstacleBottom + 4
  )
}

function tick(timestamp: number) {
  if (!isRunning.value) return

  if (!lastFrameTime) {
    lastFrameTime = timestamp
    rafId = requestAnimationFrame(tick)
    return
  }

  const delta = Math.min((timestamp - lastFrameTime) / 1000, 0.032)
  lastFrameTime = timestamp

  const speed = BASE_SPEED + Math.min(score.value * 2.4, 250)

  dinoVelocity.value -= GRAVITY * delta
  dinoY.value = Math.max(0, dinoY.value + dinoVelocity.value * delta)

  if (dinoY.value === 0 && dinoVelocity.value < 0) {
    dinoVelocity.value = 0
  }

  score.value += delta * 10
  groundShift.value = (groundShift.value + speed * delta) % GAME_WIDTH
  spawnTimer += delta * 1000

  if (spawnTimer >= nextSpawnDelay) {
    spawnTimer = 0
    nextSpawnDelay = randomSpawnDelay()
    spawnObstacle()
  }

  obstacles.value = obstacles.value
    .map((obstacle) => ({
      ...obstacle,
      x: obstacle.x - speed * delta,
    }))
    .filter((obstacle) => obstacle.x + obstacle.width > -24)

  if (obstacles.value.some(checkCollision)) {
    gameOver()
    return
  }

  rafId = requestAnimationFrame(tick)
}

function startLoop() {
  if (rafId !== null) {
    cancelAnimationFrame(rafId)
  }

  rafId = requestAnimationFrame(tick)
}

function handleKeydown(event: KeyboardEvent) {
  const key = event.key.toLowerCase()

  if (key === ' ' || key === 'arrowup' || key === 'w') {
    event.preventDefault()
    jump()
  }

  if (key === 'enter' && isGameOver.value) {
    event.preventDefault()
    startGame()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  stopGame()
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div class="gameboy-wrap font-rubik">
    <div class="gameboy-stage">
      <div class="gameboy-console">
        <img class="gameboy-body" :src="gameboyBodySrc" alt="Gameboy body" />

        <div class="screen-frame">
          <div class="game-screen" @click="jump">
            <div class="screen-noise"></div>
            <div class="screen-glow"></div>
            <div class="sky-waves"></div>
            <div class="mount-far"></div>
            <div class="mount-near"></div>
            <div class="torii-mark"></div>
            <div class="petal petal-a"></div>
            <div class="petal petal-b"></div>
            <div class="sun"></div>

            <div class="hud-row hud-top">
              <span>{{ statusLabel }}</span>
              <span>Space / W / ↑</span>
            </div>

            <div class="hud-row hud-bottom">
              <span>HI {{ bestScoreLabel }}</span>
              <span>NOW {{ scoreLabel }}</span>
            </div>

            <div class="game-world">
              <div
                class="dino"
                :class="{ airborne: dinoY > 0, running: isRunning && !isGameOver }"
                :style="{ left: `${DINO_X}px`, bottom: `${dinoBottom}px` }"
              >
                <span class="dino-eye"></span>
                <span class="dino-tail"></span>
              </div>

              <div
                v-for="obstacle in obstacles"
                :key="obstacle.id"
                class="obstacle"
                :style="{ left: `${obstacle.x}px`, width: `${obstacle.width}px`, height: `${obstacle.height}px` }"
              >
                <span class="obstacle-arm obstacle-arm-top"></span>
                <span class="obstacle-arm obstacle-arm-mid"></span>
              </div>

              <div class="ground-line ground-line-back" :style="{ transform: `translateX(-${groundShift}px)` }"></div>
              <div class="ground-line ground-line-front" :style="{ transform: `translateX(${GAME_WIDTH - groundShift}px)` }"></div>
            </div>

            <div v-if="!isRunning && !isGameOver" class="overlay-card">
              <p class="overlay-kicker">Tap screen</p>
              <p class="overlay-text">Запусти игру кликом по экрану или кнопкой A.</p>
            </div>

            <div v-if="isGameOver" class="overlay-card overlay-card-danger">
              <p class="overlay-kicker">Game over</p>
              <p class="overlay-text">Счёт: {{ Math.floor(score) }}. Нажми A, Enter или кликни по экрану.</p>
            </div>
          </div>
        </div>

        <div class="controls-area">
          <button type="button" class="control-button control-button-jump" @click="jump" aria-label="Jump">
            <span class="jump-core">
              <span class="jump-glyph">A</span>
            </span>
          </button>
          <button type="button" class="control-button control-button-restart" @click="startGame" aria-label="Restart run">
            <span class="restart-glyph">R</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.gameboy-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: #312621;
}

.gameboy-stage {
  width: min(calc(80vh * 0.7408), 100%);
  max-width: 100%;
  max-height: 80vh;
}

.gameboy-console {
  position: relative;
  width: 100%;
  aspect-ratio: 461 / 623;
}

.gameboy-body {
  display: block;
  width: 100%;
  height: 100%;
  user-select: none;
  pointer-events: none;
  filter: brightness(0.94) saturate(0.96) contrast(1.02);
}

.screen-frame {
  position: absolute;
  left: 7.5922%;
  top: 5.6180%;
  width: 84.8156%;
  height: 54.5746%;
  border-radius: 0.6rem;
  overflow: hidden;
}

.game-screen {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: linear-gradient(180deg, #f6f2e4 0%, #e6e4cf 52%, #d3dcc0 100%);
  cursor: pointer;
}

.sky-waves {
  position: absolute;
  inset: 10% 0 auto 0;
  height: 40%;
  background:
    radial-gradient(circle at 15% 18%, rgba(255, 255, 255, 0.24), transparent 16%),
    radial-gradient(circle at 82% 20%, rgba(255, 255, 255, 0.18), transparent 14%),
    linear-gradient(180deg, rgba(160, 178, 142, 0.12) 0%, rgba(160, 178, 142, 0) 100%);
  opacity: 0.56;
  pointer-events: none;
}

.screen-noise {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(74, 97, 63, 0.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(74, 97, 63, 0.025) 1px, transparent 1px);
  background-size: 100% 3px, 3px 100%;
  pointer-events: none;
}

.screen-glow {
  position: absolute;
  inset: 0;
  box-shadow:
    inset 0 0 35px rgba(27, 36, 22, 0.14),
    inset 0 -22px 30px rgba(44, 58, 35, 0.08);
  pointer-events: none;
}

.sun {
  position: absolute;
  top: 1.4rem;
  right: 1rem;
  width: 46px;
  height: 46px;
  border-radius: 999px;
  background:
    radial-gradient(circle at 32% 30%, rgba(255, 255, 255, 0.7), transparent 34%),
    linear-gradient(180deg, #d86f52 0%, #c85a43 100%);
  box-shadow: 0 0 0 6px rgba(216, 111, 82, 0.08);
  opacity: 0.6;
}

.mount-far,
.mount-near {
  position: absolute;
  bottom: 38px;
  background: linear-gradient(180deg, rgba(104, 121, 92, 0.9), rgba(77, 92, 68, 0.96));
  clip-path: polygon(0 100%, 24% 58%, 42% 74%, 56% 38%, 71% 64%, 100% 100%);
  opacity: 0.28;
  pointer-events: none;
}

.mount-far {
  left: -4%;
  width: 56%;
  height: 24%;
}

.mount-near {
  right: 6%;
  width: 42%;
  height: 19%;
  opacity: 0.18;
}

.torii-mark {
  position: absolute;
  right: 18%;
  bottom: 37px;
  width: 18px;
  height: 34px;
  opacity: 0.24;
  pointer-events: none;
}

.torii-mark::before,
.torii-mark::after {
  content: "";
  position: absolute;
  background: #8e5548;
}

.torii-mark::before {
  inset: 0 0 auto 0;
  height: 4px;
  border-radius: 999px;
  box-shadow: 0 6px 0 rgba(142, 85, 72, 0.85);
}

.torii-mark::after {
  left: 3px;
  right: 3px;
  bottom: 0;
  top: 10px;
  background:
    linear-gradient(90deg, #8e5548 0 3px, transparent 3px calc(100% - 3px), #8e5548 calc(100% - 3px) 100%);
}

.petal {
  position: absolute;
  width: 10px;
  height: 6px;
  border-radius: 999px 999px 999px 2px;
  background: rgba(219, 156, 164, 0.42);
  pointer-events: none;
  transform: rotate(18deg);
}

.petal-a {
  right: 26%;
  top: 44%;
}

.petal-b {
  right: 20%;
  top: 52%;
  opacity: 0.72;
}

.hud-row {
  position: absolute;
  left: 0.8rem;
  right: 0.8rem;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  font-size: 0.63rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #64755d;
}

.hud-top {
  top: 0.75rem;
}

.hud-bottom {
  bottom: 0.75rem;
}

.game-world {
  position: relative;
  width: 100%;
  height: 100%;
}

.dino {
  position: absolute;
  width: 42px;
  height: 42px;
  border-radius: 12px 14px 9px 10px;
  background: #344430;
  box-shadow:
    inset 7px 0 0 rgba(235, 243, 226, 0.12),
    inset 0 -8px 0 rgba(29, 39, 25, 0.18);
}

.dino::before,
.dino::after {
  content: "";
  position: absolute;
  background: #344430;
}

.dino::before {
  left: 22px;
  top: -14px;
  width: 18px;
  height: 20px;
  border-radius: 9px 9px 5px 5px;
  transform: rotate(10deg);
}

.dino::after {
  left: 8px;
  bottom: -10px;
  width: 9px;
  height: 14px;
  border-radius: 0 0 4px 4px;
  box-shadow: 16px 0 0 #344430;
}

.dino.running::after {
  animation: dino-feet 0.18s steps(2) infinite;
}

.dino.airborne::after {
  animation: none;
  transform: translateY(-2px);
}

.dino-eye {
  position: absolute;
  top: 8px;
  right: 7px;
  width: 4px;
  height: 4px;
  border-radius: 999px;
  background: #f8faef;
}

.dino-tail {
  position: absolute;
  left: -11px;
  bottom: 8px;
  width: 14px;
  height: 7px;
  border-radius: 12px 4px 4px 12px;
  background: #344430;
  transform: rotate(-18deg);
}

.obstacle {
  position: absolute;
  bottom: 52px;
  border-radius: 8px 8px 2px 2px;
  background: linear-gradient(180deg, #486046 0%, #384a36 100%);
  box-shadow: inset 4px 0 0 rgba(238, 246, 232, 0.12);
}

.obstacle-arm {
  position: absolute;
  right: -8px;
  width: 10px;
  border-radius: 999px;
  background: #41583f;
}

.obstacle-arm-top {
  top: 10px;
  height: 7px;
}

.obstacle-arm-mid {
  top: 22px;
  height: 6px;
}

.ground-line {
  position: absolute;
  left: 0;
  bottom: 34px;
  width: 820px;
  height: 11px;
  border-radius: 999px;
  background:
    linear-gradient(180deg, rgba(127, 116, 84, 0.7) 0%, rgba(100, 91, 67, 0.88) 52%, rgba(76, 69, 50, 0.94) 100%);
  box-shadow:
    inset 0 1px 0 rgba(235, 225, 194, 0.18),
    inset 0 -1px 0 rgba(61, 54, 35, 0.14);
}

.ground-line::after {
  content: "";
  position: absolute;
  inset: 3px 18px auto 18px;
  height: 1px;
  border-radius: 999px;
  background:
    linear-gradient(90deg, rgba(226, 235, 213, 0) 0%, rgba(226, 235, 213, 0.18) 12%, rgba(226, 235, 213, 0.1) 50%, rgba(226, 235, 213, 0.18) 88%, rgba(226, 235, 213, 0) 100%);
}

.ground-line::before {
  content: "";
  position: absolute;
  inset: auto 14px -2px 14px;
  height: 2px;
  border-radius: 999px;
  background: rgba(41, 55, 35, 0.08);
  filter: blur(1.2px);
}

.overlay-card {
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 3;
  width: min(86%, 280px);
  transform: translate(-50%, -50%);
  border: 1px solid rgba(69, 86, 63, 0.2);
  border-radius: 18px;
  padding: 0.9rem 1rem;
  background: rgba(248, 251, 238, 0.94);
  box-shadow: 0 18px 30px rgba(70, 88, 58, 0.12);
  text-align: center;
}

.overlay-card-danger {
  background: rgba(250, 240, 231, 0.95);
}

.overlay-kicker {
  margin: 0;
  font-size: 0.68rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #6d7a61;
}

.overlay-text {
  margin: 0.45rem 0 0;
  font-size: 0.88rem;
  line-height: 1.4;
  color: #33402f;
}

.controls-area {
  position: absolute;
  left: 10%;
  right: 10%;
  bottom: 11%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.control-button {
  border: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: "Rubik", sans-serif;
  box-shadow:
    inset 0 2px 0 rgba(255, 255, 255, 0.12),
    0 10px 24px rgba(66, 13, 25, 0.25);
  cursor: pointer;
  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease,
    filter 0.18s ease;
}

.control-button:hover {
  transform: translateY(-2px);
  filter: brightness(1.03);
}

.control-button:active {
  transform: translateY(1px) scale(0.985);
}

.control-button-restart {
  width: 19%;
  aspect-ratio: 1.4 / 1;
  border-radius: 1rem;
  background: #232323;
  box-shadow:
    0 0 4px rgba(0, 0, 0, 0.25),
    0 0 10px rgba(91, 68, 23, 0.25),
    0 0 30px rgba(175, 88, 8, 0.5),
    inset -10px 10px 10px rgba(255, 255, 255, 0.1),
    inset -2px 2px 0 rgba(255, 255, 255, 0.4);
}

.control-button-jump {
  width: 21%;
  aspect-ratio: 1;
  border-radius: 999px;
  padding: 4%;
  background:
    radial-gradient(circle at 34% 28%, #ffe7a2 0%, #ffd35f 34%, #f1b423 62%, #dd960e 100%);
  box-shadow:
    0 8px 18px rgba(126, 77, 8, 0.28),
    0 0 0 1px rgba(184, 118, 13, 0.24),
    inset 10px 10px 14px rgba(255, 245, 201, 0.22),
    inset -10px -12px 16px rgba(174, 102, 4, 0.2),
    inset 0 2px 0 rgba(255, 255, 255, 0.42);
}

.restart-glyph {
  color: #575757;
  font-size: clamp(1rem, 2.2vw, 1.4rem);
  line-height: 1;
  text-transform: uppercase;
}

.jump-core {
  display: inline-flex;
  width: 58%;
  height: 58%;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  background: radial-gradient(circle at 30% 30%, #353a40 0%, #25292f 58%, #1d2126 100%);
  box-shadow:
    inset 0 2px 3px rgba(255, 255, 255, 0.08),
    inset 0 -3px 5px rgba(0, 0, 0, 0.22),
    0 3px 8px rgba(0, 0, 0, 0.18);
}

.jump-glyph {
  color: #ffcb43;
  font-size: clamp(0.98rem, 1.95vw, 1.22rem);
  font-weight: 800;
  line-height: 1;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  transform: translateY(0.02em);
  text-shadow: 0 1px 0 rgba(255, 244, 199, 0.2);
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

@keyframes dino-feet {
  0%,
  100% {
    box-shadow: 16px 0 0 #344430;
    transform: translateY(0);
  }

  50% {
    box-shadow: 16px -2px 0 #344430;
    transform: translateY(1px);
  }
}

@media (max-width: 640px) {
  .gameboy-stage {
    width: min(calc(80vh * 0.7408), calc(100vw - 24px));
    max-height: min(80vh, calc(100dvh - 24px));
  }

  .hud-row {
    left: 0.55rem;
    right: 0.55rem;
    font-size: 0.54rem;
    letter-spacing: 0.08em;
  }

  .overlay-text {
    font-size: 0.74rem;
  }

  .controls-area {
    left: 9%;
    right: 8%;
    bottom: 10.5%;
  }

  .control-button-restart {
    width: 21%;
  }

  .control-button-jump {
    width: 23%;
  }

  .restart-glyph {
    font-size: clamp(0.9rem, 4vw, 1.15rem);
  }

  .jump-glyph {
    font-size: clamp(0.82rem, 3vw, 0.98rem);
  }
}
</style>
