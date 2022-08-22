import { BtnHandler } from './typeBtnHandler';
import { ListenBtn } from './listenBtn';

export class HandlerCombiner {
    btn: Map<string, BtnHandler> = new Map();
    constructor() {
        this.btn.set(ListenBtn.btnName, new ListenBtn());
    }
    handler(btnName: string, wordId: string): void {
        const handler = this.btn.get(btnName);
        handler.handle(wordId);
    }
}
