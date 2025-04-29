import { DomController } from "./DOMController";

class AppInitializer {
  private _domController: DomController | null = null;

  public initApp(playerName: string) {
    this._domController = new DomController(playerName);
  }

  public getDomController(): DomController | null {
    return this._domController;
  }
}

export const appInitializer = new AppInitializer();
