import { makeAutoObservable } from 'mobx';
import { RequestAuthDTO, ResponseLoginServiceDTO } from '../model/interface';
import { AuthRepository } from '../repository/AuthRepository';
import { inject, injectable } from 'inversify';
import { Router } from 'router5';
import { CORE_ROUTES } from '../../core/config/routes';
import { AuthModel } from '../model/AuthModel';

@injectable()
export class AuthViewModel {
  constructor(
    @inject(AuthRepository)
    private authRepository: AuthRepository,
    @inject(AuthModel)
    private authModel: AuthModel,
  ) {
    makeAutoObservable(this);
  }

  async checkStatusApionInit(): Promise<void> {
    try {
      this.authModel.setAuthInProgress(true);
      const status = await this.authRepository.getAppAuthStatus();
      if (status) {
        this.authModel.setAuthComplete(true);
        this.authModel.setAuth(true);
      }
    } catch (error) {
      console.log(error);
      return;
    } finally {
      this.authModel.setAuthInProgress(false);
    }
  }

  async authenticate(
    param: RequestAuthDTO,
    router: Router,
  ): Promise<ResponseLoginServiceDTO> {
    const response = await this.authRepository.authenticate(param);
    if (response.user) {
      this.authModel.setAuthComplete(true);
      this.authModel.setAuth(true);
      router.navigate(CORE_ROUTES.HOME);
    }
    return response;
  }
}
