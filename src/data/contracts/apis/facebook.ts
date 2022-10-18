export interface LoadFacebookUser {
  loadUser: (
    params: LoadFacebookUserAPi.Params
  ) => Promise<LoadFacebookUserAPi.Result>
}

export namespace LoadFacebookUserAPi {
  export type Params = {
    token: string
  }

  export type Result = undefined
}
