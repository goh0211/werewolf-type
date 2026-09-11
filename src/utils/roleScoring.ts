import type { DiagnosisResult } from './scoring'
import { roles, roleStyles, type RoleId } from '../data/roles'

export type RoleResult = {
  id: RoleId
  name: string
  score: number
  grade: 'S' | 'A' | 'B' | 'C'
  styleName: string
  styleDescription: string
  description: string
  bestRoleCopy: string
}

type AxisValues = {
  P: number; L: number
  A: number; W: number
  B: number; D: number
  R: number; S: number
  C: number; I: number
}

const gradeFor = (score: number): RoleResult['grade'] => {
  if (score >= 85) return 'S'
  if (score >= 75) return 'A'
  if (score >= 65) return 'B'
  return 'C'
}

const friendlyScore = (raw: number) => Math.round(55 + Math.max(0, Math.min(100, raw)) * 0.4)

const weighted = (...items: Array<[number, number]>) => {
  const totalWeight = items.reduce((sum, [, weight]) => sum + weight, 0)
  return items.reduce((sum, [value, weight]) => sum + value * weight, 0) / totalWeight
}

const dominant = (a: [string, number], b: [string, number]) => a[1] >= b[1] ? a[0] : b[0]

const getStyleKey = (role: RoleId, v: AxisValues) => {
  const pl = dominant(['P', v.P], ['L', v.L])
  const aw = dominant(['A', v.A], ['W', v.W])
  const bd = dominant(['B', v.B], ['D', v.D])
  const rs = dominant(['R', v.R], ['S', v.S])
  const ci = dominant(['C', v.C], ['I', v.I])

  switch (role) {
    case 'villager': return `${pl}${bd}`
    case 'seer': return `${aw}${bd}`
    case 'medium': return `${pl}${ci}`
    case 'knight': return `${pl}${rs}`
    case 'werewolf': return `${pl}${aw}`
    case 'madman': return `${aw}${rs}`
  }
}

export function calculateRoleResults(result: DiagnosisResult): RoleResult[] {
  const v: AxisValues = {
    P: result.axes.PL.right,
    L: result.axes.PL.left,
    A: result.axes.AW.right,
    W: result.axes.AW.left,
    B: result.axes.BD.right,
    D: result.axes.BD.left,
    R: result.axes.RS.right,
    S: result.axes.RS.left,
    C: result.axes.CI.right,
    I: result.axes.CI.left,
  }

  const reasoningBalance = 100 - Math.abs(v.P - v.L)
  const socialBalance = 100 - Math.abs(v.C - v.I)
  const specialization = Math.max(v.P, v.L)

  const rawScores: Record<RoleId, number> = {
    villager: weighted([v.L, .27], [v.D, .22], [v.C, .18], [v.W, .13], [reasoningBalance, .12], [socialBalance, .08]),
    seer: weighted([v.L, .28], [v.A, .24], [v.D, .20], [v.C, .16], [reasoningBalance, .12]),
    medium: weighted([v.S, .28], [v.L, .24], [v.C, .22], [v.W, .18], [reasoningBalance, .08]),
    knight: weighted([v.W, .25], [v.R, .24], [v.I, .18], [v.P, .18], [specialization, .15]),
    werewolf: weighted([v.A, .25], [v.R, .22], [v.I, .15], [specialization, .23], [socialBalance, .15]),
    madman: weighted([v.R, .29], [v.A, .27], [v.I, .19], [v.P, .19], [specialization, .06]),
  }

  return roles
    .map((role) => {
      const score = friendlyScore(rawScores[role.id])
      const style = roleStyles[role.id][getStyleKey(role.id, v)]
      return {
        ...role,
        score,
        grade: gradeFor(score),
        styleName: style.name,
        styleDescription: style.description,
      }
    })
    .sort((a, b) => b.score - a.score)
}
