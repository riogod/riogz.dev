import { Container } from "inversify";
import { ActivationFnFactory } from "router5";
import { DefaultDependencies } from "router5/dist/types/router";
import Cookies from "js-cookie";
import { AuthViewModel } from "../view_model/AuthVM";
import { AuthModel } from "../model/auth.model.ts";

export const routeAuthActivator =
  (di: Container): ActivationFnFactory<DefaultDependencies> =>
  (_router) =>
  (_toState, _fromState, done) => {
    const checkCookie = Cookies.get("accessToken");
    if (!checkCookie && !di.get(AuthModel).authInProgress) {
      di.get(AuthViewModel).checkStatusApionInit();
    }
    done();
    return;
  };
