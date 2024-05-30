import { pb } from '@/lib/pocketbase'

interface User {
  username: string
  password: string
  passwordConfirm: string
  email: string
  name: string
}

export const createUser = async (user: User) => {
  try {
    const response = await pb.collection('exampleAuth').create(user)

    pb.collection('exampleAuth').requestVerification(response.email)

    return response
  } catch (error) {
    return undefined
  }
}
