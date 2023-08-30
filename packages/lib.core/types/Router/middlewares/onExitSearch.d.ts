import type { IRoutes } from "../interfaces";
import type { Router } from "router5";
import type { Container } from "inversify";
export interface IOnExitSearchUtilConfig {
    onExit?: (router: Router<Record<string, any>>, container: Container) => void;
}
/**
 *  Функция проходит по каждой ноде дерева роутов в поисках метода onExit
 *  и вызывает его.
 *
 * @param routes Все роуты
 * @param router Экземпляр роутера
 * @param currentNodePath Текущий путь ноды роутера
 */
export declare function onExitSearch(routes: IRoutes, router: Router<Record<string, any>>, currentNodePath?: string): void;
//# sourceMappingURL=onExitSearch.d.ts.map