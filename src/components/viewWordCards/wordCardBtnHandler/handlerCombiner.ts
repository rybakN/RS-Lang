import { BtnHandler } from './typeBtnHandler';
import { ListenBtn } from './listenBtn';
import { DifficultBtn } from './difficultBtn';
import { EasyBtn } from './easyBtn';
import { LearningBtn } from './learningBtn';
import { RestoreBtn } from './restoreBtn';
import { ToggleBtnName } from './utilsWordCard/toggleBtnName';
import { UpdateUserStatistic } from './utilsWordCard/updateUserStatistic';
import { CreateUserWordBody } from './utilsWordCard/createUserWordBody';

export class HandlerCombiner {
    btn: Map<string, BtnHandler> = new Map();
    toggleBtnName: ToggleBtnName;
    updateUserStat: UpdateUserStatistic;
    userWordBody: CreateUserWordBody;
    constructor() {
        this.toggleBtnName = new ToggleBtnName();
        this.updateUserStat = new UpdateUserStatistic();
        this.userWordBody = new CreateUserWordBody();
        this.btn.set(ListenBtn.btnName, new ListenBtn());
        this.btn.set(DifficultBtn.btnName, new DifficultBtn(this.toggleBtnName, this.updateUserStat, this.userWordBody));
        this.btn.set(EasyBtn.btnName, new EasyBtn(this.toggleBtnName, this.userWordBody));
        this.btn.set(LearningBtn.btnName, new LearningBtn(this.toggleBtnName, this.userWordBody));
        this.btn.set(RestoreBtn.btnName, new RestoreBtn(this.toggleBtnName, this.updateUserStat, this.userWordBody));
    }
    handler(btnName: string, wordId: string): void {
        const handler = this.btn.get(btnName);
        handler.handle(wordId);
    }
}
