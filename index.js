/* eslint-disable quote-props */
const body = document.querySelector("body");

class Keyboard {
  constructor(parent, keyBoard) {
    this.parent = parent;
    this.obj = keyBoard;

    this.elem = document.createElement("div");
    this.elem.classList.add("container");

    this.parent.append(this.elem);

    this.renderContent();
    this.listenners();
    this.textarea = this.elem.querySelector("textarea");
  }

  renderContent() {
    this.keyboard = document.createElement("div");
    this.keyboard.classList.add("keyboard");

    const keys = Object.keys(this.obj);

    for (let i = 0; i < keys.length; i += 1) {
      this.keyboard.append(this.renderKeyBoardRow(this.obj[keys[i]]));
    }

    this.elem.insertAdjacentHTML("afterbegin", `
        <p class="title">RSS Виртуальная клавиатура</p>
        <textarea class="textarea" id="textarea" rows="5" cols="50"></textarea>
    `);

    this.elem.append(this.keyboard);

    this.elem.insertAdjacentHTML("beforeend", `
        <p class="description">Клавиатура создана в операционной системе Windows</p>
        <p class="language">Для переключения языка комбинация: левыe ctrl + alt</p>
        `);
  }

  renderKeyBoardRow(arr) {
    this.keyboardRow = document.createElement("div");
    this.keyboardRow.classList.add("keyboard--row");

    for (let i = 0; i < arr.length; i += 1) {
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

  langRu() {
    this.elem.querySelectorAll(".rus").forEach((e) => e.classList.remove("hidden"));
    this.elem.querySelectorAll(".eng").forEach((e) => e.classList.add("hidden"));
  }

  lang(flag) {
    if (flag) {
      this.langEng();
      localStorage.removeItem("lang");
    } else {
      this.langRu();
      localStorage.setItem("lang", true);
    }
  }

  langEng() {
    this.elem.querySelectorAll(".rus").forEach((e) => e.classList.add("hidden"));
    this.elem.querySelectorAll(".eng").forEach((e) => e.classList.remove("hidden"));
  }

  backspaceHandler() {
    const size = this.textarea.value.length;
    this.textarea.value = this.textarea.value.slice(0, size - 1);
  }

  tabClickHandler(evt) {
    evt.preventDefault();
    this.textarea.value = `${this.textarea.value}    `;
  }

  delClickHandler() {
    // получение позиции курсора
    function getCaretPos(obj) {
      obj.focus();

      if (obj.selectionStart) return obj.selectionStart;// Gecko
      if (document.selection) {
        const sel = document.selection.createRange();
        const clone = sel.duplicate();
        sel.collapse(true);
        clone.moveToElementText(obj);
        clone.setEndPoint("EndToEnd", sel);
        return clone.text.length;
      }

      return 0;
    }
    // установка курсора после удаления буквы
    function setCaretPosition(obj, start, end) {
      if (obj.setSelectionRange) {
        obj.focus();
        obj.setSelectionRange(start, end);
      } else if (obj.createTextRange) {
        const range = obj.createTextRange();
        range.collapse(true);
        range.moveEnd("character", end);
        range.moveStart("character", start);
        range.select();
      }
    }

    const ps = getCaretPos(this.textarea);
    this.textarea.value = this.textarea.value.slice(0, ps) + this.textarea.value.slice(ps + 1);
    setCaretPosition(this.textarea, ps, ps);
  }

  enterHandler() {
    this.textarea.value += "\n";
  }

  shiftHandler(evt) {
    evt.preventDefault();
    evt.stopPropagation();

    this.elem.querySelectorAll(".caseDown").forEach((e) => e.classList.toggle("hidden"));
    this.elem.querySelectorAll(".caps").forEach((e) => e.classList.toggle("hidden"));
  }

  capsLockHandler() {
    this.elem.querySelector(".CapsLock").classList.toggle("activeCaps");

    this.elem.querySelectorAll(".caseDown").forEach((e) => e.classList.toggle("hidden"));
    this.elem.querySelectorAll(".caps").forEach((e) => e.classList.toggle("hidden"));
  }

  listenners() {
    document.addEventListener("click", (evt) => {
      if (evt.target.closest("textarea")) {
        this.textarea.classList.add("border");
      } else {
        this.textarea.classList.remove("border");
      }
    });

    document.addEventListener("keydown", (evt) => {
      this.textarea.focus();

      if (evt.code === "Tab") this.tabClickHandler(evt);
      if (evt.code === "CapsLock") this.capsLockHandler();
      if (evt.code === "ShiftLeft" || evt.code === "ShiftRight") this.shiftHandler(evt);

      if (this.elem.querySelector(`.${evt.code}`)) {
        this.elem.querySelector(`.${evt.code}`).classList.add("active");
        setTimeout(() => { this.elem.querySelector(`.${evt.code}`).classList.remove("active"); }, 400);
      }

      if (evt.ctrlKey && evt.altKey) {
        this.lang(localStorage.getItem("lang"));
      }
    });

    document.addEventListener("keyup", (evt) => {
      if (evt.code === "ShiftLeft" || evt.code === "ShiftRight") this.shiftHandler(evt);
    });

    const keyBoardKeys = this.elem.querySelectorAll(".keyboard--key");
    keyBoardKeys.forEach((elem) => elem.addEventListener("click", (evt) => {
      if (evt.target.textContent === "Backspace") this.backspaceHandler();
      else if (evt.target.textContent === "Tab") this.tabClickHandler(evt);
      else if (evt.target.textContent === "Del") this.delClickHandler();
      else if (evt.target.textContent === "Enter") this.enterHandler();
      else if (evt.target.textContent === "CapsLock") this.capsLockHandler();
      else if (evt.target.textContent === "Shift") this.textarea.value += "";
      else this.textarea.value += evt.target.textContent;
    }));

    window.addEventListener("load", () => {
      if (localStorage.getItem("lang")) {
        this.langRu();
      }
      if (!localStorage.getItem("lang")) {
        this.langEng();
      }
    });
  }

  // eslint-disable-next-line class-methods-use-this
}

const keyboard = {
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
const keyBoard = new Keyboard(body, keyboard);
