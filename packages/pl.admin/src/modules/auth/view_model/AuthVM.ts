import { makeAutoObservable } from "mobx";
import { RequestAuthDTO, ResponseLoginServiceDTO } from "../model/interface";
import { AuthRepository } from "../repository/AuthRepository";
import { inject, injectable } from "inversify";
import { Router } from "router5";
import { CORE_ROUTES } from "../../core/config/routes";
import { AuthModel } from "../model/auth.model.ts";
import { Bootstrap } from "../../../bootstrap";

@injectable()
export class AuthViewModel {
  private _onAuthInitCb = new Array<(bootstrap: Bootstrap) => Promise<void>>();
  private bootstrapCtx: Bootstrap | undefined;

  constructor(
    @inject(AuthRepository)
    private authRepository: AuthRepository,
    @inject(AuthModel)
    private authModel: AuthModel,
  ) {
    makeAutoObservable(this);
  }
  setOnAuthInit(
    cb: ((bootstrap: Bootstrap) => Promise<void>)[],
    bootstrapCtx: Bootstrap,
  ) {
    this._onAuthInitCb = cb;
    this.bootstrapCtx = bootstrapCtx;
  }

  async checkStatusApionInit(): Promise<void> {
    try {
      this.authModel.setAuthInProgress(true);
      const status = await this.authRepository.getAppAuthStatus();
      if (status) {
        this.authModel.setAuthComplete(true);
        this.authModel.setAuth(true);
        this.onAuthInit();
      }
    } catch (error) {
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
      this.onAuthInit();
      router.navigate(CORE_ROUTES.HOME);
    }
    return response;
  }

  async logout(): Promise<void> {
    await this.authRepository.logout();
    this.authModel.setAuthComplete(false);
    this.authModel.setAuth(false);
  }

  private onAuthInit() {
    const ctx = this.bootstrapCtx;
    if (ctx) {
      this._onAuthInitCb.forEach((cb) => cb(ctx));
    }
  }
}
