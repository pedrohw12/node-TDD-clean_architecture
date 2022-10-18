import { mock, MockProxy } from 'jest-mock-extended'

import { FacebookAuthenticationService } from '@/data/services'
import { AuthenticationError } from '@/domain/errors'
import { LoadFacebookUser } from '@/data/contracts/apis'

type SutTypes = {
  sut: FacebookAuthenticationService
  loadFacebookUserApi: MockProxy<LoadFacebookUser>
}

const makeSut = (): SutTypes => {
  const loadFacebookUserApi = mock<LoadFacebookUser>()
  const sut = new FacebookAuthenticationService(loadFacebookUserApi)

  return {
    sut,
    loadFacebookUserApi
  }
}

describe('FacebookAuthenticationService', () => {
  it('Should call LoadFacebookUserAPi with correct params', async () => {
    const { sut, loadFacebookUserApi } = makeSut()

    await sut.perform({ token: 'any_token' })

    expect(loadFacebookUserApi.loadUser).toHaveBeenCalledWith({
      token: 'any_token'
    })
    expect(loadFacebookUserApi.loadUser).toHaveBeenCalledTimes(1)
  })

  it('Should return AuthenticationError when LoadFacebookUserAPi returns undefined', async () => {
    const { sut, loadFacebookUserApi } = makeSut()
    loadFacebookUserApi.loadUser.mockResolvedValueOnce(undefined)

    const authResult = await sut.perform({ token: 'any_token' })

    expect(authResult).toEqual(new AuthenticationError())
  })
})
