export interface Member {
  name: string
  major: string
  photo: string
  hometown: string
  linkedin?: string
  email?: string
  description?: string
  role?: string
}

export interface MembersData {
  eboard: Member[]
  alpha: Member[]
  beta: Member[]
  founders: Member[]
  gamma?: Member[]
  [key: string]: Member[] | undefined
}
