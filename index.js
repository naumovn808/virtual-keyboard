const body = document.querySelector('body');

class Keyboard {

    constructor(parent, obj) {
        this.parent = parent;
        this.obj = obj;

        this.elem = document.createElement('div');
        this.elem.classList.add('container');

        this.parent.append(this.elem);

        this.renderContent();


    }


    template() {
        return `
        <p class="title">RSS Виртуальная клавиатура</p>
        <textarea class="textarea" id="textarea" rows="5" cols="50"></textarea>
     `
    }

    renderContent() {

        this.keyboard = document.createElement('div');
        this.keyboard.classList.add('keyboard');

        this.keyboard.append(this.renderKeyBoardRow(this.obj.row1));

        this.elem.insertAdjacentHTML('afterbegin', this.template());
        this.elem.append(this.keyboard);
    }

    renderKeyBoardRow(arr) {
        this.keyboardRow = document.createElement('div');
        this.keyboardRow.classList.add('keyboard--row');

        for (let i = 0; i < arr.length; i++) {

            this.keyboardRow.append(this.renderKeyBoardKey(this.obj.row1[i][0], this.obj.row1[i][1], this.obj.row1[i][2]));

        }

        return this.keyboardRow;
    }

    renderKeyBoardKey(selectorClass, keyRus, keyEng) {
        this.keyboardKey = document.createElement('div');
        this.keyboardKey.classList.add('keyboard--key');
        this.keyboardKey.classList.add(selectorClass);
        this.keyboardKey.append(this.renderSpan(keyRus[0], keyRus[1], keyRus[2], keyRus[3]));
        this.keyboardKey.append(this.renderSpan(keyEng[0], keyEng[1], keyEng[2], keyEng[3]));

        return this.keyboardKey;
    }

    renderSpan(key, keyCaps, selectorClass, hidden) {
        this.span = document.createElement('span');
        this.span.classList.add(selectorClass);
        if (hidden) this.span.classList.add(hidden);

        this.span.insertAdjacentHTML('afterbegin', `
        <span class="caseDown">${key}</span>
        <span class="caseUp hidden">${keyCaps}</span>
        <span class="caps hidden">${keyCaps}</span>
        <span class="shiftCaps hidden">${key}</span>
        `)

        return this.span;
    }


}

const keys = {
    row1:
        [['Backquote', ['ё', 'Ё', 'rus', ''], ['`', '~', 'eng', 'hidden']],
        ['Digit1', ['1', '!', 'rus', ''], ['1', '!', 'eng', 'hidden']],
        ['Digit1', ['2', '"', 'rus', ''], ['2', '"', 'eng', 'hidden']],
        ],

}

const keyBoard = new Keyboard(body, keys);

const textarea = document.querySelector('textarea');

document.addEventListener('keydown', (evt) => {

    textarea.textContent += evt.key;
})