const body = document.querySelector("body");

class Keyboard {
    constructor(parent, obj) {
        this.parent = parent;
        this.obj = obj;

        this.elem = document.createElement("div");
        this.elem.classList.add("container");

        this.parent.append(this.elem);

        this.renderContent();
    }

    template() {
        return `
        <p class="title">RSS Виртуальная клавиатура</p>
        <textarea class="textarea" id="textarea" rows="5" cols="50"></textarea>
     `;
    }

    renderContent() {
        this.keyboard = document.createElement("div");
        this.keyboard.classList.add("keyboard");

        const keys = Object.keys(this.obj);

        for (let i = 0; i < keys.length; i++) {
            this.keyboard.append(this.renderKeyBoardRow(this.obj[keys[i]]));
        }

        this.elem.insertAdjacentHTML("afterbegin", this.template());
        this.elem.append(this.keyboard);

        this.elem.insertAdjacentHTML("beforeend", `
        <p class="description">Клавиатура создана в операционной системе Windows</p>
        <p class="language">Для переключения языка комбинация: левыe ctrl + alt</p>
        `);
    }

    renderKeyBoardRow(arr) {
        this.keyboardRow = document.createElement("div");
        this.keyboardRow.classList.add("keyboard--row");

        for (let i = 0; i < arr.length; i++) {
            this.keyboardRow.append(this.renderKeyBoardKey(arr[i][0], arr[i][1], arr[i][2]));
        }

        return this.keyboardRow;
    }

    renderKeyBoardKey(selectorClass, keyRus, keyEng) {
        this.keyboardKey = document.createElement("div");
        this.keyboardKey.classList.add("keyboard--key");
        this.keyboardKey.classList.add(selectorClass);
        this.keyboardKey.append(this.renderSpan(keyRus[0], keyRus[1], keyRus[2], keyRus[3]));
        this.keyboardKey.append(this.renderSpan(keyEng[0], keyEng[1], keyEng[2], keyEng[3]));

        return this.keyboardKey;
    }

    renderSpan(key, keyCaps, selectorClass, hidden) {
        this.span = document.createElement("span");
        this.span.classList.add(selectorClass);
        if (hidden) this.span.classList.add(hidden);

        this.span.insertAdjacentHTML("afterbegin", `
        <span class="caseDown">${key}</span>
        <span class="caseUp hidden">${keyCaps}</span>
        <span class="caps hidden">${keyCaps}</span>
        <span class="shiftCaps hidden">${key}</span>
        `);

        return this.span;
    }
}

const keys = {
    row1:
        [
            ["Backquote", ["ё", "Ё", "rus", ""], ["`", "~", "eng", "hidden"]],
            ["Digit1", ["1", "!", "rus", ""], ["1", "!", "eng", "hidden"]],
            ["Digit2", ["2", "\"", "rus", ""], ["2", "\"", "eng", "hidden"]],
            ["Digit3", ["3", "№", "rus", ""], ["3", "#", "eng", "hidden"]],
            ["Digit4", ["4", ";", "rus", ""], ["4", "$", "eng", "hidden"]],
            ["Digit5", ["5", "%", "rus", ""], ["5", "%", "eng", "hidden"]],
            ["Digit6", ["6", ":", "rus", ""], ["6", "^", "eng", "hidden"]],
            ["Digit7", ["7", "?", "rus", ""], ["7", "&", "eng", "hidden"]],
            ["Digit8", ["8", "*", "rus", ""], ["8", "*", "eng", "hidden"]],
            ["Digit9", ["9", "(", "rus", ""], ["9", "(", "eng", "hidden"]],
            ["Digit0", ["0", ")", "rus", ""], ["9", ")", "eng", "hidden"]],
            ["Minus", ["-", "_", "rus", ""], ["-", "_", "eng", "hidden"]],
            ["Equal", ["=", "+", "rus", ""], ["=", "+", "eng", "hidden"]],
            ["Backspace", ["Backspace", "Backspace", "rus", ""], ["Backspace", "Backspace", "eng", "hidden"]],
        ],
    row2:
        [
            ["Tab", ["Tab", "Tab", "rus", ""], ["Tab", "Tab", "eng", "hidden"]],
            ["KeyQ", ["й", "Й", "rus", ""], ["q", "Q", "eng", "hidden"]],
            ["KeyW", ["ц", "Ц", "rus", ""], ["w", "W", "eng", "hidden"]],
            ["KeyE", ["у", "У", "rus", ""], ["e", "E", "eng", "hidden"]],
            ["KeyR", ["к", "К", "rus", ""], ["r", "R", "eng", "hidden"]],
            ["KeyT", ["е", "Е", "rus", ""], ["t", "T", "eng", "hidden"]],
            ["KeyY", ["н", "Н", "rus", ""], ["y", "Y", "eng", "hidden"]],
            ["KeyU", ["г", "Г", "rus", ""], ["u", "U", "eng", "hidden"]],
            ["KeyI", ["ш", "Ш", "rus", ""], ["i", "I", "eng", "hidden"]],
            ["KeyO", ["щ", "Щ", "rus", ""], ["o", "O", "eng", "hidden"]],
            ["KeyP", ["з", "З", "rus", ""], ["p", "P", "eng", "hidden"]],
            ["BracketLeft", ["х", "Х", "rus", ""], ["[", "{", "eng", "hidden"]],
            ["BracketRight", ["ъ", "Ъ", "rus", ""], ["]", "}", "eng", "hidden"]],
            ["Backslash", ["\\", "/", "rus", ""], ["\\", "|", "eng", "hidden"]],
            ["Delete", ["Del", "Del", "rus", ""], ["Del", "Del", "eng", "hidden"]],
        ],
    row3:
        [
            ["CapsLock", ["CapsLock", "CapsLock", "rus", ""], ["CapsLock", "CapsLock", "eng", "hidden"]],
            ["KeyA", ["ф", "Ф", "rus", ""], ["a", "A", "eng", "hidden"]],
            ["KeyS", ["ы", "Ы", "rus", ""], ["s", "S", "eng", "hidden"]],
            ["KeyD", ["в", "В", "rus", ""], ["d", "D", "eng", "hidden"]],
            ["KeyF", ["а", "А", "rus", ""], ["f", "F", "eng", "hidden"]],
            ["KeyG", ["е", "Е", "rus", ""], ["g", "G", "eng", "hidden"]],
            ["KeyH", ["р", "Р", "rus", ""], ["h", "H", "eng", "hidden"]],
            ["KeyJ", ["о", "О", "rus", ""], ["j", "J", "eng", "hidden"]],
            ["KeyK", ["л", "Л", "rus", ""], ["k", "K", "eng", "hidden"]],
            ["KeyL", ["д", "Д", "rus", ""], ["l", "L", "eng", "hidden"]],
            ["Semicolon", ["ж", "Ж", "rus", ""], [";", ":", "eng", "hidden"]],
            ["Quote", ["э", "Э", "rus", ""], ["'", "\"", "eng", "hidden"]],
            ["Enter", ["Enter", "Enter", "rus", ""], ["Enter", "Enter", "eng", "hidden"]],
        ],
    row4:
        [
            ["ShiftLeft", ["Shift", "Shift", "rus", ""], ["Shift", "Shift", "eng", "hidden"]],
            ["KeyZ", ["я", "Я", "rus", ""], ["z", "Z", "eng", "hidden"]],
            ["KeyX", ["ч", "Ч", "rus", ""], ["x", "X", "eng", "hidden"]],
            ["KeyC", ["с", "С", "rus", ""], ["c", "C", "eng", "hidden"]],
            ["KeyV", ["м", "М", "rus", ""], ["v", "V", "eng", "hidden"]],
            ["KeyB", ["и", "и", "rus", ""], ["b", "B", "eng", "hidden"]],
            ["KeyN", ["т", "Т", "rus", ""], ["n", "N", "eng", "hidden"]],
            ["KeyM", ["ь", "Ь", "rus", ""], ["m", "M", "eng", "hidden"]],
            ["Comma", ["б", "Б", "rus", ""], [",", "<", "eng", "hidden"]],
            ["Period", ["ю", "Ю", "rus", ""], [".", ">", "eng", "hidden"]],
            ["Slash", [".", ",", "rus", ""], ["/", "?", "eng", "hidden"]],
            ["ArrowUp", ["▲", "▲", "rus", ""], ["▲", "▲", "eng", "hidden"]],
            ["ShiftRight", ["Shift", "Shift", "rus", ""], ["Shift", "Shift", "eng", "hidden"]],
        ],
    row5:
        [
            ["ControlLeft", ["Ctrl", "Ctrl", "rus", ""], ["Ctrl", "Ctrl", "eng", "hidden"]],
            ["MetaLeft", ["Win", "Win", "rus", ""], ["Win", "Win", "eng", "hidden"]],
            ["AltLeft", ["Alt", "Alt", "rus", ""], ["Alt", "Alt", "eng", "hidden"]],
            ["Space", [" ", " ", "rus", ""], [" ", " ", "eng", "hidden"]],
            ["AltRight", ["Alt", "Alt", "rus", ""], ["Alt", "Alt", "eng", "hidden"]],
            ["ArrowLeft", ["◄", "◄", "rus", ""], ["◄", "◄", "eng", "hidden"]],
            ["ArrowDown", ["▼", "▼", "rus", ""], ["▼", "▼", "eng", "hidden"]],
            ["ArrowRight", ["►", "►", "rus", ""], ["►", "►", "eng", "hidden"]],
            ["ControlRight", ["Ctrl", "Ctrl", "rus", ""], ["Ctrl", "Ctrl", "eng", "hidden"]],
        ],
};

// eslint-disable-next-line no-unused-vars
const keyBoard = new Keyboard(body, keys);

const textarea = document.querySelector("textarea");

document.addEventListener("keydown", (evt) => {
    evt.preventDefault();
    textarea.focus();
});

document.addEventListener("click", (evt) => {
    if (evt.target.closest("textarea")) textarea.classList.add("border");
    else textarea.classList.remove("border");
});
