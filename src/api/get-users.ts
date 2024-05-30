import { pb } from '@/lib/pocketbase'

export const getUsers = async () => {
  try {
    const response = await pb.collection('exampleAuth').getList()

    return response
  } catch (error) {
    return []
  }
}
