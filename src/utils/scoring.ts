import type { Axis } from '../data/questions'

export type RawScores = Record<Axis, number>
export type AxisResult = { left: number; right: number; letter: string }

export type DiagnosisResult = {
  code: string
  group: 'PA' | 'PW' | 'LA' | 'LW'
  trait: 'C' | 'I'
  axes: {
    PL: AxisResult
    AW: AxisResult
    BD: AxisResult
    RS: AxisResult
    CI: AxisResult
  }
}

const clamp = (n: number, min: number, max: number) => Math.min(Math.max(n, min), max)

const toPercent = (score: number) => {
  const right = clamp(Math.round(50 + score * 5), 0, 100)
  return { left: 100 - right, right }
}

export function calculateResult(scores: RawScores): DiagnosisResult {
  const pl = toPercent(scores.PL)
  const aw = toPercent(scores.AW)
  const bd = toPercent(scores.BD)
  const rs = toPercent(scores.RS)
  const ci = toPercent(scores.CI)

  const p = scores.PL >= 0
  const a = scores.AW >= 0
  const b = scores.BD >= 0
  const r = scores.RS >= 0
  const c = scores.CI >= 0

  const code = `${p ? 'P' : 'L'}${a ? 'A' : 'W'}${b ? 'B' : 'D'}${r ? 'R' : 'S'}-${c ? 'C' : 'I'}`
  const group = `${p ? 'P' : 'L'}${a ? 'A' : 'W'}` as DiagnosisResult['group']

  return {
    code,
    group,
    trait: c ? 'C' : 'I',
    axes: {
      PL: { left: pl.left, right: pl.right, letter: p ? 'P' : 'L' },
      AW: { left: aw.left, right: aw.right, letter: a ? 'A' : 'W' },
      BD: { left: bd.left, right: bd.right, letter: b ? 'B' : 'D' },
      RS: { left: rs.left, right: rs.right, letter: r ? 'R' : 'S' },
      CI: { left: ci.left, right: ci.right, letter: c ? 'C' : 'I' },
    },
  }
}
