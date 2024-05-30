import { zodResolver } from '@hookform/resolvers/zod'
import { NextPage } from 'next'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { createUser } from '@/api/create-user'
import { getUsers } from '@/api/get-users'

const createUserFormSchema = z.object({
  username: z.string(),
  password: z.string().min(5),
  passwordConfirm: z.string().min(5),
  email: z.string().email(),
  name: z.string(),
})

type CreateUserFormSchemaType = z.infer<typeof createUserFormSchema>

const Home: NextPage = () => {
  const [usersResponse, setUsersResponse] = useState({})

  const { register, handleSubmit, reset } = useForm<CreateUserFormSchemaType>({
    defaultValues: {
      username: '',
      password: '',
      passwordConfirm: '',
      email: '',
      name: '',
    },
    resolver: zodResolver(createUserFormSchema),
  })

  const handleGetUsers = async () => {
    const users = await getUsers()

    setUsersResponse(users)
  }

  const handleCreateUser = async (data: CreateUserFormSchemaType) => {
    const user = {
      username: data.username,
      password: data.password,
      passwordConfirm: data.passwordConfirm,
      email: data.email,
      name: data.name,
    }

    await createUser(user)

    reset()

    await handleGetUsers()
  }

  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-8 py-10">
      <div className="flex w-[95%] max-w-[500px] flex-col items-center rounded border border-zinc-200 bg-zinc-100 px-4 py-2">
        <h2 className="text-2xl font-bold">Create user</h2>
        <form
          onSubmit={handleSubmit(handleCreateUser)}
          className="flex w-full flex-col py-6"
        >
          <label className="flex flex-col gap-2">
            Username
            <input type="text" required {...register('username')} />
          </label>
          <label className="flex flex-col gap-2">
            Password
            <input type="password" required {...register('password')} />
          </label>
          <label className="flex flex-col gap-2">
            Password confirmation
            <input type="password" required {...register('passwordConfirm')} />
          </label>
          <label className="flex flex-col gap-2">
            Email
            <input type="email" required {...register('email')} />
          </label>
          <label className="flex flex-col gap-2">
            Name
            <input type="text" required {...register('name')} />
          </label>
          <button
            type="submit"
            className="mt-4 rounded bg-emerald-500 px-4 py-2 text-white transition-all hover:bg-emerald-600"
          >
            CREATE
          </button>
        </form>
      </div>
      <div className="flex w-[95%] max-w-[800px] flex-col items-center rounded border border-zinc-200 bg-zinc-100 px-4 py-2">
        <div className="flex w-full items-center justify-between">
          <h2>Get users</h2>
          <button
            onClick={handleGetUsers}
            className="rounded bg-emerald-500 px-4 py-2 text-white transition-all hover:bg-emerald-600"
          >
            GET
          </button>
        </div>
        <div className="mx-auto w-full">
          <pre className="whitespace-pre-wrap">
            {JSON.stringify(usersResponse, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  )
}

export default Home
