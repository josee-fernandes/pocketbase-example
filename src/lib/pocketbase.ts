import getConfig from 'next/config'
import PocketBase, { CollectionModel, CommonOptions } from 'pocketbase'

export const pb = new PocketBase('http://127.0.0.1:8090')

type BodyParams =
  | { name: string; [key: string]: unknown }
  | FormData
  | undefined
type Options = CommonOptions | undefined

type CreateCollectionFn = (
  bodyParams: BodyParams,
  options?: Options,
) => Promise<CollectionModel | undefined>

const {
  serverRuntimeConfig: { pocketBaseUser, pocketBasePassword },
} = getConfig()

const POCKETBASE_USER = pocketBaseUser ?? ''
const POCKETBASE_PASSWORD = pocketBasePassword ?? ''

const createCollection: CreateCollectionFn = async (bodyParams, options) => {
  if (!bodyParams) throw new Error('Model body not provided.')

  if (!Object.hasOwn(bodyParams, 'name')) throw new Error('Name is mandatory.')

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const { name } = bodyParams

  let collectionExists

  try {
    collectionExists = await pb.collections.getOne(name)
  } catch (error) {
    collectionExists = undefined
  }

  try {
    if (!collectionExists) {
      const createdCollection = await pb.collections.create(bodyParams, options)

      console.info(`✅ ${name} collection created.`)

      return createdCollection
    }

    console.info(`☑️ ${name} collection already exists.`)
    return collectionExists
  } catch (error) {
    console.error(`❌ Could not create ${name} collection.`)
    console.dir({ [name]: error }, { depth: null })
  }
}

export const initPocketBase = async () => {
  console.info('🪪 Initializing PocketBase')

  console.info('\n🔑 Authenticating ...')

  try {
    await pb.admins.authWithPassword(POCKETBASE_USER, POCKETBASE_PASSWORD)

    console.info('\n✅ Authenticated')
  } catch (error) {
    console.error('\n❌ Failed to authenticate')
    console.dir({ authError: error }, { depth: null })
  }

  console.info('\n⚙️ Migrating collections')

  await createCollection({
    name: 'exampleBase',
    type: 'base',
    schema: [
      {
        name: 'title',
        type: 'text',
        required: true,
        options: {
          min: 10,
        },
      },
      {
        name: 'status',
        type: 'bool',
      },
    ],
  })

  await createCollection({
    name: 'exampleAuth',
    type: 'auth',
    createRule: 'id = @request.auth.id',
    updateRule: 'id = @request.auth.id',
    deleteRule: 'id = @request.auth.id',
    schema: [
      {
        name: 'name',
        type: 'text',
      },
    ],
    options: {
      allowOAuth2Auth: true,
      requireEmail: true,
      allowEmailAuth: true,
      allowUsernameAuth: true,
      minPasswordLength: 5,
    },
  })
}
