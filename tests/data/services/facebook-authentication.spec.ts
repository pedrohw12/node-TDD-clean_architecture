import { mock } from 'jest-mock-extended'

import { FacebookAuthenticationService } from '@/data/services'
import { AuthenticationError } from '@/domain/errors'
import { LoadFacebookUser } from '@/data/contracts/apis'

describe('FacebookAuthenticationService', () => {
  it('Should call LoadFacebookUserAPi with correct params', async () => {
    const loadFacebookUserApi = mock<LoadFacebookUser>()
    const sut = new FacebookAuthenticationService(loadFacebookUserApi)

    await sut.perform({ token: 'any_token' })

    expect(loadFacebookUserApi.loadUser).toHaveBeenCalledWith({
      token: 'any_token'
    })
    expect(loadFacebookUserApi.loadUser).toHaveBeenCalledTimes(1)
  })

  it('Should return AuthenticationError when LoadFacebookUserAPi returns undefined', async () => {
    const loadFacebookUserApi = mock<LoadFacebookUser>()
    loadFacebookUserApi.loadUser.mockResolvedValueOnce(undefined)
    const sut = new FacebookAuthenticationService(loadFacebookUserApi)

    const authResult = await sut.perform({ token: 'any_token' })

    expect(authResult).toEqual(new AuthenticationError())
  })
})
