export class ToggleBtnName {
    toggleBtnName(wordCard: HTMLElement, valueBtnName: string, newValueBtnName: string): void {
        wordCard.querySelectorAll('button').forEach((item: HTMLElement) => {
            const nameBtn: string = newValueBtnName[0].toUpperCase() + newValueBtnName.slice(1);
            if (item.dataset.name === valueBtnName) {
                item.dataset.name = newValueBtnName;
                item.innerText = nameBtn;
            }
        })
    }
}
